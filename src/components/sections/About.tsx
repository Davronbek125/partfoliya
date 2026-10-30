import Image from "next/image";

import { skillMarquee } from "@/content/skills";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

import { Reveal } from "@/components/motion/Reveal";

type AboutProps = {
  locale: Locale;
  about: Dictionary["about"];
  showHeading?: boolean;
};

export function About({ locale, about, showHeading = true }: AboutProps) {
  return (
    <section
      id="about"
      className={`relative ${
        showHeading ? "py-24 md:py-32" : "pb-24 pt-4 md:pb-32 md:pt-8"
      }`}
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ink/10 bg-ink">
                <Image
                  src="/images/davronbek-portrait.webp"
                  alt={`${site.name} — ${site.location[locale]}`}
                  fill
                  sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,90,60,0.22),transparent_45%,rgba(123,92,255,0.2))] mix-blend-soft-light"
                />
                <div
                  aria-hidden
                  className="grain-overlay pointer-events-none absolute inset-0 opacity-25"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-7">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
                    <span>Portfolio</span>
                    <span>{site.copyrightYear}</span>
                  </div>

                  <div>
                    <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                      {site.name}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/65">
                      {site.location[locale]}
                    </p>
                  </div>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15"
                />
              </div>
            </div>
          </Reveal>

          <div>
            {showHeading ? (
              <Reveal>
                <p className="eyebrow">{about.eyebrow}</p>
                <h2 className="display-lg mt-4 max-w-xl">{about.title}</h2>
              </Reveal>
            ) : null}

            <div
              className={`max-w-2xl space-y-4 ${showHeading ? "mt-6" : ""}`}
            >
              {about.body.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.05 * index}>
                  <p className="prose-muted text-base sm:text-lg">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
              {about.stats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.06 * index}>
                  <p className="font-display text-3xl font-bold leading-none sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-ink-soft">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-10 rounded-3xl border border-ink/10 bg-white/50 p-6">
                <h3 className="font-display text-base font-semibold">
                  {about.skillsTitle}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{about.skillsNote}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {skillMarquee.slice(0, 12).map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-ink/10 bg-cream px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold text-ink transition-colors hover:text-coral"
                >
                  {about.githubCta}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
