import { skillMarquee } from "@/content/skills";

export function SkillsMarquee() {
  const items = [...skillMarquee, ...skillMarquee];

  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-ink py-5 text-cream">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="font-display text-lg font-medium tracking-tight text-cream/85">
              {item}
            </span>
            <span aria-hidden className="text-coral">
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
