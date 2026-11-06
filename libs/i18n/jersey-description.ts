import type { Locale } from "./config";

export function localizeDescription(
  jersey: {
    en_description: string | null;
    fr_description: string | null;
  },
  locale: Locale
): string | null {
  const primary =
    locale === "fr" ? jersey.fr_description : jersey.en_description;
  const fallback =
    locale === "fr" ? jersey.en_description : jersey.fr_description;

  return primary || fallback || null;
}
