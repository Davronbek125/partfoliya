import { notFound } from "next/navigation";

import { ContactForm } from "@/components/projects/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/content/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function ContactPage({
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
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        description={dict.contact.description}
      />

      <section className="pb-24 md:pb-32">
        <div className="shell grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div className="rounded-[2rem] border border-ink/10 bg-white/55 p-6 sm:p-8">
            <ContactForm contact={dict.contact} siteEmail={site.email} />
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-3xl border border-ink/10 bg-white/55 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {dict.contact.emailLabel}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block font-display text-lg font-semibold break-all transition-colors hover:text-coral"
              >
                {site.email}
              </a>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-white/55 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {dict.contact.socialLabel}
              </p>
              <ul className="mt-3 grid gap-1">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-between rounded-xl px-2 py-2 text-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                    >
                      {social.label}
                      <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-white/55 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {dict.contact.locationLabel}
              </p>
              <p className="mt-2 font-display text-base font-semibold">
                {site.location[locale]}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
