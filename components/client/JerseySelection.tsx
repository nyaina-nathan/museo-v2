"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { JerseyCard } from "@/components/client/JerseyCard";
import { Button } from "@/components/ui/Button";
import type { Jersey } from "@/types/jersey.types";

export function JerseySelection() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLUListElement>(null);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  function scrollBy(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/jerseys?isPublic=true&limit=10");

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

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [jerseys]);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
            Our last drops
          </h2>
          <Link href="/collection">
            <Button variant="secondary" size="sm">
              View collection
            </Button>
          </Link>
        </div>

        {loading && <p className="text-center text-text-light">Loading...</p>}

        {error && <p className="text-center text-primary-dark">{error}</p>}

        {!loading && !error && jerseys.length === 0 && (
          <p className="text-center text-text-light">
            Begin your archive. Explore our current pieces.
          </p>
        )}
      </div>

      {!loading && !error && jerseys.length > 0 && (
        <div className="relative">
          <button
            type="button"
            aria-label="Scroll left"
            disabled={!canScrollLeft}
            onClick={() => scrollBy("left")}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 border-primary bg-white p-3 text-primary shadow-md transition-colors hover:bg-primary hover:text-white disabled:opacity-50"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            disabled={!canScrollRight}
            onClick={() => scrollBy("right")}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 border-primary bg-white p-3 text-primary shadow-md transition-colors hover:bg-primary hover:text-white disabled:opacity-50"
          >
            &rarr;
          </button>

          <ul
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex snap-x gap-6 overflow-x-auto px-5 pb-2 scroll-smooth [scrollbar-width:none] md:px-10 lg:px-[60px] [&::-webkit-scrollbar]:hidden"
          >
            {jerseys.map((jersey) => (
              <JerseyCard
                key={jersey.id}
                jersey={jersey}
                href={`/collection/${jersey.id}`}
                liClassName="w-[280px] shrink-0"
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}