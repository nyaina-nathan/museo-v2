"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";
import { JerseyCard } from "@/components/client/JerseyCard";
import {
  JerseyFilters,
  type JerseyFiltersValue,
  type PriceBounds,
} from "@/components/client/JerseyFilters";
import { Button } from "@/components/ui/Button";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { Jersey } from "@/types/jersey.types";

const PAGE_SIZE = 10;

export default function CollectionPage() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [total, setTotal] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bounds, setBounds] = useState<PriceBounds | null>(null);

  const [name, setName] = useState("");
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState<
    JerseyFiltersValue["orderBy"]
  >("createdAt");
  const [order, setOrder] = useState<JerseyFiltersValue["order"]>("desc");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debouncedName = useDebouncedValue(name, 300);
  const debouncedPriceMin = useDebouncedValue(priceMin, 300);
  const debouncedPriceMax = useDebouncedValue(priceMax, 300);

  const requestIdRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/jerseys/price-range");

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.message ?? "Failed to load the price range");
        }

        const result = await response.json();

        if (!cancelled && result.min !== null && result.max !== null) {
          setBounds({ min: result.min, max: result.max });
        }
      } catch {
        // Price filtering stays hidden when the range cannot be resolved.
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    const params = new URLSearchParams({
      isPublic: "true",
      limit: String(PAGE_SIZE),
      page: String(page),
    });

    if (debouncedName.trim()) {
      params.set("name", debouncedName.trim());
    }
    if (debouncedPriceMin !== null) {
      params.set("priceMin", String(debouncedPriceMin));
    }
    if (debouncedPriceMax !== null) {
      params.set("priceMax", String(debouncedPriceMax));
    }
    params.set("orderBy", orderBy);
    params.set("order", order);

    if (requestId === 1) {
      setInitialLoading(true);
    } else {
      setRefreshing(true);
    }

    async function load() {
      try {
        const response = await fetch(`/api/jerseys?${params.toString()}`);

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.message ?? "Failed to load the collection");
        }

        const result = await response.json();

        if (requestIdRef.current !== requestId) return;

        setJerseys(result.data);
        setTotal(result.total);
        setError(null);
      } catch (err) {
        if (requestIdRef.current !== requestId) return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (requestIdRef.current === requestId) {
          setInitialLoading(false);
          setRefreshing(false);
        }
      }
    }

    load();
  }, [debouncedName, debouncedPriceMin, debouncedPriceMax, orderBy, order, page]);

  const trimmedName = name.trim();
  const hasPriceFilter = priceMin !== null || priceMax !== null;
  const hasSort = orderBy !== "createdAt" || order !== "desc";
  const activeFilterCount = (trimmedName ? 1 : 0) + (hasPriceFilter ? 1 : 0) + (hasSort ? 1 : 0);
  const filterValue: JerseyFiltersValue = {
    name,
    priceMin,
    priceMax,
    orderBy,
    order,
  };
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  function handlePriceChange(min: number, max: number) {
    setPriceMin(min);
    setPriceMax(max);
    setPage(1);
  }

  function handleNameChange(value: string) {
    setName(value);
    setPage(1);
  }

  function handleOrderByChange(value: JerseyFiltersValue["orderBy"]) {
    setOrderBy(value);
    setPage(1);
  }

  function handleOrderChange(value: JerseyFiltersValue["order"]) {
    setOrder(value);
    setPage(1);
  }

  function resetFilters() {
    setName("");
    setPriceMin(null);
    setPriceMax(null);
    setOrderBy("createdAt");
    setOrder("desc");
    setPage(1);
  }

  const showEmptyState = !initialLoading && !error && jerseys.length === 0;

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:max-w-none lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
                The Collection
              </h1>
              <p className="mt-3 text-base leading-relaxed text-text-light">
                Every piece in the archive, ready to be discovered.
              </p>
            </div>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
              <aside className="hidden lg:block lg:w-72 lg:shrink-0">
                <div className="rounded-lg border border-border bg-white p-6 lg:sticky lg:top-24">
                  <JerseyFilters
                    bounds={bounds}
                    value={filterValue}
                    onNameChange={handleNameChange}
                    onPriceChange={handlePriceChange}
                    onOrderByChange={handleOrderByChange}
                    onOrderChange={handleOrderChange}
                    onReset={resetFilters}
                  />
                </div>
              </aside>

              <div className="min-w-0 flex-1">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="text-sm text-text-light" aria-live="polite">
                    {!initialLoading && !error
                      ? `${total} ${total === 1 ? "piece" : "pieces"}`
                      : "\u00A0"}
                  </p>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="lg:hidden"
                      onClick={resetFilters}
                    >
                      Clear filters ({activeFilterCount})
                    </Button>
                  )}
                </div>

                <div className="mb-8 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen((open) => !open)}
                    className="flex w-full items-center justify-between gap-4 rounded-lg border border-border bg-white px-6 py-4"
                  >
                    <span className="font-display text-base font-bold text-primary">
                      Filters
                      {activeFilterCount > 0 && (
                        <span className="ml-2 rounded bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                          {activeFilterCount}
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-lg leading-none text-text-light transition-transform ${
                        filtersOpen ? "rotate-180" : ""
                      }`}
                    >
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                  </button>

                  {filtersOpen && (
                    <div className="mt-2 rounded-lg border border-border bg-white p-6">
                      <JerseyFilters
                        bounds={bounds}
                        value={filterValue}
                        onNameChange={handleNameChange}
                        onPriceChange={handlePriceChange}
                        onOrderByChange={handleOrderByChange}
                        onOrderChange={handleOrderChange}
                        onReset={resetFilters}
                      />
                    </div>
                  )}
                </div>

                {initialLoading && (
                  <p className="text-center text-text-light">Loading...</p>
                )}

                {error && (
                  <p className="text-center text-primary-dark">{error}</p>
                )}

                {showEmptyState &&
                  (activeFilterCount > 0 ? (
                    <div className="py-10 text-center">
                      <p className="text-text-light">
                        No pieces match your filters.
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mt-4"
                        onClick={resetFilters}
                      >
                        Clear filters
                      </Button>
                    </div>
                  ) : (
                    <p className="text-center text-text-light">
                      Begin your archive. Explore our current pieces.
                    </p>
                  ))}

                {!initialLoading && !error && jerseys.length > 0 && (
                  <div
                    className={`transition-opacity ${
                      refreshing ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    <ul className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                      {jerseys.map((jersey) => (
                        <JerseyCard
                          key={jersey.id}
                          jersey={jersey}
                          href={`/collection/${jersey.id}`}
                        />
                      ))}
                    </ul>

                    {refreshing && (
                      <p className="mt-6 text-center text-sm text-text-light">
                        Refreshing…
                      </p>
                    )}
                  </div>
                )}

                {!initialLoading && !error && jerseys.length > 0 && (
                  <nav
                    aria-label="Pagination"
                    className="mt-12 flex items-center justify-center gap-4"
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={!canPrev}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Previous
                    </Button>
                    <p className="text-sm text-text-light">
                      Page {page} of {totalPages}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={!canNext}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </nav>
                )}

                {!initialLoading && !error && jerseys.length > 0 && (
                  <div className="mt-12 text-center">
                    <Link href="/">
                      <Button variant="secondary">Back to home</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
