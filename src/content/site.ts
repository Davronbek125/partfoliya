export const site = {
  name: "Davronbek O'rishboev",
  /**
   * Quyidagi ma'lumotlarni o'zingiznikiga almashtiring.
   * Butun sayt shu fayldan oziqlanadi.
   *
   * TODO: email, ijtimoiy tarmoq havolalari va domenni real qiymatlar bilan yangilang.
   */
  email: "hello@davronbek.dev",
  location: {
    uz: "Toshkent, O'zbekiston",
    en: "Tashkent, Uzbekistan",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "Telegram", href: "https://t.me/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  url: "https://davronbek.dev",
  copyrightYear: 2026,
} as const;

export const skills = [
  { name: "Python", color: "#3776AB" },
  { name: "FastAPI", color: "#009688" },
  { name: "Aiogram 3.x", color: "#2AABEE" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "SQLite", color: "#003B57" },
  { name: "Autonomous Agents", color: "#7B5CFF" },
  { name: "MCP", color: "#FF5A3C" },
  { name: "Prompt Engineering", color: "#FF7AC3" },
  { name: "LLM Routing", color: "#C6F24E" },
  { name: "HTML5 / CSS3", color: "#E34F26" },
  { name: "Git", color: "#F05033" },
  { name: "Linux VPS", color: "#14101C" },
];
