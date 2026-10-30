"use client";

import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AssistantWidgetProps = {
  locale: Locale;
  dict: Dictionary["assistant"];
};

const MAX_STORED_MESSAGES = 20;

function isMessage(value: unknown): value is Message {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    (record.role === "user" || record.role === "assistant") &&
    typeof record.content === "string"
  );
}

function readStored(key: string): Message[] {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isMessage).slice(-MAX_STORED_MESSAGES);
  } catch {
    return [];
  }
}

function Bubble({
  role,
  children,
}: {
  role: Message["role"];
  children: React.ReactNode;
}) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[86%] whitespace-pre-line break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-md bg-ink text-cream"
            : "rounded-bl-md border border-ink/10 bg-white/80 text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Typing({ label }: { label: string }) {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-ink/10 bg-white/80 px-4 py-3">
        <span className="sr-only">{label}</span>
        <span aria-hidden className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="size-1.5 animate-bounce rounded-full bg-ink/45"
              style={{ animationDelay: `${index * 120}ms` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

export function AssistantWidget({ locale, dict }: AssistantWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState<"ai" | "fallback" | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const storageKey = `assistant-chat:${locale}`;

  useEffect(() => {
    if (!open && messages.length === 0) return;
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)),
      );
    } catch {
      // sessionStorage mavjud bo'lmasa (private mode), suhbat shunchaki saqlanmaydi
    }
  }, [messages, open, storageKey]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 150);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (list) {
      list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }
  }, [messages, pending, error, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const next = [
      ...messages,
      { role: "user" as const, content: trimmed },
    ].slice(-MAX_STORED_MESSAGES);

    setMessages(next);
    setValue("");
    setError(false);
    setPending(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 35_000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: next }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("request_failed");

      const data = (await response.json()) as {
        reply?: unknown;
        mode?: unknown;
      };

      if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("empty_reply");
      }

      setMessages((current) =>
        [
          ...current,
          { role: "assistant" as const, content: data.reply as string },
        ].slice(-MAX_STORED_MESSAGES),
      );
      setMode(data.mode === "ai" ? "ai" : "fallback");
    } catch {
      setError(true);
    } finally {
      window.clearTimeout(timeout);
      setPending(false);
    }
  }

  function close() {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 50);
  }

  function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    setMessages(readStored(storageKey));
    setMode(null);
    setOpen(true);
  }

  return (
    <>
      <div
        id="assistant-panel"
        role="dialog"
        aria-label={dict.title}
        aria-modal="false"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-x-3 bottom-20 z-30 flex h-[min(32rem,calc(100dvh-6.5rem))] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream shadow-soft transition-all duration-300 sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[24rem] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div className="relative overflow-hidden bg-ink px-4 py-3.5 text-cream">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-12 size-28 rounded-full bg-gradient-to-br from-coral via-pink to-violet opacity-40 blur-2xl"
          />
          <div className="relative flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-coral via-pink to-violet font-display text-[11px] font-bold text-white">
              AI
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold">
                {dict.title}
              </p>
              <p className="truncate text-[11px] text-cream/60">
                {dict.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="ml-auto grid size-8 shrink-0 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-cream/40 hover:text-cream"
            >
              <span className="sr-only">{dict.close}</span>
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>
        </div>

        <div
          ref={listRef}
          aria-live="polite"
          aria-relevant="additions text"
          className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
        >
          <Bubble role="assistant">{dict.greeting}</Bubble>

          {messages.length === 0 && !pending ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {dict.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void send(suggestion)}
                  className="rounded-full border border-ink/15 bg-white/60 px-3 py-1.5 text-left text-[11px] font-medium text-ink-soft transition-colors hover:border-ink/35 hover:text-ink"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          {messages.map((message, index) => (
            <Bubble key={index} role={message.role}>
              {message.content}
            </Bubble>
          ))}

          {pending ? <Typing label={dict.typing} /> : null}

          {error ? (
            <Bubble role="assistant">
              {dict.error}{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium underline underline-offset-2"
              >
                {site.email}
              </a>
            </Bubble>
          ) : null}
        </div>

        <div className="border-t border-ink/10 bg-cream px-4 pb-3 pt-3">
          <p className="mb-2 text-[10px] leading-snug text-ink-soft/75">
            {mode === "fallback" ? dict.basicMode : dict.disclaimer}
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(value);
            }}
            className="flex items-end gap-2"
          >
            <label htmlFor="assistant-input" className="sr-only">
              {dict.placeholder}
            </label>
            <textarea
              ref={inputRef}
              id="assistant-input"
              rows={1}
              maxLength={1000}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send(value);
                }
              }}
              placeholder={dict.placeholder}
              className="max-h-24 min-h-11 flex-1 resize-none rounded-2xl border border-ink/15 bg-white/70 px-3.5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink/40 focus:bg-white"
            />
            <button
              type="submit"
              disabled={pending || value.trim().length === 0}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-cream transition-opacity disabled:opacity-35"
            >
              <span className="sr-only">{dict.send}</span>
              <span aria-hidden className="text-lg leading-none">
                ↑
              </span>
            </button>
          </form>

          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-ink-soft underline decoration-ink/20 underline-offset-2 transition-colors hover:text-ink"
          >
            {dict.contact}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="assistant-panel"
        aria-label={open ? dict.close : dict.open}
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full border border-ink/10 bg-ink px-4 py-3 text-cream shadow-card transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
      >
        <span
          aria-hidden
          className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-coral via-pink to-violet text-[10px] font-bold text-white"
        >
          AI
        </span>
        <span className="text-xs font-semibold">
          {open ? dict.close : dict.open}
        </span>
      </button>
    </>
  );
}
