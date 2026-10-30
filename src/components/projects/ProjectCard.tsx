import Link from "next/link";

import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  index: number;
  dict: Dictionary["projects"];
};

export function ProjectCard({ project, locale, index, dict }: ProjectCardProps) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group block h-full"
      aria-label={`${project.title} — ${dict.viewCase}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white/55 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-soft">
        <div className="relative aspect-[16/11] overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            style={
              project.image
                ? {
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: project.accent,
                  }
                : { background: project.gradient }
            }
          />
          <div
            aria-hidden
            className="grain-overlay pointer-events-none absolute inset-0 opacity-20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/75 via-black/20 to-transparent"
          />
          <span
            aria-hidden
            className="absolute -right-2 -top-5 font-display text-[7rem] font-bold leading-none text-white/15"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
            {project.category[locale]}
          </span>

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
              {project.title}
            </h3>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:rotate-45">
              <span aria-hidden>↗</span>
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm leading-relaxed text-ink-soft">
            {project.summary[locale]}
          </p>

          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-ink/10 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="flex shrink-0 items-center gap-2">
              {project.repo ? (
                <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cream">
                  GitHub
                </span>
              ) : null}
              {project.year ? (
                <span className="text-xs font-medium text-ink-soft">
                  {project.year}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
