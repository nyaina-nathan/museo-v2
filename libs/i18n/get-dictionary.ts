import { en, type Dictionary } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import { defaultLocale, type Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
