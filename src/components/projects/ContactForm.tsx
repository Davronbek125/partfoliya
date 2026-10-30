"use client";

import { useState } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";

type ContactFormProps = {
  contact: Dictionary["contact"];
  siteEmail: string;
};

const fieldClass =
  "w-full rounded-2xl border border-ink/15 bg-cream/70 px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink/40 focus:bg-white";

export function ContactForm({ contact, siteEmail }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const contactMethod = String(form.get("contact") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Portfolio — ${name || "Hello"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${contactMethod}`.trim(),
    );

    window.location.href = `mailto:${siteEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            {contact.name}
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={contact.namePlaceholder}
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            {contact.contact}
          </span>
          <input
            name="contact"
            type="text"
            required
            minLength={3}
            autoComplete="off"
            placeholder={contact.contactPlaceholder}
            aria-describedby="contact-method-hint"
            className={fieldClass}
          />
          <span
            id="contact-method-hint"
            className="mt-2 block text-[11px] leading-relaxed text-ink/50"
          >
            {contact.contactHint}
          </span>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
          {contact.message}
        </span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder={contact.messagePlaceholder}
          className={`${fieldClass} resize-y`}
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral/90"
        >
          {contact.send}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-ink/50">
          {contact.note}
        </p>
      </div>

      {sent ? (
        <p
          role="status"
          className="mt-4 rounded-2xl border border-lime/40 bg-lime/15 px-4 py-3 text-sm text-ink"
        >
          {contact.sent}
        </p>
      ) : null}
    </form>
  );
}
