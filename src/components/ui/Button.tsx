import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "outline";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-cream hover:bg-ink/90 shadow-card hover:-translate-y-0.5",
  accent:
    "bg-coral text-white hover:bg-coral/90 shadow-card hover:-translate-y-0.5",
  outline:
    "border border-ink/15 bg-cream/40 text-ink hover:border-ink/40 hover:bg-cream",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    >
      →
    </span>
  );
}
