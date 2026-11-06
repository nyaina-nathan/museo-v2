import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";
import { Button } from "@/components/ui/Button";
import { isLocale } from "@/libs/i18n/config";
import { getDictionary } from "@/libs/i18n/get-dictionary";
import { localePath } from "@/libs/i18n/paths";

const APPROACH_ICONS = [
  {
    iconClass: "fa-solid fa-box-archive",
    iconHover: "group-hover:animate-icon-bounce-up",
  },
  {
    iconClass: "fa-solid fa-people-group",
    iconHover: "group-hover:animate-icon-rotate",
  },
  {
    iconClass: "fa-solid fa-shirt",
    iconHover: "group-hover:animate-icon-scale",
  },
];

const WORK_NUMBERS = ["01", "02", "03"];

const CONTACT_DETAILS = [
  {
    key: "email",
    href: "mailto:curator@museo.mg",
    iconClass: "fa-solid fa-envelope",
  },
  {
    key: "location",
    href: null,
    iconClass: "fa-solid fa-location-dot",
  },
  {
    key: "hours",
    href: null,
    iconClass: "fa-regular fa-clock",
  },
] as const;

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    title: dict.about.metadata.title,
    description: dict.about.metadata.description,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) return null;

  const dict = getDictionary(locale);
  const about = dict.about;

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto max-w-[600px] text-center">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] opacity-90">
                {about.hero.founded}
              </p>
              <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                {about.hero.title}
              </h1>
              <p className="text-base leading-relaxed opacity-90">
                {about.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto max-w-[720px]">
              <h2 className="mb-8 text-center font-display text-3xl font-bold text-primary md:text-4xl">
                {about.story.title}
              </h2>
              <p className="text-base leading-relaxed text-text-dark">
                {about.story.intro}
                <strong className="font-bold text-primary">
                  {about.story.introStrong}
                </strong>
              </p>
              <p className="mt-6 text-base leading-relaxed text-text-dark">
                {about.story.body}
              </p>
              <blockquote className="my-10 border-l-4 border-primary pl-6 font-display text-xl leading-relaxed text-primary md:text-2xl">
                {about.story.quote}
              </blockquote>
              <p className="text-base leading-relaxed text-text-dark">
                {about.story.closing}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto max-w-[720px] text-center">
              <h2 className="mb-8 font-display text-3xl font-bold md:text-4xl">
                {about.believe.title}
              </h2>
              <h3 className="mb-6 font-display text-xl font-bold md:text-2xl">
                {about.believe.lead}
              </h3>
              <p className="text-base leading-relaxed opacity-90">
                {about.believe.paragraphOne}
              </p>
              <p className="mt-6 text-base leading-relaxed opacity-90">
                {about.believe.paragraphTwo}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
                {about.approach.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-light">
                {about.approach.subtitle}
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {about.approach.pillars.map((pillar, index) => {
                const icon = APPROACH_ICONS[index];

                return (
                  <li
                    key={pillar.title}
                    className="group flex w-full flex-col items-center rounded-lg border border-border bg-white p-8"
                  >
                    <i
                      className={`${icon.iconClass} ${icon.iconHover} p-4 text-5xl`}
                      aria-hidden="true"
                    ></i>
                    <h3 className="font-display text-xl font-bold text-primary">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-center text-base leading-relaxed text-text-light">
                      {pillar.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="bg-primary/5 py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
                {about.work.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-light">
                {about.work.subtitle}
              </p>
            </div>
            <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {about.work.steps.map((step, index) => (
                <li
                  key={WORK_NUMBERS[index]}
                  className="w-full rounded-lg border border-border bg-white p-8"
                >
                  <span className="font-display text-4xl font-bold text-primary">
                    {WORK_NUMBERS[index]}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-light">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[720px] text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {about.mission.title}
              </h2>
              <p className="mt-6 text-base leading-relaxed opacity-90">
                {about.mission.text}
              </p>
            </div>
            <h3 className="mb-8 text-center font-display text-2xl font-bold">
              {about.mission.valuesTitle}
            </h3>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {about.mission.values.map((value) => (
                <li
                  key={value.title}
                  className="w-full rounded-lg bg-white p-8 text-center"
                >
                  <h4 className="font-display text-2xl font-bold text-primary">
                    {value.title}
                  </h4>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-text-light">
                    {value.translation}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-text-light">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
                {about.forward.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-light">
                {about.forward.subtitle}
              </p>
            </div>
            <div className="mx-auto max-w-[720px]">
              <p className="text-center text-base leading-relaxed text-text-dark">
                {about.forward.text}
              </p>
              <ul className="mt-12 space-y-4">
                {about.forward.questions.map((question) => (
                  <li
                    key={question}
                    className="text-center font-display text-lg leading-relaxed text-primary md:text-xl"
                  >
                    {question}
                  </li>
                ))}
              </ul>
              <p className="mt-12 text-center font-display text-2xl font-bold text-primary md:text-3xl">
                {about.forward.closing}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {about.contact.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed opacity-90">
                {about.contact.subtitle}
              </p>
            </div>
            <ul className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 sm:grid-cols-3">
              {CONTACT_DETAILS.map((detail) => (
                <li
                  key={detail.key}
                  className="flex flex-col items-center rounded-lg border border-white/30 p-6 text-center"
                >
                  <i
                    className={`${detail.iconClass} mb-4 text-2xl`}
                    aria-hidden="true"
                  ></i>
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    {about.contact.labels[detail.key]}
                  </h3>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="mt-2 text-sm opacity-90 transition-opacity hover:underline hover:opacity-100"
                    >
                      {about.contact.values[detail.key]}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm opacity-90">
                      {about.contact.values[detail.key]}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Link href={localePath(locale, "/collection")}>
                <Button variant="ghost" className="text-white hover:text-white/80">
                  {about.contact.exploreCta}
                </Button>
              </Link>
              <Link href={localePath(locale, "/faq")}>
                <Button variant="ghost" className="text-white hover:text-white/80">
                  {about.contact.faqCta}
                </Button>
              </Link>
            </div>
            <p className="mt-12 text-center text-xs opacity-75">
              {about.contact.credits}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
