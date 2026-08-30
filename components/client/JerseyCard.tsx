import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Jersey } from "@/types/jersey.types";

interface JerseyCardProps {
  jersey: Jersey;
  href?: string;
}

export function JerseyCard({ jersey, href }: JerseyCardProps) {
  const content = (
    <div className="stamp-border my-2 h-full bg-white p-3">
      <div className="mb-3 flex aspect-square w-full items-center justify-center rounded bg-primary/5">
        <span className="font-display text-5xl font-bold text-primary/20">
          {jersey.name.charAt(0)}
        </span>
      </div>

      <h3 className="truncate font-medium text-text-dark">{jersey.name}</h3>

      <p className="mt-1 line-clamp-2 text-sm text-text-light">
        {jersey.description ?? "Awaiting its story."}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-primary">
          {jersey.price !== null ? `$${jersey.price}` : "P.O.A."}
        </span>
        <Button size="sm" variant="secondary">
          Explore
        </Button>
      </div>
    </div>
  );

  if (href) {
    return (
      <li className="h-full">
        <Link href={href} className="block h-full">
          {content}
        </Link>
      </li>
    );
  }

  return <li className="h-full">{content}</li>;
}