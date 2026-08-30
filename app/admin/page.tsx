"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
    <div className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Admin</h1>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg font-medium">Jerseys</h2>

        {!showCreate && (
          <button
            onClick={() => setShowCreate(true)}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Create jersey
          </button>
        )}
      </div>

      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="mb-8 flex flex-col gap-3 rounded-lg border border-gray-200 p-4"
        >
          <h2 className="text-lg font-medium">Create jersey</h2>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Price</span>
            <input
              type="number"
              min={1}
              step={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Public
          </label>

          {saveError && <p className="text-sm text-red-600">{saveError}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create"}
            </button>

            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="rounded border border-gray-300 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <form
        onSubmit={applyFilters}
        className="mb-4 grid grid-cols-2 gap-3 rounded-lg border border-gray-200 p-4"
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm">Name</span>
          <input
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Visibility</span>
          <select
            value={filters.isPublicFilter}
            onChange={(e) =>
              setFilters({
                ...filters,
                isPublicFilter: e.target.value as FilterState["isPublicFilter"],
              })
            }
            className="rounded border border-gray-300 px-3 py-2"
          >
            <option value="">All</option>
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Min price</span>
          <input
            type="number"
            min={1}
            step={1}
            value={filters.priceMin}
            onChange={(e) =>
              setFilters({ ...filters, priceMin: e.target.value })
            }
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Max price</span>
          <input
            type="number"
            min={1}
            step={1}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({ ...filters, priceMax: e.target.value })
            }
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

        <div className="col-span-2 flex items-end justify-between gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-sm">Per page</span>
            <select
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="rounded border border-gray-300 px-3 py-2"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded bg-black px-4 py-2 text-white"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                setFilters(DEFAULT_FILTERS);
                setPage(1);
                setQueryString(buildQueryString(DEFAULT_FILTERS, 1, limit));
              }}
              className="rounded border border-gray-300 px-4 py-2"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && jerseys.length === 0 && (
        <p className="text-gray-500">No jerseys found.</p>
      )}

      <ul className="flex flex-col gap-2">
        {jerseys.map((jersey) => (
          <li key={jersey.id}>
            <Link
              href={`/admin/jerseys/${jersey.id}`}
              className="flex items-center justify-between rounded border border-gray-200 px-4 py-3 hover:bg-gray-50"
            >
              <span className="font-medium">{jersey.name}</span>
              <span className="text-sm text-gray-500">
                {jersey.is_public ? "Public" : "Private"}
                {jersey.price !== null ? ` · $${jersey.price}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {!loading && total > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className="rounded border border-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-500">
            Page {page} of {totalPages} ({total} total)
          </span>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
            className="rounded border border-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}