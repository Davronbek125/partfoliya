type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mesh relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
      <div
        aria-hidden
        className="grain-overlay pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-16 size-72 rounded-full bg-violet/15 blur-3xl"
      />
      <div className="shell relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-4 max-w-3xl">{title}</h1>
        {description ? (
          <p className="prose-muted mt-5 max-w-2xl text-base sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
