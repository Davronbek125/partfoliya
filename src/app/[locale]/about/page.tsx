import { notFound } from "next/navigation";

import { About } from "@/components/sections/About";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { processSteps } from "@/content/process";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
        description={dict.meta.description}
      />

      <About locale={locale} about={dict.about} showHeading={false} />

      <section className="pb-24 md:pb-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">
              {locale === "uz" ? "Qanday ishlayman" : "How I work"}
            </p>
            <h2 className="display-md mt-4">
              {locale === "uz" ? "Ish jarayoni" : "Work process"}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {processSteps.map((item, index) => (
              <Reveal key={item.step} delay={0.04 * index}>
                <article className="h-full rounded-3xl border border-ink/10 bg-white/50 p-6">
                  <span className="font-display text-3xl font-bold text-coral">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {item[locale].title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item[locale].text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
