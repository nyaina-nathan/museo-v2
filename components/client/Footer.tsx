import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-6 px-5 py-12 md:px-10 md:flex-row md:justify-between lg:px-[60px]">
        <div className="text-center md:text-left">
          <span className="font-display text-xl font-bold tracking-wide text-primary">
            MUSEO
          </span>
          <p className="mt-1 text-sm text-text-light">
            Ex vintage jersey archive
          </p>
        </div>

        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-light transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm text-text-light">
          © {new Date().getFullYear()} Museo.mg
        </p>
      </div>
    </footer>
  );
}