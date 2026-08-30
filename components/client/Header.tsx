import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 md:px-10 lg:px-[60px]">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-wide text-primary"
        >
          MUSEO
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-dark transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button size="sm">Explore the archive</Button>
      </div>
    </header>
  );
}