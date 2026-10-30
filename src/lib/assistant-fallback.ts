import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";

type Answers = {
  greeting: string;
  projects: string;
  stack: string;
  services: string;
  process: string;
  pricing: string;
  timeline: string;
  contact: string;
  availability: string;
  who: string;
  thanks: string;
  guardrail: string;
  fallback: string;
};

const answers: Record<Locale, Answers> = {
  uz: {
    greeting:
      "Assalomu alaykum! Men Davronbekning AI elchisiman. Loyihangiz, texnik yechim yoki hamkorlik haqida savol bering — yordam beraman.",
    projects:
      "Davronbekning tanlangan loyihalari: YukGO — Markaziy Osiyo uchun logistika platformasi (FastAPI, PostgreSQL); Soliq AI — 2026-yilgi soliq rejimlarini solishtiruvchi Telegram bot (Aiogram 3.x, SQLite); XAUUSD Signal Bot — oltin bozori uchun SMC va texnik tahlil boti; Alisa-UZ — o'zbekcha ovozli yordamchi uchun MVP skeleti; Kino Platforma — Next.js striming prototipi; Klinika Navbat — Telegram va FastAPI navbat tizimi; FitKundalik — Kotlin/Compose Android ilovasi. Ochiq kod: github.com/Davronbek125. Saytdagi «Loyihalar» bo'limida har biri batafsil.",
    stack:
      "Asosiy stack: Python, FastAPI, Aiogram 3.x, PostgreSQL, SQLite, SQL, HTML5/CSS3, Next.js, React va TypeScript. AI qismida avtonom agentlar, function calling / tool use, Model Context Protocol (MCP), prompt engineering, structured output (Pydantic/JSON) va model routing (Claude, OpenAI, Gemini, DeepSeek, OpenRouter, Ollama) ishlatiladi.",
    services:
      "Ha. Davronbek g'oyani to'liq ishlaydigan mahsulotga aylantiradi: avval talablarni tahlil qilib arxitektura tuzadi, keyin AI agentlar va prompt infratuzilmasini loyihalaydi, Python/SQL/HTML-CSS bilan mahsulotni quradi va serverga joylashtiradi. Aniq yechim uchun loyiha hajmi va integratsiyalarni bilish kerak.",
    process:
      "Jarayon 4 bosqichdan iborat: 1) g'oya va arxitektura tahlili (texnik spetsifikatsiya); 2) AI agentlar va prompt infratuzilmasi (Tools/MCP); 3) to'liq siklli dasturlash; 4) optimallashtirish va jonli serverga deployment.",
    pricing:
      `Narx loyiha hajmi, integratsiyalar soni va muddatga bog'liq — shuning uchun oldindan aniq raqam aytish to'g'ri bo'lmaydi. Qisqa brif yuborsangiz, Davronbek aniq taklif bilan javob beradi: ${site.email}.`,
    timeline:
      `Muddat ham loyiha murakkabligiga bog'liq: oddiy avtomatlashtirish bir necha kunda, to'liq platforma esa bosqichma-bosqich tayyorlanadi. Aniq reja uchun talablarni qisqa yozib yuboring: ${site.email}.`,
    contact: `Davronbek bilan bog'lanish: ${site.email}. GitHub: ${site.github}. Saytdagi «Aloqa» bo'limida xabar yuborish tugmasi ham bor — u pochta dasturini ochadi.`,
    availability:
      `Ha, Davronbek hozir yangi loyihalar uchun ochiq. Boshlash uchun loyiha maqsadi, asosiy funksiyalar va kutilayotgan muddatni qisqa yozib yuboring: ${site.email}.`,
    who: "Davronbek O'rishboev — AI Software Engineer, Prompt Architect va Full-Stack dasturchi. Python, SQL va HTML/CSS asosidagi bilimlarni avtonom AI agentlar va prompt engineering bilan birlashtirib, biznes jarayonlarini avtomatlashtiradi.",
    thanks:
      `Arzimaydi! Yana savolingiz bo'lsa, yozing. Loyihani muhokama qilish uchun: ${site.email}.`,
    guardrail:
      "Men faqat Davronbekning ishi, loyihalari va xizmatlari bo'yicha yordam beraman. Boshqa mavzuda javob bera olmayman, lekin loyihangiz bo'yicha savollaringizni berishingiz mumkin.",
    fallback:
      `Savolingiz uchun rahmat. Aniq javob berish uchun biroz kontekst kerak: loyiha maqsadi, kerakli funksiyalar yoki texnologiya haqida yozing. Davronbek bilan bevosita ham bog'lanishingiz mumkin: ${site.email}.`,
  },
  en: {
    greeting:
      "Hello! I am Davronbek's AI ambassador. Ask me about your project, a technical solution or working together — I am here to help.",
    projects:
      "Davronbek's selected projects: YukGO — a logistics platform for Central Asia (FastAPI, PostgreSQL); Soliq AI — a Telegram bot comparing 2026 tax regimes (Aiogram 3.x, SQLite); XAUUSD Signal Bot — SMC and technical analysis for the gold market; Alisa-UZ — a technical spec and MVP skeleton for an Uzbek voice assistant; Kino Platforma — a Next.js streaming prototype; Klinika Navbat — a Telegram + FastAPI queue system; FitKundalik — a Kotlin/Compose Android app. Open source: github.com/Davronbek125. Each has a detailed page in the Projects section.",
    stack:
      "Core stack: Python, FastAPI, Aiogram 3.x, PostgreSQL, SQLite, SQL, HTML5/CSS3, Next.js, React and TypeScript. On the AI side: autonomous agents, function calling / tool use, Model Context Protocol (MCP), prompt engineering, structured outputs (Pydantic/JSON) and model routing (Claude, OpenAI, Gemini, DeepSeek, OpenRouter, Ollama).",
    services:
      "Yes. Davronbek turns an idea into a fully working product: he analyses requirements and designs the architecture, builds the AI agents and prompt infrastructure, develops the product with Python/SQL/HTML-CSS, then deploys it. A precise proposal needs the project scope and integrations.",
    process:
      "The process has four stages: 1) idea and architecture analysis (technical spec); 2) AI agents and prompt infrastructure (Tools/MCP); 3) full-cycle development; 4) optimisation and deployment to a live server.",
    pricing: `Pricing depends on scope, the number of integrations and the timeline, so a precise figure up front would not be honest. Send a short brief and Davronbek will reply with a concrete proposal: ${site.email}.`,
    timeline: `The timeline also depends on complexity: a focused automation can take a few days, while a full platform is delivered in stages. Send a short description of the requirements for a realistic plan: ${site.email}.`,
    contact: `You can reach Davronbek at ${site.email}. GitHub: ${site.github}. The Contact page also has a message button that opens your email app.`,
    availability: `Yes, Davronbek is currently open to new projects. To start, send a short note about the goal, the core features and your expected timeline: ${site.email}.`,
    who: "Davronbek O'rishboev is an AI Software Engineer, Prompt Architect and Full-Stack Developer. He combines Python, SQL and HTML/CSS fundamentals with autonomous AI agents and prompt engineering to automate business processes.",
    thanks: `You're welcome! If you have another question, just ask. To discuss a project: ${site.email}.`,
    guardrail:
      "I only help with Davronbek's work, projects and services. I cannot answer questions on other topics, but you are welcome to ask about your project.",
    fallback: `Thanks for your question. I need a little more context to answer precisely: the goal of the project, the features you need or the technology in question. You can also contact Davronbek directly: ${site.email}.`,
  },
};

