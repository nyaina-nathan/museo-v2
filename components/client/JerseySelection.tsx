"use client";

import { useEffect, useState } from "react";
import { JerseyCard } from "@/components/client/JerseyCard";
import { JerseyCardSkeleton } from "@/components/client/JerseyCardSkeleton";
import { useDictionary, useLocale } from "@/libs/i18n/locale-provider";
import { localePath } from "@/libs/i18n/paths";
import type { Jersey } from "@/types/jersey.types";

export function JerseySelection() {
  const locale = useLocale();
  const dict = useDictionary();
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/jerseys?isPublic=true&limit=10");

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.message ?? dict.home.loadError);
        }

        const result = await response.json();

        if (!cancelled) {
          setJerseys(result.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : dict.collection.somethingWrong
          );
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
  }, [dict]);

  useEffect(() => {
    if (loading) return;

    const timer = window.setTimeout(() => setShowSkeleton(false), 260);
    return () => window.clearTimeout(timer);
  }, [loading]);

  return (
    <section className="bg-white py-20" aria-busy={loading}>
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
            {dict.home.lastDrops}
          </h2>
        </div>

        {error && <p className="text-center text-primary-dark">{error}</p>}

        {!loading && !error && jerseys.length === 0 && (
          <p className="text-center text-text-light">{dict.home.empty}</p>
        )}
      </div>

      {(loading || (!error && jerseys.length > 0)) && (
        <div className="grid grid-cols-1">
          {loading && (
            <span role="status" className="sr-only">
              {dict.home.loading}
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
            <>
              <div className="[grid-area:1/1] min-w-0 overflow-hidden px-5 pb-2 animate-content-in motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none] md:px-10 lg:px-[60px] motion-reduce:[&::-webkit-scrollbar]:hidden">
                <div
                  className={`flex w-max gap-6 pr-6 will-change-transform animate-marquee motion-reduce:animate-none motion-reduce:will-change-auto ${
                    paused
                      ? "[animation-play-state:paused]"
                      : "focus-within:[animation-play-state:paused] hover:[animation-play-state:paused]"
                  }`}
                >
                  <ul className="flex shrink-0 gap-6">
                    {jerseys.map((jersey) => (
                      <JerseyCard
                        key={jersey.id}
                        jersey={jersey}
                        href={localePath(locale, `/collection/${jersey.id}`)}
                        liClassName="w-[280px] shrink-0"
                      />
                    ))}
                  </ul>

                  <ul
                    aria-hidden="true"
                    className="flex shrink-0 gap-6 motion-reduce:hidden"
                  >
                    {jerseys.map((jersey) => (
                      <JerseyCard
                        key={`${jersey.id}-duplicate`}
                        jersey={jersey}
                        href={localePath(locale, `/collection/${jersey.id}`)}
                        liClassName="w-[280px] shrink-0"
                        tabIndex={-1}
                      />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3 flex h-4 justify-end px-5 motion-reduce:hidden md:px-10 lg:px-[60px]">
                {!loading && (
                  <button
                    type="button"
                    onClick={() => setPaused((value) => !value)}
                    aria-pressed={paused}
                    className="text-xs font-medium text-text-light transition-colors hover:text-primary"
                  >
                    {paused ? dict.home.play : dict.home.pause}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}