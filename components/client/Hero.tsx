import Image from "next/image";
import { Button } from "@/components/ui/Button";

const HERO_IMAGES = [
  { src: "/hero1.jpeg", alt: "Ex vintage jersey on display" },
  { src: "/hero2.jpeg", alt: "Ex vintage jersey, center piece" },
  { src: "/hero3.jpeg", alt: "Ex vintage jersey detail" },
];

export function Hero() {
  return (
    <section className="relative bg-primary text-white">
      <div className="grid h-[72vh] min-h-[560px] w-full grid-cols-3 gap-0 md:h-[64vh] md:min-h-0 md:gap-1">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`relative overflow-hidden ${
              index === 1 ? "col-span-full md:col-span-1" : "hidden md:block"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center md:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
            The ex vintage jersey archive
          </p>

          <h1 className="font-display text-5xl font-bold leading-tight md:text-6xl">
            Every jersey carries a story worth preserving.
          </h1>

          <p className="mt-6 text-base leading-relaxed text-white/80 md:text-lg">
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
      </div>
    </section>
  );
}