const keywords = {
  pricing: [
    "narx",
    "price",
    "cost",
    "byudjet",
    "budget",
    "qancha turadi",
    "how much",
    "quote",
  ],
  timeline: [
    "muddat",
    "deadline",
    "qancha vaqt",
    "how long",
    "timeline",
    "qachon tayyor",
    "when can",
  ],
  contact: [
    "aloqa",
    "bog'lan",
    "contact",
    "email",
    "telegram",
    "telefon",
    "phone",
    "reach out",
    "yozish",
    "github",
    "repo",
  ],
  services: [
    "qila ol",
    "can you",
    "mening g'oyam",
    "my idea",
    "avtomatlashtir",
    "automate",
    "xizmat",
    "service",
    "integratsiya",
    "integration",
    "ishlab chiq",
    "build for me",
    "start a project",
  ],
  availability: [
    "bo'sh",
    "boshmi",
    "available",
    "availability",
    "band",
    "free",
    "yangi loyiha",
    "new project",
    "boshlash",
  ],
  projects: [
    "loyiha",
    "project",
    "yukgo",
    "soliq",
    "ho'plam",
    "hoplam",
    "xauusd",
    "treder",
    "trading",
    "alisa",
    "ovozli",
    "voice",
    "kino",
    "streaming",
    "klinika",
    "clinic",
    "fitkundalik",
    "fit",
    "case study",
    "keys",
  ],
  stack: [
    "texnolog",
    "stack",
    "python",
    "fastapi",
    "aiogram",
    "postgres",
    "sqlite",
    "sql",
    "agent",
    "mcp",
    "prompt",
    "llm",
    "model",
    "framework",
    "next.js",
    "nextjs",
    "react",
    "typescript",
    "kotlin",
    "compose",
    "biladi",
    "know",
  ],
  process: [
    "jarayon",
    "process",
    "qanday ishlay",
    "how do you work",
    "how does he work",
    "bosqich",
    "step",
  ],
  who: ["davronbek", "kim", "who", "about", "haqida", "profil", "bio"],
  thanks: ["rahmat", "thank", "thanks"],
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text: string, needles: string[]): boolean {
  return needles.some((needle) => text.includes(needle));
}

/**
 * API kaliti bo'lmaganda yoki provayder javob bermaganda ishlatiladigan
 * qoidaga asoslangan javob. Har bir javob faqat tasdiqlangan faktlarga tayanadi.
 */
export function fallbackReply(locale: Locale, message: string): string {
  const text = normalize(message);
  const a = answers[locale];

  if (
    /(system prompt|ignore (all|previous)|jailbreak|promptni (ko'rsat|ayt)|instructions.*ignore)/.test(
      text,
    )
  ) {
    return a.guardrail;
  }

  if (hasAny(text, keywords.pricing)) return a.pricing;
  if (hasAny(text, keywords.timeline)) return a.timeline;
  if (hasAny(text, keywords.contact)) return a.contact;
  if (hasAny(text, keywords.services)) return a.services;
  if (hasAny(text, keywords.availability)) return a.availability;
  if (hasAny(text, keywords.projects)) return a.projects;
  if (hasAny(text, keywords.stack)) return a.stack;
  if (hasAny(text, keywords.process)) return a.process;
  if (hasAny(text, keywords.who)) return a.who;
  if (hasAny(text, keywords.thanks)) return a.thanks;

  if (
    /(^|\s)(hi|hey)(\s|$)/.test(text) ||
    hasAny(text, ["salom", "assalom", "hello"])
  ) {
    return a.greeting;
  }

  return a.fallback;
}
