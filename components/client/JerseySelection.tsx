"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { JerseyCard } from "@/components/client/JerseyCard";
import { JerseyCardSkeleton } from "@/components/client/JerseyCardSkeleton";
import { Button } from "@/components/ui/Button";
import type { Jersey } from "@/types/jersey.types";

export function JerseySelection() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
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
    if (loading) return;

    const timer = window.setTimeout(() => setShowSkeleton(false), 260);
    return () => window.clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [jerseys]);

  return (
    <section className="bg-white py-20" aria-busy={loading}>
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

        {error && <p className="text-center text-primary-dark">{error}</p>}

        {!loading && !error && jerseys.length === 0 && (
          <p className="text-center text-text-light">
            Begin your archive. Explore our current pieces.
          </p>
        )}
      </div>

      {(loading || (!error && jerseys.length > 0)) && (
        <div className="grid grid-cols-1">
          {loading && (
            <span role="status" className="sr-only">
              Loading our last drops…
            </span>
          )}

          <ul
            aria-hidden="true"
            className={`[grid-area:1/1] flex min-w-0 gap-6 overflow-x-hidden px-5 pb-2 transition-opacity duration-200 ease-out motion-reduce:transition-none md:px-10 lg:px-[60px] ${
              loading ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {showSkeleton &&
              Array.from({ length: 10 }, (_, index) => (
                <JerseyCardSkeleton key={index} liClassName="w-[280px] shrink-0" />
              ))}
          </ul>

          {!loading && !error && jerseys.length > 0 && (
            <ul
              ref={scrollRef}
              onScroll={updateScrollState}
              className="[grid-area:1/1] flex min-w-0 snap-x gap-6 overflow-x-auto px-5 pb-2 scroll-smooth [scrollbar-width:none] animate-rail-in motion-reduce:animate-none md:px-10 lg:px-[60px] [&::-webkit-scrollbar]:hidden"
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
          )}
        </div>
      )}
    </section>
  );
}