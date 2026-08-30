"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Jersey } from "@/types/jersey.types";

interface FilterState {
  search: string;
  priceMin: string;
  priceMax: string;
  isPublicFilter: "" | "true" | "false";
}

function buildQueryString(
  filters: FilterState,
  page: number,
  limit: number
): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("name", filters.search);
  }

  if (filters.priceMin !== "") {
    params.set("priceMin", filters.priceMin);
  }

  if (filters.priceMax !== "") {
    params.set("priceMax", filters.priceMax);
  }

  if (filters.isPublicFilter !== "") {
    params.set("isPublic", filters.isPublicFilter);
  }

  params.set("page", String(page));
  params.set("limit", String(limit));

  return params.toString();
}

const DEFAULT_FILTERS: FilterState = {
  search: "",
  priceMin: "",
  priceMax: "",
  isPublicFilter: "",
};

const inputStyles = "rounded border border-border px-3 py-2 focus:border-primary";

export default function AdminPage() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [queryString, setQueryString] = useState("page=1&limit=20");
  const [reloadKey, setReloadKey] = useState(0);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(`/api/jerseys?${queryString}`);

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.message ?? "Failed to load jerseys");
        }

        const result = await response.json();

        if (!cancelled) {
          setJerseys(result.data);
          setTotal(result.total);
          setError(null);
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
  }, [queryString, reloadKey]);

  function applyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPage(1);
    setQueryString(buildQueryString(filters, 1, limit));
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    setQueryString(buildQueryString(filters, nextPage, limit));
  }

  function handleLimitChange(nextLimit: number) {
    setLimit(nextLimit);
    setPage(1);
    setQueryString(buildQueryString(filters, 1, nextLimit));
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setSaveError(null);

    try {
      const response = await fetch("/api/jerseys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description: description === "" ? null : description,
          price: price === "" ? null : Number(price),
          is_public: isPublic,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to create jersey");
      }

      setName("");
      setDescription("");
      setPrice("");
      setIsPublic(true);
      setShowCreate(false);
      setReloadKey((key) => key + 1);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="mx-auto w-full p-6">
      <header className="mb-10 flex items-end justify-between border-b border-border pb-4">
        <div>
          <Link
            href="/admin"
            className="font-display text-3xl font-bold tracking-wide text-primary"
          >
            MUSEO
          </Link>
          <p className="mt-1 text-sm text-text-light">Administration</p>
        </div>

        {!showCreate && (
          <Button size="sm" onClick={() => setShowCreate(true)}>
            Create a piece
          </Button>
        )}
      </header>

      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="mb-10 flex flex-col gap-3 rounded-lg border border-border bg-white p-6"
        >
          <h2 className="font-display text-xl font-bold text-primary">
            Record a new piece
          </h2>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputStyles}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputStyles}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Price</span>
            <input
              type="number"
              min={1}
              step={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputStyles}
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="accent-primary"
            />
            Public
          </label>

          {saveError && <p className="text-sm text-primary-dark">{saveError}</p>}

          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Recording..." : "Record piece"}
            </Button>

            <Button variant="secondary" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <form
        onSubmit={applyFilters}
        className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border bg-white p-4 lg:flex-nowrap"
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className={inputStyles}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Visibility</span>
          <select
            value={filters.isPublicFilter}
            onChange={(e) =>
              setFilters({
                ...filters,
                isPublicFilter: e.target.value as FilterState["isPublicFilter"],
              })
            }
            className={inputStyles}
          >
            <option value="">All</option>
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Min price</span>
          <input
            type="number"
            min={1}
            step={1}
            value={filters.priceMin}
            onChange={(e) =>
              setFilters({ ...filters, priceMin: e.target.value })
            }
            className={inputStyles}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Max price</span>
          <input
            type="number"
            min={1}
            step={1}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({ ...filters, priceMax: e.target.value })
            }
            className={inputStyles}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Per page</span>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className={inputStyles}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>

        <div className="flex gap-2">
          <Button type="submit" size="sm">
            Apply
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setFilters(DEFAULT_FILTERS);
              setPage(1);
              setQueryString(buildQueryString(DEFAULT_FILTERS, 1, limit));
            }}
          >
            Reset
          </Button>
        </div>
      </form>

      <h2 className="mb-4 font-display text-2xl font-bold text-primary">
        Pieces
      </h2>

      {loading && <p className="text-text-light">Loading...</p>}

      {error && <p className="text-primary-dark">{error}</p>}

      {!loading && !error && jerseys.length === 0 && (
        <p className="text-text-light">
          Your collection awaits its first artifact.
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {jerseys.map((jersey) => (
          <li key={jersey.id}>
            <Link
              href={`/admin/jerseys/${jersey.id}`}
              className="flex items-center justify-between rounded-lg border border-border border-l-4 border-l-primary bg-white px-4 py-3 transition-colors hover:bg-primary/5"
            >
              <span className="font-medium text-text-dark">{jersey.name}</span>
              <span className="text-sm text-text-light">
                {jersey.is_public ? "Public" : "Private"}
                {jersey.price !== null ? ` · $${jersey.price}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {!loading && total > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </Button>

          <span className="text-sm text-text-light">
            Page {page} of {totalPages} ({total} total)
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}