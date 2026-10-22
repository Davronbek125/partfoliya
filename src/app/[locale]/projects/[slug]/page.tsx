import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/Reveal";
import { Arrow, Button } from "@/components/ui/Button";
import { getNextProject, getProject, projects } from "@/content/projects";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary[locale],
    openGraph: {
      title: project.title,
      description: project.summary[locale],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const next = getNextProject(project.slug);

  return (
    <article className="pt-28 md:pt-36">
      <div className="shell">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          <span aria-hidden>←</span>
          {dict.projects.back}
        </Link>

        <header className="mt-8 grid gap-6 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
              {project.category[locale]}
              {project.year ? ` · ${project.year}` : ""}
            </p>
            <h1 className="display-lg mt-3">{project.title}</h1>
            <p className="prose-muted mt-4 max-w-2xl text-base sm:text-lg">
              {project.summary[locale]}
            </p>
          </div>
          {project.link ? (
            <div className="md:justify-self-end">
              <Button href={project.link} external>
                {dict.projects.visit} <Arrow />
              </Button>
            </div>
          ) : null}
        </header>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-ink/10 md:mt-14">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: project.gradient }}
          />
          <div
            aria-hidden
            className="grain-overlay pointer-events-none absolute inset-0 opacity-25"
          />
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center font-display text-[18vw] font-bold leading-none text-white/20"
          >
            {project.title}
          </span>
          <span className="absolute bottom-5 left-5 rounded-full bg-cream/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
            {project.role[locale]}
          </span>
        </div>

        <dl
          className={`mt-10 grid gap-6 border-y border-ink/10 py-8 ${
            project.year ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {dict.projects.role}
            </dt>
            <dd className="mt-2 font-display text-base font-semibold">
              {project.role[locale]}
            </dd>
          </div>
          {project.year ? (
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {dict.projects.year}
              </dt>
              <dd className="mt-2 font-display text-base font-semibold">
                {project.year}
              </dd>
            </div>
          ) : null}
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {dict.projects.stack}
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/10 px-2.5 py-1 text-xs font-medium text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-12 grid gap-10 pb-16 md:grid-cols-[1.3fr_0.7fr] md:gap-16 md:pb-24">
          <Reveal>
            <h2 className="display-md">
              {locale === "uz" ? "Loyiha haqida" : "About the project"}
            </h2>
            <p className="prose-muted mt-4 text-base sm:text-lg">
              {project.description[locale]}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-ink/10 bg-white/55 p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {dict.projects.highlights}
              </h3>
              <ul className="mt-4 space-y-4">
                {project.highlights[locale].map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-0.5 font-display text-xs font-bold text-coral"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-ink/10 py-10">
          <Link
            href={`/${locale}/projects/${next.slug}`}
            className="group flex flex-col gap-2 rounded-3xl border border-ink/10 bg-white/40 p-6 transition-colors hover:border-ink/25 hover:bg-white/70 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {dict.projects.next}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">
                {next.title}
              </p>
            </div>
            <span className="grid size-11 place-items-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover:rotate-45">
              <span aria-hidden>↗</span>
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
