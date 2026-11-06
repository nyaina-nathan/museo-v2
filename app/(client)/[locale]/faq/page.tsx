import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";
import { FAQAccordion } from "@/components/client/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { isLocale } from "@/libs/i18n/config";
import { getDictionary } from "@/libs/i18n/get-dictionary";
import { localePath } from "@/libs/i18n/paths";

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    title: dict.faq.metadata.title,
    description: dict.faq.metadata.description,
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) return null;

  const dict = getDictionary(locale);
  const faq = dict.faq;
  const sections = [
    faq.sections.aboutPieces,
    faq.sections.ordering,
    faq.sections.payment,
    faq.sections.guarantees,
    faq.sections.aboutMuseo,
  ];

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-10 lg:px-15">
            <div className="mx-auto max-w-150 text-center">
              <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                {faq.heroTitle}
              </h1>
              <p className="text-base leading-relaxed opacity-90">
                {faq.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.title} className="bg-white py-20">
            <div className="mx-auto w-full max-w-7xl px-5 md:px-10 lg:px-15">
              <FAQAccordion items={section.items} sectionTitle={section.title} />
            </div>
          </section>
        ))}

        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-10 lg:px-15">
            <div className="mx-auto max-w-150 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                {faq.contact.title}
              </h2>
              <p className="mb-8 text-base leading-relaxed opacity-90">
                {faq.contact.text}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                <Link href={localePath(locale, "/contact")}>
                  <Button
                    className="text-white hover:text-white/80"
                    variant="ghost"
                  >
                    {faq.contact.cta}
                  </Button>
                </Link>
                <Link href={localePath(locale, "/collection")}>
                  <Button variant="ghost" className="text-white hover:text-white/80">
                    {faq.contact.exploreCta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
