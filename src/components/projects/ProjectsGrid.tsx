"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type ProjectsGridProps = {
  projects: Project[];
  locale: Locale;
  dict: Dictionary["projects"];
};

export function ProjectsGrid({ projects, locale, dict }: ProjectsGridProps) {
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([tag]) => tag);
  }, [projects]);

  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(active));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <FilterButton
          active={active === "all"}
          onClick={() => setActive("all")}
        >
          {dict.filterAll}
        </FilterButton>
        {tags.map((tag) => (
          <FilterButton
            key={tag}
            active={active === tag}
            onClick={() => setActive(tag)}
          >
            {tag}
          </FilterButton>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-ink-soft">{dict.empty}</p>
      ) : (
        <div
          key={active}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              index={index}
              dict={dict}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
        active
          ? "border-ink bg-ink text-cream"
          : "border-ink/15 text-ink-soft hover:border-ink/35 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
