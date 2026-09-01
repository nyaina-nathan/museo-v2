"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  transparentOnTop?: boolean;
}

export function Header({ transparentOnTop = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = transparentOnTop && !isScrolled;

  return (
    <header
      onClick={() => setIsScrolled(true)}
      className={`sticky top-0 z-40 transition-colors ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-white"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 md:px-10 lg:px-[60px]">
        <Link
          href="/"
          className={`font-display text-2xl font-bold tracking-wide transition-colors ${
            transparent ? "text-white" : "text-primary"
          }`}
        >
          MUSEO
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                transparent
                  ? "text-white hover:text-white/80"
                  : "text-text-dark hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          size="sm"
          variant="secondary"
          className={
            transparent
              ? "border-white bg-transparent text-white hover:bg-white hover:text-primary"
              : undefined
          }
        >
          Explore the archive
        </Button>
      </div>
    </header>
  );
}
