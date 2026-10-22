import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mesh relative grid min-h-[75vh] place-items-center overflow-hidden pb-20 pt-32">
      <div className="shell text-center">
        <p className="font-display text-[7rem] font-bold leading-none text-coral">
          404
        </p>
        <h1 className="display-md mt-4">
          Sahifa topilmadi · Page not found
        </h1>
        <p className="prose-muted mx-auto mt-3 max-w-md text-sm sm:text-base">
          Kechirasiz, siz izlagan sahifa mavjud emas yoki ko&apos;chirilgan.
          <br />
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/uz"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
          >
            Bosh sahifa
          </Link>
          <Link
            href="/en"
            className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
