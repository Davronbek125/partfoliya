import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Arrow, Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type ProjectsSectionProps = {
  locale: Locale;
  projectsDict: Dictionary["projects"];
};

export function ProjectsSection({ locale, projectsDict }: ProjectsSectionProps) {
  const featured = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={projectsDict.eyebrow}
            title={projectsDict.title}
            description={projectsDict.description}
            action={
              <Button href={`/${locale}/projects`} variant="outline">
                {projectsDict.viewAll} <Arrow />
              </Button>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={0.05 * (index % 2)}>
              <ProjectCard
                project={project}
                locale={locale}
                index={index}
                dict={projectsDict}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
