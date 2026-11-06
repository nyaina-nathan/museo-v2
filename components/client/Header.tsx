"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/libs/i18n/config";
import { useDictionary, useLocale } from "@/libs/i18n/locale-provider";
import { localePath } from "@/libs/i18n/paths";

const NAV_LINKS = [
  { key: "collection", path: "/collection" },
  { key: "home", path: "/home" },
] as const;

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface HeaderProps {
  transparentOnTop?: boolean;
}

export function Header({ transparentOnTop = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = useLocale();
  const dict = useDictionary();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = transparentOnTop && !isScrolled;

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;

    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;

    const rest = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");
    const nextPath = `/${nextLocale}${rest || "/home"}`;
    const suffix = `${window.location.search}${window.location.hash}`;

    router.push(`${nextPath}${suffix}`);
  }

  return (
    <header
      onClick={() => setIsScrolled(true)}
      className={`sticky top-0 z-40 transition-colors ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-white"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-10 lg:px-15">
        <Link
          href={localePath(locale, "/home")}
          className={`font-display text-2xl font-bold tracking-wide transition-colors ${
            transparent ? "text-white" : "text-primary"
          }`}
        >
          MUSEO
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={localePath(locale, link.path)}
              className={`text-sm font-medium transition-colors ${
                transparent
                  ? "text-white hover:text-white/80"
                  : "text-text-dark hover:text-primary"
              }`}
            >
              {dict.header[link.key]}
            </Link>
          ))}
        </nav>

        <div
          className={`flex items-center gap-1 text-sm font-medium transition-colors ${
            transparent ? "text-white" : "text-text-dark"
          }`}
        >
          <button
            type="button"
            onClick={() => switchLocale("fr")}
            aria-label={dict.header.switchToFrench}
            aria-pressed={locale === "fr"}
            className={`cursor-pointer transition-opacity ${
              locale === "fr"
                ? "underline underline-offset-4"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {dict.header.french}
          </button>
          <span aria-hidden="true" className="opacity-40">
            /
          </span>
          <button
            type="button"
            onClick={() => switchLocale("en")}
            aria-label={dict.header.switchToEnglish}
            aria-pressed={locale === "en"}
            className={`cursor-pointer transition-opacity ${
              locale === "en"
                ? "underline underline-offset-4"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {dict.header.english}
          </button>
        </div>
      </div>
    </header>
  );
}
