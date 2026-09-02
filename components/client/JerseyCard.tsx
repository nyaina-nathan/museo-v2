import Link from "next/link";
import type { Jersey } from "@/types/jersey.types";

interface JerseyCardProps {
  jersey: Jersey;
  href?: string;
  liClassName?: string;
}

export function JerseyCard({ jersey, href, liClassName }: JerseyCardProps) {
  const content = (
    <div className="my-2 h-full  border-2 border-primary bg-white p-3">
      <div className="mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded bg-primary/5">
        {jersey.primary_image_url ? (
          <img
            src={jersey.primary_image_url}
            alt={jersey.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display text-5xl font-bold text-primary/20">
            {jersey.name.charAt(0)}
          </span>
        )}
      </div>

      <h3 className="font-medium text-text-dark">{jersey.name}</h3>

      <p className="mt-1 text-sm font-medium text-primary">
        {jersey.price !== null ? `Ar ${jersey.price}` : "P.O.A."}
      </p>
    </div>
  );

  if (href) {
    return (
      <li className={`h-full ${liClassName ?? ""}`}>
        <Link href={href} className="block h-full">
          {content}
        </Link>
      </li>
    );
  }

  return <li className={`h-full ${liClassName ?? ""}`}>{content}</li>;
}