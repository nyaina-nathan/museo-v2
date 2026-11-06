"use client";

import { Button } from "@/components/ui/Button";
import { useDictionary } from "@/libs/i18n/locale-provider";

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
  const dict = useDictionary();

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
          {dict.filters.title}
        </h2>

        {onClose && (
          <button
            type="button"
            aria-label={dict.filters.close}
            onClick={onClose}
            className="rounded border border-border px-2 py-1 text-lg leading-none text-text-light transition-colors hover:border-primary hover:text-primary"
          >
            &times;
          </button>
        )}
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-dark">
          {dict.filters.name}
        </span>
        <input
          type="text"
          value={value.name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder={dict.filters.searchPlaceholder}
          className={inputStyles}
        />
      </label>

      {bounds && lo !== null && hi !== null ? (
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-text-dark">
            {dict.filters.priceRange}
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
              aria-label={dict.filters.minPrice}
              onChange={(event) => handleMinChange(Number(event.target.value))}
            />
            <input
              type="range"
              min={bounds.min}
              max={bounds.max}
              step={1000}
              value={hi}
              aria-label={dict.filters.maxPrice}
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
            {dict.filters.priceRange}
          </legend>
          <p className="text-sm text-text-light">
            {dict.filters.unavailable}
          </p>
        </fieldset>
      )}

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-sm font-medium text-text-dark">
          {dict.filters.sort}
        </legend>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-dark">
            {dict.filters.orderBy}
          </span>
          <select
            value={value.orderBy}
            onChange={(event) =>
              onOrderByChange(
                event.target.value as JerseyFiltersValue["orderBy"]
              )
            }
            className={inputStyles}
          >
            <option value="createdAt">{dict.filters.createdDate}</option>
            <option value="name">{dict.filters.nameOption}</option>
            <option value="price">{dict.filters.price}</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-dark">
            {dict.filters.order}
          </span>
          <select
            value={value.order}
            onChange={(event) =>
              onOrderChange(event.target.value as JerseyFiltersValue["order"])
            }
            className={inputStyles}
          >
            <option value="desc">{dict.filters.descending}</option>
            <option value="asc">{dict.filters.ascending}</option>
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
        {dict.filters.reset}
      </Button>
    </div>
  );
}
