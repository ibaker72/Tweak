/**
 * Minimal Anthropic Messages API client (no SDK dependency).
 * Uses ephemeral prompt caching on system blocks for cheap repeat calls.
 */

const API_URL = "https://api.anthropic.com/v1/messages";
const API_VERSION = "2023-06-01";

export const MODEL_DRAFT = "claude-sonnet-4-6";
export const MODEL_FAST = "claude-haiku-4-5";

interface ContentBlock {
  type: "text";
  text: string;
  cache_control?: { type: "ephemeral" };
}

interface MessagesRequest {
  model: string;
  max_tokens: number;
  system: ContentBlock[];
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  temperature?: number;
}

interface MessagesResponse {
  content: Array<{ type: "text"; text: string }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
    cache_creation_input_tokens?: number;
    cache_read_input_tokens?: number;
  };
  stop_reason: string;
}

export function hasAnthropicKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export async function callClaude(opts: {
  model: string;
  systemCached: string;
  systemDynamic?: string;
  user: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<{ text: string; usage: MessagesResponse["usage"] }> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY is not configured");

  const system: ContentBlock[] = [
    { type: "text", text: opts.systemCached, cache_control: { type: "ephemeral" } },
  ];
  if (opts.systemDynamic) {
    system.push({ type: "text", text: opts.systemDynamic });
  }

  const body: MessagesRequest = {
    model: opts.model,
    max_tokens: opts.maxTokens ?? 1024,
    temperature: opts.temperature ?? 0.7,
    system,
    messages: [{ role: "user", content: opts.user }],
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": API_VERSION,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${errText.slice(0, 400)}`);
  }

  const data = (await res.json()) as MessagesResponse;
  const text = data.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n")
    .trim();

  return { text, usage: data.usage };
}

export function safeJsonParse<T>(text: string): T | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  try {
    return JSON.parse(candidate) as T;
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(candidate.slice(start, end + 1)) as T;
      } catch {
        return null;
      }
    }
    return null;
  }
}
