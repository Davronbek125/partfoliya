export type ProcessStep = {
  step: string;
  uz: { title: string; text: string };
  en: { title: string; text: string };
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    uz: {
      title: "G'oya va arxitektura tahlili",
      text: "Xom talablardan aniq texnik spetsifikatsiya va arxitektura chiziladi. Natija — nima qurilishi, qanday ishlashi va qaysi chegaralar ichida qolishi aniq bo'ladi.",
    },
    en: {
      title: "Idea and architecture analysis",
      text: "Raw requirements become a precise technical specification and architecture. The outcome is clarity on what is built, how it works and where its boundaries are.",
    },
  },
  {
    step: "02",
    uz: {
      title: "AI agentlar va prompt infratuzilmasi",
      text: "Loyihaning ma'lumotlar bazasi va tashqi API'lari bilan mustaqil ishlaydigan vositalar (Tools, MCP) va aniq system promptlar loyihalanadi.",
    },
    en: {
      title: "AI agents and prompt infrastructure",
      text: "Tools and MCP connections that work independently with the database and external APIs are designed, together with precise system prompts.",
    },
  },
  {
    step: "03",
    uz: {
      title: "To'liq siklli dasturlash",
      text: "Python, SQL va HTML/CSS orqali xavfsiz backend, mustahkam ma'lumotlar bazasi va qulay frontend bitta mahsulotga birlashtiriladi.",
    },
    en: {
      title: "Full-cycle development",
      text: "A secure backend, a solid database and a comfortable frontend come together into one product using Python, SQL and HTML/CSS.",
    },
  },
  {
    step: "04",
    uz: {
      title: "Optimallashtirish va deployment",
      text: "Token sarfi va tizim tezligi optimallashtiriladi, xavfsizlik tekshiriladi va mahsulot jonli serverga to'liq ishga tushiriladi.",
    },
    en: {
      title: "Optimisation and deployment",
      text: "Token usage and system speed are optimised, security is reviewed, and the product goes live on a production server.",
    },
  },
];
