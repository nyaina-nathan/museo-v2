"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";

interface LocaleContextValue {
  locale: Locale;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  dictionary: en,
});

interface LocaleProviderProps {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useDictionary(): Dictionary {
  return useContext(LocaleContext).dictionary;
}
