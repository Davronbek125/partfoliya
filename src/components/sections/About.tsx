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
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ink/10 bg-ink">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,#ff5a3c_0%,#ff7ac3_38%,#7b5cff_72%,#14101c_100%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30 mix-blend-overlay grain-overlay"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-7">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    <span>Portfolio</span>
                    <span>{site.copyrightYear}</span>
                  </div>

                  <div>
                    <p className="font-display text-[28vw] font-bold leading-[0.72] tracking-tighter text-white/95 sm:text-[13rem] lg:text-[11rem]">
                      {site.name.charAt(0).toUpperCase()}
                    </p>
                    <p className="mt-4 font-display text-xl font-semibold text-white">
                      {site.name}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
                      {site.location[locale]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bu yerga keyinchalik o'z rasmingizni qo'yishingiz mumkin */}
              <div className="absolute -bottom-5 -right-3 rounded-2xl border border-ink/10 bg-cream px-5 py-4 shadow-card">
                <p className="font-display text-2xl font-bold leading-none">
                  {about.stats[0]?.value}
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft">
                  {about.stats[0]?.label}
                </p>
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
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
