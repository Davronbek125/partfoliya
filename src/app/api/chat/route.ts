import { NextResponse } from "next/server";

import { buildSystemPrompt } from "@/content/assistant";
import { site } from "@/content/site";
import { fallbackReply } from "@/lib/assistant-fallback";
import { rateLimit } from "@/lib/rate-limit";
import type { Locale } from "@/i18n/config";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1_200;
const MAX_TOTAL_CHARS = 6_000;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function json(
  data: unknown,
  status = 200,
  extraHeaders?: Record<string, string>,
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  if (!payload || typeof payload !== "object") {
    return json({ error: "invalid_body" }, 400);
  }

  const body = payload as Record<string, unknown>;
  const locale: Locale = body.locale === "en" ? "en" : "uz";

  const rawMessages = Array.isArray(body.messages)
    ? body.messages.slice(-MAX_MESSAGES)
    : [];

  const messages: ChatMessage[] = [];
  for (const item of rawMessages) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const role = record.role;
    const content = record.content;

    if (
      (role === "user" || role === "assistant") &&
      typeof content === "string"
    ) {
      const trimmed = content.trim();
      if (trimmed.length > 0) {
        messages.push({
          role,
          content: trimmed.slice(0, MAX_MESSAGE_CHARS),
        });
      }
    }
  }

  const last = messages.at(-1);
  if (!last || last.role !== "user") {
    return json({ error: "invalid_messages" }, 400);
  }

  const totalChars = messages.reduce(
    (sum, message) => sum + message.content.length,
    0,
  );
  if (totalChars > MAX_TOTAL_CHARS) {
    return json({ error: "conversation_too_long" }, 400);
  }

  const limit = rateLimit(clientIp(request));
  if (!limit.ok) {
    return json(
      { error: "rate_limited" },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return json({
      reply: fallbackReply(locale, last.content),
      mode: "fallback",
    });
  }

  const baseUrl = (
    process.env.OPENAI_BASE_URL?.trim() || "https://openrouter.ai/api/v1"
  ).replace(/\/+$/, "");
  const model = process.env.OPENAI_MODEL?.trim() || "openai/gpt-4o-mini";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  if (baseUrl.includes("openrouter.ai")) {
    headers["HTTP-Referer"] = site.url;
    headers["X-Title"] = site.name;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: buildSystemPrompt(locale) },
          ...messages.slice(-8),
        ],
        temperature: 0.4,
        max_tokens: 420,
      }),
    });

    if (!response.ok) {
      return json({
        reply: fallbackReply(locale, last.content),
        mode: "fallback",
      });
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: unknown } }[];
    };

    const reply = data.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      return json({
        reply: fallbackReply(locale, last.content),
        mode: "fallback",
      });
    }

    return json({
      reply: reply.trim().slice(0, 1_600),
      mode: "ai",
    });
  } catch {
    return json({
      reply: fallbackReply(locale, last.content),
      mode: "fallback",
    });
  } finally {
    clearTimeout(timeout);
  }
}
