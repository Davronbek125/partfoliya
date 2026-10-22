import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales } from "@/i18n/config";

const routes = ["", "/about", "/projects", "/contact"];

const lastModified = new Date("2026-10-21");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${site.url}/${locale}${route}`,
        lastModified,
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            uz: `${site.url}/uz${route}`,
            en: `${site.url}/en${route}`,
          },
        },
      });
    }

    for (const project of projects) {
      entries.push({
        url: `${site.url}/${locale}/projects/${project.slug}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
