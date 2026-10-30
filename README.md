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
│   ├── api/chat/route.ts       # AI elchi API (LLM + fallback)
│   ├── globals.css             # Dizayn tokenlari (ranglar, shrift, utility)
│   ├── icon.svg
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── assistant/              # AI elchi (chat widget)
│   ├── layout/                 # Header, Footer
│   ├── motion/                 # Reveal (GSAP + ScrollTrigger)
│   ├── projects/               # ProjectCard, ProjectsGrid, ContactForm
│   ├── sections/               # Hero, About, Projects, ContactCta, SkillsMarquee
│   ├── three/                  # HeroScene (R3F)
│   └── ui/                     # Button, SectionHeading, PageHeader
├── content/
│   ├── site.ts                 # Ism, email, GitHub, ijtimoiy tarmoqlar, joylashuv
│   ├── projects.ts             # Loyihalar ro'yxati (GitHub havolalari bilan)
│   ├── process.ts              # Ish jarayoni (about sahifasi)
│   └── skills.ts               # Marquee uchun texnologiyalar
├── lib/
│   ├── assistant-fallback.ts   # Kalitsiz rejim uchun qoidaviy javoblar
│   └── rate-limit.ts           # API uchun oddiy rate limit
└── i18n/
    ├── config.ts               # locales, defaultLocale
    ├── get-dictionary.ts
    └── dictionaries/           # uz.json, en.json
```

## Kontentni almashtirish

Hammasi `src/content/` va `src/i18n/dictionaries/` ichida. Kodga tegish shart emas.

| Nima | Fayl |
|---|---|
| Ism, email, GitHub, ijtimoiy tarmoqlar, shahar | `src/content/site.ts` |
| Loyihalar (nom, tavsif, teglar, gradient, `image`, `repo` / `link`) | `src/content/projects.ts` |
| Ish jarayoni (about sahifasi) | `src/content/process.ts` |
| Barcha matnlar (uz / en) | `src/i18n/dictionaries/*.json` |
| Ranglar, shriftlar, dizayn tokenlari | `src/app/globals.css` (`@theme` bloki) |

**Muhim:** `src/content/site.ts` dagi `url` ni deploydan oldin real domenga o'zgartiring — u sitemap va OG uchun ishlatiladi. Email va GitHub allaqachon real qiymatlar bilan to'ldirilgan; Telegram yoki telefon qo'shmoqchi bo'lsangiz, `socials` massiviga qo'shing.

Loyihalar GitHub profilidagi (`Davronbek125`) ochiq repozitoriylar asosida qo'lda tanlangan. Har bir loyihada `repo` maydoni bo'lsa, karta va detail sahifada GitHub havolasi chiqadi; jonli demo uchun `link` ishlatiladi. Yangi repo qo'shsangiz, `projects.ts` massiviga yangi element qo'shing.

Loyiha coverlari `public/projects/*.svg` ichida — har biri loyihaga xos, qo'lda chizilgan vektor rasm. Yangi loyiha uchun `image` maydoniga yo'l yozing; `gradient` rasm yuklanmaguncha fallback bo'lib qoladi. Portret `public/images/davronbek-portrait.webp` da (`About.tsx`).

## 3D hero

`src/components/three/HeroScene.tsx` — React Three Fiber sahna:
- deformatsiyalanuvchi ikosaedr (`MeshDistortMaterial`)
- zarrachalar buluti
- sichqonchaga javob beruvchi parallaks
- `prefers-reduced-motion` yoqilganda statik gradient ko'rsatiladi
- canvas ekrandan chiqqanda render to'xtaydi

Og'irlikni kamaytirish kerak bo'lsa, `Dust` zarrachalar sonini yoki `dpr` ni pasaytiring.

## AI yordamchi

Saytning o'ng pastida suzuvchi chat widget (`src/components/assistant/AssistantWidget.tsx`) ishlaydi.

- `src/app/api/chat/route.ts` — `POST` endpoint. `OPENAI_API_KEY` mavjud bo'lsa, tanlangan modelga so'rov yuboradi. Kalit bo'lmasa yoki provayder xato bersa, `src/lib/assistant-fallback.ts` dagi tasdiqlangan qoidaviy javoblar qaytadi — widget hech qachon bo'sh qolmaydi.
- System prompt `src/content/assistant.ts` da. U faqat serverda o'qiladi va brauzerga yuborilmaydi.
- Suhbat `sessionStorage` da saqlanadi: sahifa yangilanganda qoladi, brauzer yopilganda o'chadi. Til almashtirilsa, suhbat yangidan boshlanadi.
- Rate limit IP bo'yicha 5 daqiqada 20 so'rov (`src/lib/rate-limit.ts`). Bu in-memory hisoblagich: serverless instance qayta ishga tushsa, nolga qaytadi. Katta trafik uchun Upstash Redis asosidagi limit tavsiya etiladi.
- Javoblar 420 token bilan cheklangan, suhbat tarixi oxirgi 8 xabar bilan yuboriladi.

Sozlash:

1. `.env.example` ni `.env.local` ga nusxalang.
2. `OPENAI_API_KEY` ni kiriting. OpenRouter uchun `OPENAI_BASE_URL=https://openrouter.ai/api/v1` va `OPENAI_MODEL=openai/gpt-4o-mini` qiymatlari tayyor.
3. Serverni qayta ishga tushiring.

Alwaysdata'da: **Web → Sites → Environment** bo'limiga ayni o'zgaruvchilarni qo'shing va saytni restart qiling. Kalitni repoga commit qilmang.

## i18n

- `/uz` va `/en` — statik generatsiya qilinadi (`generateStaticParams`)
- `/` → `/uz` ga redirect (`next.config.ts`)
- Til almashtirish joriy sahifani saqlaydi
- Yangi matn qo'shsangiz, ikkala JSON faylga ham qo'shing (`uz.json` asosiy tip hisoblanadi)

## Deploy

Sayt **Alwaysdata**'da Node.js sayt sifatida joylashadi: <https://partfolya.alwaysdata.net>.

1. Kodni GitHub'ga push qiling: `git push origin main`.
2. Alwaysdata panelida **Web → Sites → Add a site** → **Node.js** turini tanlang.
3. Sozlamalar:
   - **Address**: `partfolya.alwaysdata.net`
   - **Working directory**: `/home/partfolya/www/partfolya`
   - **Node.js version**: 20.9 yoki yuqori
   - **Build command**: `npm ci && npm run build`
   - **Start command**: `npm run start -- -p $PORT -H 0.0.0.0`
   - **Environment**: `NODE_ENV=production`, `NEXT_TELEMETRY_DISABLED=1` va AI kalitlari
4. SSH orqali kodni torting (`git clone` yoki `git pull`) va build buyrug'ini bir marta qo'lda ishga tushiring.
5. Saytni restart qiling va tekshiring: `/uz`, `/en`, loyiha sahifalari, `/api/chat`, contact forma.

`src/content/site.ts` dagi `url` allaqachon `https://partfolya.alwaysdata.net` — u sitemap, `robots.txt`, `metadataBase` va OG rasm uchun ishlatiladi. Domen o'zgarsa, faqat shu qiymatni yangilang.

## Eslatma

Loyiha OneDrive papkasida turibdi. `node_modules` va `.next` ni OneDrive sinxronlashdan chiqarish tavsiya etiladi — aks holda dev server va build sekinlashishi mumkin.

## Litsenziyalar

Three.js, React Three Fiber, Next.js, Tailwind CSS — MIT. GSAP — GSAP Standard License (bepul reja).
