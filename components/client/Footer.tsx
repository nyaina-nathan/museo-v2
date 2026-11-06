"use client";

import Link from "next/link";
import { SocialLinks } from "@/components/client/SocialLinks";
import { formatMessage } from "@/libs/i18n/format";
import { useDictionary, useLocale } from "@/libs/i18n/locale-provider";
import { localePath } from "@/libs/i18n/paths";

const QUICK_LINKS = [
  { key: "admin", path: "/login", localized: false },
  { key: "faq", path: "/faq", localized: true },
  { key: "aboutUs", path: "/about", localized: true },
] as const;

export function Footer() {
  const locale = useLocale();
  const dict = useDictionary();

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 py-12 md:grid-cols-3 md:px-10 lg:px-15">
        <div>
          <Link
            href={localePath(locale, "/home")}
            className="font-display text-2xl font-bold tracking-wide text-primary"
          >
            MUSEO
          </Link>
          <p className="mt-2 text-sm text-text-light">{dict.footer.tagline}</p>
          <div className="mt-5 flex items-center gap-4">
            <SocialLinks linkClassName="text-text-light transition-colors hover:text-primary" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-dark">
            {dict.footer.quickLinks}
          </h3>
          <nav className="mt-4 flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.path}
                href={
                  link.localized
                    ? localePath(locale, link.path)
                    : link.path
                }
                className="text-sm text-text-light transition-colors hover:text-primary"
              >
                {dict.footer[link.key]}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-dark">
            {dict.footer.aboutHeading}
          </h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-light">
            {dict.footer.description}
          </p>
          <p className="mt-6 text-sm text-text-light">
            {formatMessage(dict.footer.copyright, {
              year: new Date().getFullYear(),
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
