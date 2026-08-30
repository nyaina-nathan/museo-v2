import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 py-24 text-center md:px-10 md:py-32 lg:px-[60px]">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
          The ex vintage jersey archive
        </p>

        <h1 className="max-w-3xl font-display text-5xl font-bold leading-tight md:text-6xl">
          Every jersey carries a story worth preserving.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          A curated collection of iconic pieces, each one a testament to
          heritage and craftsmanship. Explore the archive and uncover the
          stories woven into every thread.
        </p>

        <div className="mt-10">
          <Button
            variant="secondary"
            className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
          >
            View the archive
          </Button>
        </div>
      </div>
    </section>
  );
}