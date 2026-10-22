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
  link?: string;
  featured?: boolean;
};

/**
 * Asosiy loyihalar. Yangi loyiha qo'shish uchun shu massivga element qo'shing.
 * `gradient` — karta foni, `accent` — detail sahifadagi urg'u rangi.
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
    featured: true,
  },
  {
    slug: "soliq-ai",
    title: "Soliq AI",
    category: { uz: "Telegram bot", en: "Telegram bot" },
    role: { uz: "AI konsalting", en: "AI consulting" },
    summary: {
      uz: "Tadbirkorlar va hisobchilar uchun soliq qonunchiligi bo'yicha 24/7 avtomatlashtirilgan konsalting.",
      en: "24/7 automated tax-law consulting for entrepreneurs and accountants.",
    },
    description: {
      uz: "Soliq AI — O'zbekiston soliq qonunchiligi, muddatlari va hisobot shakllari bo'yicha savollarga javob beruvchi Telegram bot. Aiogram 3.x, PostgreSQL va normativ bilimlar bazasi asosida ishlaydi. Ma'lumotlar tuzilgan holda saqlanadi, javoblar esa manba bilan birga taqdim etiladi.",
      en: "Soliq AI is a Telegram bot that answers questions about Uzbek tax law, deadlines and reporting forms. It runs on Aiogram 3.x, PostgreSQL and a regulatory knowledge base. Data is stored in a structured form and answers are delivered with their source.",
    },
    highlights: {
      uz: [
        "Aiogram 3.x bilan asinxron arxitektura",
        "Normativ bilimlar bazasi va tuzilgan javoblar",
        "Kecha-yu kunduz ishlaydigan avtomatik konsalting",
      ],
      en: [
        "Asynchronous architecture with Aiogram 3.x",
        "Regulatory knowledge base and structured answers",
        "Automated consulting around the clock",
      ],
    },
    tags: ["Python", "Aiogram 3.x", "PostgreSQL", "LLM"],
    gradient: "linear-gradient(135deg, #0EA5E9 0%, #35C4A0 52%, #C6F24E 100%)",
    accent: "#0EA5E9",
    featured: true,
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
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
