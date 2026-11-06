import type { Locale } from "@/libs/i18n/config";
import { getDictionary } from "@/libs/i18n/get-dictionary";

type IconProps = { className?: string };

function TrustSealIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="20" r="12.5" fill="currentColor" fillOpacity="0.07" />
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="24" cy="20" r="12.5" />
        <path d="M18.4 20.2l3.9 3.9 7.9-8.1" strokeWidth="1.8" />
        <path d="M19.6 31.2L17.2 40l4.4-2.4 2.2 2.7 1.1-7.5" />
        <path d="M28.4 31.2L30.8 40l-4.4-2.4-2.2 2.7-1.1-7.5" />
      </g>
    </svg>
  );
}

function JerseyArchiveIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15.5 19L10.5 24.5L15 28.5L18 25.5V40H30V25.5L33 28.5L37.5 24.5L32.5 19C30.5 21.4 27.5 22 24 22S17.5 21.4 15.5 19Z"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 8c0-1.7 2.6-1.7 2.6 0 0 1.1-1.3 1.3-2.6 2.2" />
        <path d="M24 10.2L12 18.4M24 10.2l12 8.2" strokeWidth="1.4" />
        <path d="M15.5 19L10.5 24.5L15 28.5L18 25.5V40H30V25.5L33 28.5L37.5 24.5L32.5 19C30.5 21.4 27.5 22 24 22S17.5 21.4 15.5 19Z" />
        <path d="M21 37.2h6" strokeWidth="1.4" strokeDasharray="2 2.4" />
      </g>
    </svg>
  );
}

function SupporterHeartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 39.5C18.5 35 10 28.5 10 20.7 10 15.6 14 12 18.4 12c2.4 0 4.5 1.2 5.6 3 1.1-1.8 3.2-3 5.6-3C34 12 38 15.6 38 20.7c0 7.8-8.5 14.3-14 18.8Z"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 39.5C18.5 35 10 28.5 10 20.7 10 15.6 14 12 18.4 12c2.4 0 4.5 1.2 5.6 3 1.1-1.8 3.2-3 5.6-3C34 12 38 15.6 38 20.7c0 7.8-8.5 14.3-14 18.8Z" />
        <path
          d="M24 18.5l4.75 3.5-1.85 5.5h-5.8l-1.85-5.5L24 18.5Z"
          strokeWidth="1.4"
        />
      </g>
    </svg>
  );
}

const PILLAR_ICONS = [
  TrustSealIcon,
  JerseyArchiveIcon,
  SupporterHeartIcon,
];

interface WhyUsProps {
  locale: Locale;
}

export function WhyUs({ locale }: WhyUsProps) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-white md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary-light)_0%,transparent_70%)] opacity-45"
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
        <div className="mx-auto mb-14 max-w-[600px] text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
            {dict.whyUs.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
            {dict.whyUs.title}
          </h2>
          <div
            className="mt-5 flex items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px w-10 bg-white/25" />
            <span className="h-1.5 w-1.5 rotate-45 border border-white/50" />
            <span className="h-px w-10 bg-white/25" />
          </div>
          <p className="mt-5 text-base leading-relaxed text-white/80">
            {dict.whyUs.subtitle}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {dict.whyUs.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index];

            return (
            <li
              key={pillar.title}
              className="group relative flex w-full flex-col items-center overflow-hidden rounded-2xl border border-white/15 bg-white px-7 pb-9 pt-12 text-center shadow-[0_16px_36px_-12px_rgba(42,10,4,0.38)] transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-white/40 hover:shadow-[0_28px_56px_-20px_rgba(20,4,1,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-2.5 rounded-xl border border-primary/10 transition-colors duration-500 group-hover:border-primary/20"
              />
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 font-display text-[11px] font-semibold tracking-[0.28em] text-primary/35"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="absolute right-5 top-6 h-1 w-1 rounded-full bg-primary/30 transition-colors duration-500 group-hover:bg-primary/60"
              />

              <span className="relative mb-6 grid h-[76px] w-[76px] place-items-center rounded-full bg-primary/[0.05] ring-1 ring-primary/15">
                <span
                  aria-hidden="true"
                  className="absolute -inset-[7px] rounded-full border border-dashed border-primary/25 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
                />
                <Icon className="relative h-9 w-9 text-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100" />
              </span>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/70">
                {pillar.eyebrow}
              </p>
              <h3 className="mt-2.5 font-display text-xl font-bold tracking-[-0.01em] text-primary">
                {pillar.title}
              </h3>
              <span
                aria-hidden="true"
                className="mt-4 h-px w-8 bg-primary/25 transition-[width,background-color] duration-500 ease-out group-hover:w-14 group-hover:bg-primary/50 motion-reduce:transition-none"
              />
              <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-text-light">
                {pillar.description}
              </p>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
