import Link from "next/link";
import type { Jersey } from "@/types/jersey.types";

interface JerseyCardProps {
  jersey: Jersey;
  href?: string;
  liClassName?: string;
  tabIndex?: number;
}

const priceFormatter = new Intl.NumberFormat("fr-MG");

export function JerseyCard({ jersey, href, liClassName, tabIndex }: JerseyCardProps) {
  const formattedPrice =
    jersey.price !== null ? `Ar ${priceFormatter.format(jersey.price)}` : "P.O.A.";

  const content = (
    <article className="group relative my-2 flex h-full flex-col border-2 border-primary bg-white p-4 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1 hover:shadow-[0_14px_30px_-10px_rgba(120,29,10,0.18)] active:scale-[0.98] active:duration-100 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100">
      <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden bg-primary/[0.04] ring-1 ring-inset ring-primary/15">
        {jersey.primary_image_url ? (
          <img
            src={jersey.primary_image_url}
            alt={jersey.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 select-none">
            <span className="font-display text-5xl font-bold tracking-tighter text-primary/25 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transition-none">
              {jersey.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-primary/40">
              Archive Piece
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-1 font-display text-lg font-bold leading-[1.2] tracking-[-0.02em] text-text-dark transition-colors duration-200 group-hover:text-primary">
          {jersey.name}
        </h3>

        {jersey.description ? (
          <p className="mt-1.5 mb-4 line-clamp-2 text-xs leading-[1.5] text-text-light">
            {jersey.description}
          </p>
        ) : (
          <p className="mt-1.5 mb-4 text-xs italic leading-[1.5] text-text-light/60">
            Curated archive piece
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-3.5">
          <p className="text-sm font-semibold tabular-nums tracking-[-0.01em] text-primary">
            {formattedPrice}
          </p>

          {href && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary/75 transition-colors duration-200 group-hover:text-primary">
              <span>Explore</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              >
                →
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (href) {
    return (
      <li className={`h-full ${liClassName ?? ""}`}>
        <Link
          href={href}
          tabIndex={tabIndex}
          className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {content}
        </Link>
      </li>
    );
  }

  return <li className={`h-full ${liClassName ?? ""}`}>{content}</li>;
}