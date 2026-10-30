"use client";

import dynamic from "next/dynamic";

import { Poster } from "@/components/three/Poster";
import { Button, Arrow } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <Poster />,
});

function RotatingBadge() {
  return (
    <div
      aria-hidden
      className="absolute -bottom-4 -left-2 grid size-24 place-items-center sm:size-28"
    >
      <span className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-ink/25" />
      <span className="absolute inset-3 animate-[spin_28s_linear_infinite_reverse] rounded-full border border-ink/10" />
      <span className="grid size-11 place-items-center rounded-full bg-ink text-lg leading-none text-cream shadow-card">
        ✳
      </span>
    </div>
  );
}

type HeroProps = {
  locale: Locale;
  hero: Dictionary["hero"];
};

export function Hero({ locale, hero }: HeroProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="mesh relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pt-32"
    >
      <div
        aria-hidden
        className="grain-overlay pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-24 hidden select-none font-display text-[11rem] font-bold leading-none text-stroke opacity-[0.07] xl:block"
      >
        PORT
        <br />
        FOLIO
      </div>

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8">
        <div>
          <span
            className="rise inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream/70 px-4 py-2 text-xs font-semibold text-ink-soft backdrop-blur"
            style={{ animationDelay: "40ms" }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime" />
            </span>
            {hero.badge}
          </span>

          <p
            className="rise mt-6 text-sm font-medium uppercase tracking-[0.22em] text-ink-soft"
            style={{ animationDelay: "100ms" }}
          >
            {hero.greeting}
          </p>

          <h1
            className="display-xl rise mt-3"
            style={{ animationDelay: "160ms" }}
          >
            <span className="block">{hero.firstName}</span>
            <span className="mt-1 block bg-gradient-to-r from-coral via-pink to-violet bg-clip-text text-transparent">
              {hero.lastName}
            </span>
          </h1>

          <p
            className="rise mt-6 max-w-xl text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft"
            style={{ animationDelay: "220ms" }}
          >
            {hero.role}
          </p>

          <p
            className="prose-muted rise mt-4 max-w-xl text-base sm:text-lg"
            style={{ animationDelay: "260ms" }}
          >
            {hero.description}
          </p>

          <div
            className="rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "320ms" }}
          >
            <Button href={`/${locale}/projects`}>
              {hero.primaryCta} <Arrow />
            </Button>
            <Button href={`/${locale}/contact`} variant="outline">
              {hero.secondaryCta}
            </Button>
          </div>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-medium text-ink-soft"
            style={{ animationDelay: "360ms" }}
          >
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="text-coral">
                ◍
              </span>
              {site.location[locale]}
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="text-violet">
                ✦
              </span>
              Next.js · Three.js · GSAP
            </span>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 transition-colors hover:text-ink"
            >
              <span aria-hidden className="text-ink">
                ◈
              </span>
              GitHub
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div
          className="rise relative mx-auto w-full max-w-[520px]"
          style={{ animationDelay: "220ms" }}
        >
          <div className="relative aspect-square w-full">
            <div
              aria-hidden
              className="absolute inset-2 animate-float-slow rounded-[42%] bg-gradient-to-br from-coral/25 via-pink/20 to-violet/25 blur-2xl"
            />
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-ink/10 bg-gradient-to-b from-white/50 to-cream/20 backdrop-blur-sm">
              {reduced ? <Poster /> : <HeroScene />}
            </div>

            <span className="absolute -left-1 top-6 rounded-full border border-ink/10 bg-cream/90 px-4 py-2 text-[11px] font-semibold shadow-card backdrop-blur">
              WebGL · real-time
            </span>
            <span className="absolute -right-1 bottom-10 rounded-full border border-ink/10 bg-ink px-4 py-2 text-[11px] font-semibold text-cream shadow-card">
              60 FPS
            </span>

            <RotatingBadge />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink-soft">
          <span aria-hidden>↓</span>
          {hero.scroll}
        </span>
      </div>
    </section>
  );
}
