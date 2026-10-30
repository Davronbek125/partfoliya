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

Muhim: free reja **256 MB RAM** beradi, `npm ci && npm run build` serverda OOM bilan o'chiriladi (tekshirilgan). Shuning uchun build **lokalda** qilinadi, serverga faqat tayyor standalone nusxa yuklanadi (≈35 MB, runtime ≈100 MB).

**Paneldagi sozlamalar** (Web → Sites → `partfolya.alwaysdata.net`):

| Maydon | Qiymat |
|---|---|
| Type | Node.js |
| Working directory | `/home/partfolya/www/partfolya` |
| Node.js version | 22 yoki 24 |
| Command | `node server.js` |
| Environment | `NEXT_TELEMETRY_DISABLED=1` + AI kalitlari (ixtiyoriy) |

**Deploy qilish:**

```powershell
powershell -ExecutionPolicy Bypass -File scripts/deploy.ps1
```

Skript: `npm run build` → `npm run pack` (standalone + `public` + `.next/static`) → arxiv → `scp` → serverda ochish. Oxirida panelda **↻ restart** bosiladi.

Qo'lda:

```bash
npm run build && npm run pack
tar -czf dist/partfolya-standalone.tgz -C dist/standalone .
scp -i ~/.ssh/alwaysdata_partfoliya dist/partfolya-standalone.tgz partfolya@ssh-partfolya.alwaysdata.net:www/partfolya/app.tgz
ssh -i ~/.ssh/alwaysdata_partfoliya partfolya@ssh-partfolya.alwaysdata.net \
  "cd ~/www/partfolya && tar -xzf app.tgz && rm app.tgz && mv -f server.js server-real.js"
scp -i ~/.ssh/alwaysdata_partfoliya deploy/server.js partfolya@ssh-partfolya.alwaysdata.net:www/partfolya/server.js
```

`deploy/server.js` — Next'ning `server.js` ini dual-stack (`::`) interfeysda ishga tushiruvchi o'ram. Alwaysdata upstream IPv6 manzilga ulanadi; usiz sayt **502** qaytaradi.

Tekshirish: `/uz`, `/en`, loyiha sahifalari, `/api/chat`, `sitemap.xml`, `robots.txt`.

`src/content/site.ts` dagi `url` allaqachon `https://partfolya.alwaysdata.net` — u sitemap, `robots.txt`, `metadataBase` va OG rasm uchun ishlatiladi. Domen o'zgarsa, faqat shu qiymatni yangilang.

## Eslatma

Loyiha OneDrive papkasida turibdi. `node_modules` va `.next` ni OneDrive sinxronlashdan chiqarish tavsiya etiladi — aks holda dev server va build sekinlashishi mumkin.

## Litsenziyalar

Three.js, React Three Fiber, Next.js, Tailwind CSS — MIT. GSAP — GSAP Standard License (bepul reja).
