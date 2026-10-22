import { Arrow, Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

type ContactCtaProps = {
  locale: Locale;
  contact: Dictionary["contact"];
};

export function ContactCta({ locale, contact }: ContactCtaProps) {
  return (
    <section id="contact" className="relative pb-24 pt-8 md:pb-32">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-7 py-14 text-cream sm:px-12 md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-[26rem] rounded-full bg-violet/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-16 size-[24rem] rounded-full bg-coral/30 blur-3xl"
          />
          <div
            aria-hidden
            className="grain-overlay pointer-events-none absolute inset-0 opacity-20"
          />

          <div className="relative grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
                <span className="size-2 rounded-full bg-lime" />
                {contact.eyebrow}
              </p>
              <h2 className="display-lg mt-5 max-w-xl text-cream">
                {contact.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/65 sm:text-base">
                {contact.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={`/${locale}/contact`} variant="accent">
                  {contact.send} <Arrow />
                </Button>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-full border border-cream/25 px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream/60"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-cream/15 bg-cream/5 p-6 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/45">
                {contact.socialLabel}
              </p>
              <ul className="mt-4 grid gap-1">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-between rounded-xl px-2 py-2.5 text-sm text-cream/75 transition-colors hover:bg-cream/10 hover:text-cream"
                    >
                      {social.label}
                      <span aria-hidden className="text-cream/40">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-cream/10 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/45">
                  {contact.locationLabel}
                </p>
                <p className="mt-1.5 text-sm text-cream/75">
                  {site.location[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
