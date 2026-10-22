import { notFound } from "next/navigation";

import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/content/projects";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function ProjectsPage({
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
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.listTitle}
        description={dict.projects.listDescription}
      />

      <section className="pb-24 md:pb-32">
        <div className="shell">
          <ProjectsGrid
            projects={projects}
            locale={locale}
            dict={dict.projects}
          />
        </div>
      </section>
    </>
  );
}
