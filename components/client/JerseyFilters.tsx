"use client";

import { Button } from "@/components/ui/Button";

export interface JerseyFiltersValue {
  name: string;
  priceMin: number | null;
  priceMax: number | null;
  orderBy: "createdAt" | "name" | "price";
  order: "asc" | "desc";
}

export interface PriceBounds {
  min: number;
  max: number;
}

interface JerseyFiltersProps {
  bounds: PriceBounds | null;
  value: JerseyFiltersValue;
  onNameChange: (name: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onOrderByChange: (orderBy: JerseyFiltersValue["orderBy"]) => void;
  onOrderChange: (order: JerseyFiltersValue["order"]) => void;
  onReset: () => void;
  onClose?: () => void;
}

const inputStyles =
  "w-full rounded border border-border px-3 py-2 focus:border-primary";

export function JerseyFilters({
  bounds,
  value,
  onNameChange,
  onPriceChange,
  onOrderByChange,
  onOrderChange,
  onReset,
  onClose,
}: JerseyFiltersProps) {
  const hasActiveFilters =
    value.name.trim() !== "" ||
    value.priceMin !== null ||
    value.priceMax !== null ||
    value.orderBy !== "createdAt" ||
    value.order !== "desc";

  const lo = value.priceMin ?? bounds?.min ?? null;
  const hi = value.priceMax ?? bounds?.max ?? null;

  function handleMinChange(raw: number) {
    if (!bounds || hi === null) return;
    const min = Math.min(Math.max(raw, bounds.min), hi);
    onPriceChange(min, hi);
  }

  function handleMaxChange(raw: number) {
    if (!bounds || lo === null) return;
    const max = Math.max(Math.min(raw, bounds.max), lo);
    onPriceChange(lo, max);
  }

  const span = bounds ? bounds.max - bounds.min : 0;
  const leftPct =
    bounds && lo !== null && span > 0
      ? ((lo - bounds.min) / span) * 100
      : 0;
  const rightPct =
    bounds && hi !== null && span > 0
      ? ((bounds.max - hi) / span) * 100
      : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="w-full text-center font-display text-lg font-bold text-primary">
          Filters
        </h2>

        {onClose && (
          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="rounded border border-border px-2 py-1 text-lg leading-none text-text-light transition-colors hover:border-primary hover:text-primary"
          >
            &times;
          </button>
        )}
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-dark">Name</span>
        <input
          type="text"
          value={value.name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Search pieces…"
          className={inputStyles}
        />
      </label>

      {bounds && lo !== null && hi !== null ? (
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-text-dark">
            Price range
          </legend>

          <div className="dual-range">
            <div className="dual-range__track" aria-hidden="true" />
            <div
              className="dual-range__fill"
              aria-hidden="true"
              style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
            />
            <input
              type="range"
              min={bounds.min}
              max={bounds.max}
              step={1000}
              value={lo}
              aria-label="Minimum price"
              onChange={(event) => handleMinChange(Number(event.target.value))}
            />
            <input
              type="range"
              min={bounds.min}
              max={bounds.max}
              step={1000}
              value={hi}
              aria-label="Maximum price"
              onChange={(event) => handleMaxChange(Number(event.target.value))}
            />
          </div>

          <p className="mt-2 text-xs font-medium text-text-light">
            Ar {lo} &ndash; Ar {hi}
          </p>
        </fieldset>
      ) : (
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-text-dark">
            Price range
          </legend>
          <p className="text-sm text-text-light">
            Price filtering is unavailable right now.
          </p>
        </fieldset>
      )}

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-sm font-medium text-text-dark">
          Sort
        </legend>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-dark">Order by</span>
          <select
            value={value.orderBy}
            onChange={(event) =>
              onOrderByChange(
                event.target.value as JerseyFiltersValue["orderBy"]
              )
            }
            className={inputStyles}
          >
            <option value="createdAt">Created date</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-dark">Order</span>
          <select
            value={value.order}
            onChange={(event) =>
              onOrderChange(event.target.value as JerseyFiltersValue["order"])
            }
            className={inputStyles}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </fieldset>

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        disabled={!hasActiveFilters}
        className="self-start"
      >
        Reset filters
      </Button>
    </div>
  );
}
