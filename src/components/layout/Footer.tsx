import Link from "next/link";

import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

const links = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer({ locale, dict }: FooterProps) {
  const year = site.copyrightYear;

  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-violet/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-coral/20 blur-3xl"
      />

      <div className="shell relative py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href={`/${locale}`}
              className="font-display text-2xl font-semibold tracking-tight"
            >
              {site.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">
              {dict.meta.description}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              {site.email}
              <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/40">
                {dict.nav.menu}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className="text-sm text-cream/70 transition-colors hover:text-cream"
                    >
                      {dict.nav[item.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/40">
                {dict.contact.socialLabel}
              </p>
              <ul className="mt-4 space-y-2.5">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-cream/70 transition-colors hover:text-cream"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <p>{dict.footer.built}</p>
            <a
              href="#top"
              className="inline-flex items-center gap-1 transition-colors hover:text-cream"
            >
              {dict.footer.backToTop}
              <span aria-hidden>↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
