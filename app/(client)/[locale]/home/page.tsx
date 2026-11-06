import type { Metadata } from "next";
import { TopBanner } from "@/components/client/TopBanner";
import { Header } from "@/components/client/Header";
import { Hero } from "@/components/client/Hero";
import { JerseySelection } from "@/components/client/JerseySelection";
import { WhyUs } from "@/components/client/WhyUs";
import { Footer } from "@/components/client/Footer";
import { isLocale } from "@/libs/i18n/config";
import { getDictionary } from "@/libs/i18n/get-dictionary";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    title: dict.home.metadata.title,
    description: dict.home.metadata.description,
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) return null;

  return (
    <div className="flex min-h-full flex-col">
      <TopBanner />
      <Header transparentOnTop />
      <main className="flex-1">
        <Hero locale={locale} />
        <JerseySelection />
        <WhyUs locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
