import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/libs/i18n/config";
import { getDictionary } from "@/libs/i18n/get-dictionary";
import { localePath } from "@/libs/i18n/paths";

const HERO_IMAGES = ["/hero1.jpeg", "/hero2.jpeg", "/hero3.jpeg"];

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const dict = getDictionary(locale);

  return (
    <section className="relative -mt-[65px] z-0 bg-primary text-white">
      <div className="grid h-[72vh] min-h-[560px] w-full grid-cols-3 gap-0 md:h-[64vh] md:min-h-0 md:gap-1">
        {HERO_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`relative overflow-hidden ${
              index === 1 ? "col-span-full md:col-span-1" : "hidden md:block"
            }`}
          >
            <Image
              src={src}
              alt={dict.hero.imageAlts[index] ?? ""}
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
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">
            {dict.hero.title}
          </h1>

          <div className="mt-8">
            <Link href={localePath(locale, "/collection")}>
              <Button
                variant="secondary"
                className="border-white bg-transparent text-white hover:bg-primary hover:text-white cursor-pointer"
              >
                {dict.hero.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
