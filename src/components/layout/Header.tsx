"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { localeShort, locales, type Locale } from "@/i18n/config";
import { site } from "@/content/site";

type Nav = {
  home: string;
  about: string;
  projects: string;
  contact: string;
  menu: string;
  close: string;
};

type HeaderProps = {
  locale: Locale;
  nav: Nav;
  name: string;
};

const items = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

export function Header({ locale, nav, name }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const rest = pathname.replace(/^\/(uz|en)(?=\/|$)/, "");
  const normalized = rest === "" ? "/" : rest;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "") return normalized === "/";
    return normalized.startsWith(href);
  };

  const mark = name.trim().charAt(0).toUpperCase() || "P";

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink/10 bg-cream/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-3"
          aria-label={name}
        >
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-ink text-cream shadow-card">
            <span className="font-display text-lg font-bold leading-none">
              {mark}
            </span>
            <span className="absolute -bottom-3 -right-3 size-8 rounded-full bg-coral blur-[2px] transition-transform duration-500 group-hover:scale-125" />
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
            {name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-ink text-cream"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="hidden items-center rounded-full border border-ink/10 bg-cream/60 p-1 md:flex"
            aria-label="Language"
          >
            {locales.map((code) => {
              const active = code === locale;
              return (
                <Link
                  key={code}
                  href={`/${code}${rest}`}
                  hrefLang={code}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-ink text-cream"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {localeShort[code]}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-10 place-items-center rounded-full border border-ink/15 bg-cream/60 md:hidden"
          >
            <span className="sr-only">{open ? nav.close : nav.menu}</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-ink transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-ink transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-ink/5 bg-cream transition-all duration-300 md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <nav
          className="shell flex min-h-full flex-col gap-1 py-6"
          aria-label="Mobile"
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 font-display text-2xl font-semibold transition-colors ${
                  active ? "bg-ink text-cream" : "hover:bg-ink/5"
                }`}
              >
                {nav[item.key]}
                <span aria-hidden className="text-base opacity-50">
                  →
                </span>
              </Link>
            );
          })}
          <div className="mt-4 flex items-center gap-2 px-1">
            {locales.map((code) => (
              <Link
                key={code}
                href={`/${code}${rest}`}
                hrefLang={code}
                onClick={() => setOpen(false)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  code === locale
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/15 text-ink-soft"
                }`}
              >
                {localeShort[code]}
              </Link>
            ))}
          </div>

          <div className="mt-auto border-t border-ink/10 pt-6">
            <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              {nav.contact}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block px-1 font-display text-xl font-semibold"
            >
              {site.email}
            </a>
            <ul className="mt-4 flex flex-wrap gap-2 px-1">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
