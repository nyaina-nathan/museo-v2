import { notFound } from "next/navigation";
import { getDictionary } from "@/libs/i18n/get-dictionary";
import { isLocale, locales } from "@/libs/i18n/config";
import { LocaleProvider } from "@/libs/i18n/locale-provider";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <LocaleProvider locale={locale} dictionary={getDictionary(locale)}>
      <div lang={locale} className="contents">
        {children}
      </div>
    </LocaleProvider>
  );
}
