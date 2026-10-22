# Partfoliya

Shaxsiy portfolio sayt: **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, **React Three Fiber** va **GSAP**.

Ikki tilli (`uz` / `en`), interaktiv 3D hero, scroll animatsiyalari va loyihalar bo'limi bilan.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda: http://localhost:3000 — avtomatik `/uz` ga yo'naltiriladi.

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Tuzilma

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout: shriftlar, header, footer, SEO
│   │   ├── page.tsx            # Bosh sahifa
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   ├── globals.css             # Dizayn tokenlari (ranglar, shrift, utility)
│   ├── icon.svg
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/                 # Header, Footer
│   ├── motion/                 # Reveal (GSAP + ScrollTrigger)
│   ├── projects/               # ProjectCard, ProjectsGrid, ContactForm
│   ├── sections/               # Hero, About, Projects, ContactCta, SkillsMarquee
│   ├── three/                  # HeroScene (R3F)
│   └── ui/                     # Button, SectionHeading, PageHeader
├── content/
│   ├── site.ts                 # Ism, email, ijtimoiy tarmoqlar, joylashuv
│   ├── projects.ts             # Loyihalar ro'yxati (2 tilda)
│   ├── process.ts              # Ish jarayoni (about sahifasi)
│   └── skills.ts               # Marquee uchun texnologiyalar
└── i18n/
    ├── config.ts               # locales, defaultLocale
    ├── get-dictionary.ts
    └── dictionaries/           # uz.json, en.json
```

## Kontentni almashtirish

Hammasi `src/content/` va `src/i18n/dictionaries/` ichida. Kodga tegish shart emas.

| Nima | Fayl |
|---|---|
| Ism, email, ijtimoiy tarmoqlar, shahar | `src/content/site.ts` |
| Loyihalar (nom, tavsif, teglar, gradient, havola) | `src/content/projects.ts` |
| Ish jarayoni (about sahifasi) | `src/content/process.ts` |
| Barcha matnlar (uz / en) | `src/i18n/dictionaries/*.json` |
| Ranglar, shriftlar, dizayn tokenlari | `src/app/globals.css` (`@theme` bloki) |

**Muhim:** `src/content/site.ts` dagi `name`, `email`, `socials` va `url` ni albatta o'zgartiring — ular butun sayt bo'ylab ishlatiladi.

Rasm qo'shish: `public/images/` ga joylang, `next/image` orqali ishlating. Hozircha portret o'rnida gradient karta turadi (`src/components/sections/About.tsx`).

## 3D hero

`src/components/three/HeroScene.tsx` — React Three Fiber sahna:
- deformatsiyalanuvchi ikosaedr (`MeshDistortMaterial`)
- zarrachalar buluti
- sichqonchaga javob beruvchi parallaks
- `prefers-reduced-motion` yoqilganda statik gradient ko'rsatiladi
- canvas ekrandan chiqqanda render to'xtaydi

Og'irlikni kamaytirish kerak bo'lsa, `Dust` zarrachalar sonini yoki `dpr` ni pasaytiring.

## i18n

- `/uz` va `/en` — statik generatsiya qilinadi (`generateStaticParams`)
- `/` → `/uz` ga redirect (`next.config.ts`)
- Til almashtirish joriy sahifani saqlaydi
- Yangi matn qo'shsangiz, ikkala JSON faylga ham qo'shing (`uz.json` asosiy tip hisoblanadi)

## Deploy

1. GitHub'ga push qiling.
2. [Vercel](https://vercel.com) da import qiling.
3. `src/content/site.ts` dagi `url` ni real domenga o'zgartiring (sitemap va OG uchun).

## Eslatma

Loyiha OneDrive papkasida turibdi. `node_modules` va `.next` ni OneDrive sinxronlashdan chiqarish tavsiya etiladi — aks holda dev server va build sekinlashishi mumkin.

## Litsenziyalar

Three.js, React Three Fiber, Next.js, Tailwind CSS — MIT. GSAP — GSAP Standard License (bepul reja).
