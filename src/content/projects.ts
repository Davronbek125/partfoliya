export type Localized = { uz: string; en: string };

export type Project = {
  slug: string;
  title: string;
  year?: string;
  category: Localized;
  role: Localized;
  summary: Localized;
  description: Localized;
  highlights: { uz: string[]; en: string[] };
  tags: string[];
  gradient: string;
  accent: string;
  /** Karta va detail sahifa uchun cover rasmi (public/projects). */
  image?: string;
  /** Ochiq kod manbasi (GitHub). */
  repo?: string;
  /** Ishlaydigan sayt yoki demo. */
  link?: string;
  featured?: boolean;
};

/**
 * Asosiy loyihalar. Yangi loyiha qo'shish uchun shu massivga element qo'shing.
 * `image` — karta va detail sahifadagi cover (public/projects).
 * `gradient` — cover yuklanmaguncha fallback, `accent` — detail sahifadagi urg'u rangi.
 * `repo` — GitHub havolasi, `link` — jonli demo.
 */
export const projects: Project[] = [
  {
    slug: "yukgo",
    title: "YukGO",
    category: { uz: "Logistika platformasi", en: "Logistics platform" },
    role: { uz: "Backend va frontend", en: "Backend & frontend" },
    summary: {
      uz: "Markaziy Osiyoda yuk jo'natuvchilar va haydovchilarni real vaqtda bog'lovchi platforma.",
      en: "A platform connecting shippers and drivers across Central Asia in real time.",
    },
    description: {
      uz: "YukGO yuk tashish bozoridagi asosiy muammoni hal qiladi: buyurtma, haydovchi va marshrutni bitta tizimda birlashtiradi. FastAPI backend, PostgreSQL va zamonaviy veb-interfeys asosida qurilgan. Foydalanuvchilar buyurtmalarni filtrlaydi, marshrut narxini hisoblaydi va shaxsiy kabinetda tarixni kuzatadi.",
      en: "YukGO solves the core problem of the freight market: orders, drivers and routes in one system. Built with a FastAPI backend, PostgreSQL and a modern web interface. Users filter orders, calculate route pricing and track history in a personal dashboard.",
    },
    highlights: {
      uz: [
        "FastAPI asosidagi yuqori unumdor backend",
        "Buyurtmalar filtri va marshrut kalkulyatsiyasi",
        "Jo'natuvchi va haydovchi uchun alohida kabinetlar",
      ],
      en: [
        "High-performance FastAPI backend",
        "Order filtering and route calculation",
        "Separate dashboards for shippers and drivers",
      ],
    },
    tags: ["FastAPI", "PostgreSQL", "Python"],
    gradient: "linear-gradient(135deg, #FF5A3C 0%, #FF8A3D 48%, #7B5CFF 100%)",
    accent: "#FF5A3C",
    image: "/projects/yukgo.svg",
    featured: true,
  },
  {
    slug: "soliq-ai",
    title: "Soliq AI",
    category: { uz: "Telegram bot", en: "Telegram bot" },
    role: { uz: "Backend va bot", en: "Backend & bot" },
    summary: {
      uz: "Tadbirkorlar uchun 2026-yilgi soliq rejimlarini solishtirib, eng maqbulini tavsiya qiluvchi Telegram bot.",
      en: "A Telegram bot that compares 2026 tax regimes and recommends the most efficient one for entrepreneurs.",
    },
    description: {
      uz: "Foydalanuvchi yillik tushumini yuboradi — bot YATT, self-employed va boshqa soliq rejimlarini hisoblab, eng kam yuklamani tavsiya qiladi. Aiogram 3.x, SQLite va alohida tax engine asosida qurilgan. Javobda soliq yuki, samaradorlik foizi, tavsiyalar va qonuniy asos ko'rsatiladi.",
      en: "The user sends their annual revenue; the bot calculates YATT, self-employment and other tax regimes and recommends the lightest burden. Built with Aiogram 3.x, SQLite and a dedicated tax engine. Each answer includes the tax burden, effective rate, recommendations and legal references.",
    },
    highlights: {
      uz: [
        "Soliq rejimlarini avtomatik solishtirish",
        "YATT va self-employed kalkulyatorlari",
        "Qonuniy asos bilan tushuntirilgan javoblar",
      ],
      en: [
        "Automatic comparison of tax regimes",
        "YATT and self-employment calculators",
        "Answers explained with legal references",
      ],
    },
    tags: ["Python", "Aiogram 3.x", "SQLite", "FinTech"],
    gradient: "linear-gradient(135deg, #0EA5E9 0%, #35C4A0 52%, #C6F24E 100%)",
    accent: "#0EA5E9",
    image: "/projects/soliq-ai.svg",
    repo: "https://github.com/Davronbek125/soliq-bot",
    featured: true,
  },
  {
    slug: "xauusd-bot",
    title: "XAUUSD Signal Bot",
    category: { uz: "Trading bot", en: "Trading bot" },
    role: { uz: "Python dasturchi", en: "Python developer" },
    summary: {
      uz: "Oltin (XAUUSD) bozorini tahlil qilib, Telegramga kirish, SL va TP darajalari bilan signal yuboruvchi bot.",
      en: "A Telegram bot that analyses the gold market (XAUUSD) and sends signals with entry, stop-loss and take-profit levels.",
    },
    description: {
      uz: "Bot H1/H4 taymfreymlarda SMC (Order Block, FVG, BOS) va texnik filtrlar (SuperTrend, ADX, RSI, EMA200) asosida signal tayyorlaydi. Har bir xabarda kirish, SL, TP1–TP3 va lot hajmi beriladi. 12 000 shamchali backtest, 113 ta pytest testi va Docker Compose orqali 24/7 deploy mavjud.",
      en: "The bot generates signals on H1/H4 using SMC concepts (order blocks, FVG, BOS) and technical filters (SuperTrend, ADX, RSI, EMA200). Every message includes entry, stop-loss, TP1–TP3 and position size. It ships with a 12,000-candle backtest, 113 pytest tests and a Docker Compose deployment for 24/7 operation.",
    },
    highlights: {
      uz: [
        "SMC va texnik filtrlar kombinatsiyasi",
        "12 000 shamchali backtest natijalari",
        "113 ta test va Docker orqali deploy",
      ],
      en: [
        "SMC combined with technical filters",
        "Backtested on 12,000 candles",
        "113 tests and Docker-based deployment",
      ],
    },
    tags: ["Python", "Aiogram 3.x", "SMC", "Docker", "Backtesting"],
    gradient: "linear-gradient(135deg, #F7B733 0%, #FC4A1A 55%, #7B1FA2 100%)",
    accent: "#F59E0B",
    image: "/projects/xauusd-bot.svg",
    repo: "https://github.com/Davronbek125/treder-bot",
    featured: true,
  },
  {
    slug: "alisa-uz",
    title: "Alisa-UZ",
    category: { uz: "Ovozli AI", en: "Voice AI" },
    role: { uz: "AI engineer", en: "AI engineer" },
    summary: {
      uz: "O'zbekcha ovozli yordamchi uchun texnik spetsifikatsiya va MVP skeleti: STT, safety va o'yin modullari.",
      en: "A technical spec and MVP skeleton for an Uzbek-language voice assistant: STT, safety and game modules.",
    },
    description: {
      uz: "Alisa-UZ — o'zbekcha ovozli yordamchi loyihasi. Repozitoriyda v2.1 texnik spetsifikatsiyasi, Whisper/Gemini uchun modul arxitekturasi, VAD va wake-word qatlami, safety/kids mode hamda o'yin modullari uchun skelet va testlar mavjud. Maqsad: STT WER ≤15%, safety blok ≥95%, p50 latency <4s.",
      en: "Alisa-UZ is an Uzbek-language voice assistant project. The repository contains the v2.1 technical specification, a modular architecture for Whisper/Gemini, VAD and wake-word layers, safety/kids mode and game modules, plus test scaffolding. Targets: STT WER ≤15%, safety block ≥95%, p50 latency <4s.",
    },
    highlights: {
      uz: [
        "Whisper va Gemini uchun modul arxitektura",
        "Safety va kids mode spetsifikatsiyasi",
        "Latency va sifat uchun o'lchov mezonlari",
      ],
      en: [
        "Modular architecture for Whisper and Gemini",
        "Safety and kids-mode specification",
        "Measurable latency and quality targets",
      ],
    },
    tags: ["Python", "Whisper", "Gemini", "STT", "Safety"],
    gradient: "linear-gradient(135deg, #22D3EE 0%, #6366F1 55%, #A855F7 100%)",
    accent: "#6366F1",
    image: "/projects/alisa-uz.svg",
    repo: "https://github.com/Davronbek125/voice-ai-agent",
  },
  {
    slug: "kino-platforma",
    title: "Kino Platforma",
    category: { uz: "Striming platforma", en: "Streaming platform" },
    role: { uz: "Full-stack", en: "Full-stack" },
    summary: {
      uz: "O'zbek tilidagi striming platformasi: katalog, HLS pleer, watchlist va admin panel.",
      en: "An Uzbek-language streaming platform with a catalogue, HLS player, watchlist and admin panel.",
    },
    description: {
      uz: "Next.js 16 va React 19 asosida qurilgan kino platformasi prototipi. Filmlar katalogi, janr filtri, Top 10, davom etib ko'rish, watchlist, HLS video pleer va obuna modali mavjud. Admin panel kontent va foydalanuvchi analitikasi uchun mo'ljallangan. Hozircha ma'lumotlar mock data bilan ishlaydi; backend integratsiyasi keyingi bosqichda.",
      en: "A cinema platform prototype built with Next.js 16 and React 19. It includes a movie catalogue, genre filters, Top 10, continue watching, watchlist, an HLS video player and a subscription modal. The admin panel is designed for content and audience analytics. Data currently comes from mocks; backend integration is the next stage.",
    },
    highlights: {
      uz: [
        "Katalog, janr filtri va Top 10",
        "HLS video pleer va watchlist",
        "Admin panel va obuna oqimi",
      ],
      en: [
        "Catalogue, genre filters and Top 10",
        "HLS video player and watchlist",
        "Admin panel and subscription flow",
      ],
    },
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "HLS"],
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #6D28D9 55%, #EC4899 100%)",
    accent: "#7C3AED",
    image: "/projects/kino-platforma.svg",
    repo: "https://github.com/Davronbek125/web",
    featured: true,
  },
  {
    slug: "klinika-navbat",
    title: "Klinika Navbat",
    category: { uz: "Sog'liqni saqlash", en: "Healthcare system" },
    role: { uz: "Full-stack", en: "Full-stack" },
    summary: {
      uz: "Klinikalar uchun elektron navbat: Telegram bot, FastAPI WebApp va rolga asoslangan panellar.",
      en: "An electronic queue for clinics: a Telegram bot, FastAPI WebApp and role-based dashboards.",
    },
    description: {
      uz: "Tizim bemorlarni Telegram orqali ro'yxatga oladi, shifokorlar jadvali va jonli navbatni boshqaradi. FastAPI WebApp ichida Super Admin, Reception va shifokor kabineti mavjud. SQLite WAL, uz/ru tarjimalar, ETA hisob-kitobi, anti-flood va auth middleware ishlatiladi.",
      en: "The system registers patients through Telegram and manages doctor schedules and a live queue. The FastAPI WebApp includes super-admin, reception and doctor dashboards. It uses SQLite WAL, uz/ru localisation, ETA calculation, anti-flood and auth middleware.",
    },
    highlights: {
      uz: [
        "Telegram bot va FastAPI WebApp bir tizimda",
        "3 rol uchun alohida panellar",
        "SQLite WAL, i18n va avtomatik testlar",
      ],
      en: [
        "Telegram bot and FastAPI WebApp in one system",
        "Separate dashboards for 3 roles",
        "SQLite WAL, i18n and automated tests",
      ],
    },
    tags: ["Python", "FastAPI", "Aiogram 3.x", "SQLite", "WebApp"],
    gradient: "linear-gradient(135deg, #10B981 0%, #14B8A6 55%, #0EA5E9 100%)",
    accent: "#10B981",
    image: "/projects/klinika-navbat.svg",
    repo: "https://github.com/Davronbek125/medicin",
  },
  {
    slug: "fitkundalik",
    title: "FitKundalik",
    category: { uz: "Android ilova", en: "Android app" },
    role: { uz: "Android dasturchi", en: "Android developer" },
    summary: {
      uz: "Kotlin va Jetpack Compose'da yozilgan Android fitness kundaligi.",
      en: "An Android fitness diary built with Kotlin and Jetpack Compose.",
    },
    description: {
      uz: "FitKundalik mashq va yugurish loglarini, kunlik vazifalarni va statistikani bitta ilovada birlashtiradi. Jetpack Compose, Navigation 3, Hilt va Room asosida qurilgan; ma'lumotlar offline saqlanadi. Material 3 dizayni va instrumented testlar mavjud.",
      en: "FitKundalik combines workout and run logs, daily quests and statistics in one app. Built with Jetpack Compose, Navigation 3, Hilt and Room; data is stored offline. It uses Material 3 and includes instrumented tests.",
    },
    highlights: {
      uz: [
        "Compose va Material 3 interfeys",
        "Room bilan offline ma'lumotlar",
        "Hilt DI va Navigation 3",
      ],
      en: [
        "Compose and Material 3 interface",
        "Offline data with Room",
        "Hilt DI and Navigation 3",
      ],
    },
    tags: ["Kotlin", "Compose", "Room", "Hilt", "Android"],
    gradient: "linear-gradient(135deg, #F43F5E 0%, #FB7185 55%, #FFB37A 100%)",
    accent: "#F43F5E",
    image: "/projects/fitkundalik.svg",
    repo: "https://github.com/Davronbek125/fitkundalik",
  },
  {
    slug: "hoplam",
    title: "Ho'plam",
    category: { uz: "Pre-order platforma", en: "Pre-order platform" },
    role: { uz: "Full-stack", en: "Full-stack" },
    summary: {
      uz: "Qahvaxonalar uchun navbatsiz buyurtma berish va to'lov qilish platformasi.",
      en: "A pre-order and payment platform that lets coffee shops skip the queue.",
    },
    description: {
      uz: "Ho'plam mijozlarga qahvaxona buyurtmasini oldindan berish va to'lash imkonini beradi. Mobil qurilmalarga moslashgan veb-ilova, onlayn buyurtma API integratsiyasi va sotuv hisobotlari bir tizimda. Natijada navbat qisqaradi, buyurtma esa tayyor bo'lganda mijozga xabar beriladi.",
      en: "Ho'plam lets customers pre-order and pay at a coffee shop. A mobile-first web app, online order API integration and sales reporting in one system. Queues shrink and customers are notified when the order is ready.",
    },
    highlights: {
      uz: [
        "Mobil qurilmalarga to'liq moslashgan interfeys",
        "Onlayn buyurtma va to'lov API integratsiyasi",
        "Sotuv va buyurtmalar bo'yicha hisobotlar",
      ],
      en: [
        "Fully responsive mobile-first interface",
        "Online ordering and payment API integration",
        "Sales and order reporting",
      ],
    },
    tags: ["HTML/CSS", "JavaScript", "REST API", "Payments"],
    gradient: "linear-gradient(135deg, #7B5CFF 0%, #B06CFF 45%, #FF7AC3 100%)",
    accent: "#7B5CFF",
    image: "/projects/hoplam.svg",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
