import Link from "next/link";
import { SocialLinks } from "@/components/client/SocialLinks";

const QUICK_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Admin", href: "/admin" },
  { label: "FAQ", href: "/faq" },
  { label: "About Us", href: "/about" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-5 py-12 md:grid-cols-3 md:px-10 lg:px-[60px]">
        <div>
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-wide text-primary"
          >
            MUSEO
          </Link>
          <p className="mt-2 text-sm text-text-light">
            Ex vintage jersey archive
          </p>
          <div className="mt-5 flex items-center gap-4">
            <SocialLinks linkClassName="text-text-light transition-colors hover:text-primary" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-dark">
            Quick Links
          </h3>
          <nav className="mt-4 flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-light transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-dark">
            About
          </h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-light">
            MUSEO curates a collection of authentic vintage jerseys, celebrating
            the stories behind every era of the beautiful game.
          </p>
          <p className="mt-6 text-sm text-text-light">
            © {new Date().getFullYear()} Museo.mg
          </p>
        </div>
      </div>
    </footer>
  );
}
