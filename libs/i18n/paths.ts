import type { Locale } from "./config";

/**
 * Prefixes an internal path with the active locale.
 * `localePath("fr", "/collection")` -> `/fr/collection`
 */
export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
