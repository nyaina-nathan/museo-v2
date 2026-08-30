"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Jersey } from "@/types/jersey.types";

export function JerseySelection() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/jerseys?isPublic=true&limit=8");

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.message ?? "Failed to load the archive");
        }

        const result = await response.json();

        if (!cancelled) {
          setJerseys(result.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
        <div className="mx-auto mb-12 max-w-[600px] text-center">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
            The Collection
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-light">
            A selection of pieces from the archive, each with its own place in
            footballing history.
          </p>
        </div>

        {loading && <p className="text-center text-text-light">Loading...</p>}

        {error && <p className="text-center text-primary-dark">{error}</p>}

        {!loading && !error && jerseys.length === 0 && (
          <p className="text-center text-text-light">
            Begin your archive. Explore our current pieces.
          </p>
        )}

        {!loading && !error && jerseys.length > 0 && (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {jerseys.map((jersey) => (
              <li key={jersey.id} className="stamp-border my-2 bg-white p-3">
                <div className="mb-3 flex aspect-square w-full items-center justify-center rounded bg-primary/5">
                  <span className="font-display text-5xl font-bold text-primary/20">
                    {jersey.name.charAt(0)}
                  </span>
                </div>

                <h3 className="truncate font-medium text-text-dark">
                  {jersey.name}
                </h3>

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
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && jerseys.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="secondary">View the full archive</Button>
          </div>
        )}
      </div>
    </section>
  );
}