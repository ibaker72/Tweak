import { describe, it, expect } from "vitest";
import { partnerApplicationSchema, splitName } from "./schema";

const BASE = {
  name: "Jane Smith",
  email: "jane@example.com",
  description: "I run a brand studio and my clients regularly need websites built.",
  howYouMeet: "Through my existing design clients and local founder meetups.",
  estimatedReferrals: "1-2",
};

describe("partnerApplicationSchema", () => {
  it("trims and lowercases the email", () => {
    const parsed = partnerApplicationSchema.parse({
      ...BASE,
      email: "  Jane@EXAMPLE.com  ",
    });
    expect(parsed.email).toBe("jane@example.com");
  });

  it("trims free-text answers", () => {
    const parsed = partnerApplicationSchema.parse({
      ...BASE,
      name: "   Jane Smith   ",
    });
    expect(parsed.name).toBe("Jane Smith");
  });

  it("turns omitted optional fields into null", () => {
    const parsed = partnerApplicationSchema.parse(BASE);
    expect(parsed.company).toBeNull();
    expect(parsed.website).toBeNull();
  });

  it("turns empty optional fields into null", () => {
    const parsed = partnerApplicationSchema.parse({
      ...BASE,
      company: "   ",
      website: "  ",
    });
    expect(parsed.company).toBeNull();
    expect(parsed.website).toBeNull();
  });

  describe("website normalisation", () => {
    it("accepts a scheme-less domain and adds https", () => {
      const parsed = partnerApplicationSchema.parse({
        ...BASE,
        website: "linkedin.com/in/jane",
      });
      expect(parsed.website).toBe("https://linkedin.com/in/jane");
    });

    it("preserves an explicit http scheme", () => {
      const parsed = partnerApplicationSchema.parse({
        ...BASE,
        website: "http://jane.design",
      });
      expect(parsed.website).toBe("http://jane.design/");
    });

    it("discards a value that cannot be a hostname", () => {
      const parsed = partnerApplicationSchema.parse({ ...BASE, website: "portfolio" });
      expect(parsed.website).toBeNull();
    });
  });

  it.each([
    ["1-2"],
    ["3-5"],
    ["5-10"],
    ["10+"],
  ])("accepts the referral bucket %s", (value) => {
    expect(
      partnerApplicationSchema.safeParse({ ...BASE, estimatedReferrals: value }).success,
    ).toBe(true);
  });

  it.each([
    ["", "empty"],
    ["500+", "not an option"],
    ["3-5 ", "trailing space"],
  ])("rejects the referral value %j (%s)", (value) => {
    expect(
      partnerApplicationSchema.safeParse({ ...BASE, estimatedReferrals: value }).success,
    ).toBe(false);
  });

  it("rejects a name that is too short", () => {
    expect(partnerApplicationSchema.safeParse({ ...BASE, name: "J" }).success).toBe(false);
  });

  it("caps oversized payloads", () => {
    expect(
      partnerApplicationSchema.safeParse({ ...BASE, description: "x".repeat(2001) }).success,
    ).toBe(false);
    expect(
      partnerApplicationSchema.safeParse({ ...BASE, howYouMeet: "y".repeat(2001) }).success,
    ).toBe(false);
    expect(
      partnerApplicationSchema.safeParse({ ...BASE, company: "z".repeat(161) }).success,
    ).toBe(false);
  });
});

describe("splitName", () => {
  it("splits a multi-part name at the first space", () => {
    expect(splitName("Mary Grace Joy Taduran")).toEqual({
      firstName: "Mary",
      lastName: "Grace Joy Taduran",
    });
  });

  it("puts a single-word name entirely in firstName", () => {
    expect(splitName("Cher")).toEqual({ firstName: "Cher", lastName: "" });
  });

  it("collapses irregular whitespace", () => {
    expect(splitName("  Jane   Q.  Smith ")).toEqual({
      firstName: "Jane",
      lastName: "Q. Smith",
    });
  });

  it("handles an empty string without throwing", () => {
    expect(splitName("   ")).toEqual({ firstName: "", lastName: "" });
  });
});
