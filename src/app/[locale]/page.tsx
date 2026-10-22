import { notFound } from "next/navigation";

import { About } from "@/components/sections/About";
import { ContactCta } from "@/components/sections/ContactCta";
import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsMarquee } from "@/components/sections/SkillsMarquee";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} hero={dict.hero} />
      <SkillsMarquee />
      <About locale={locale} about={dict.about} />
      <ProjectsSection locale={locale} projectsDict={dict.projects} />
      <ContactCta locale={locale} contact={dict.contact} />
    </>
  );
}
