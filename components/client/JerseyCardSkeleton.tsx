interface JerseyCardSkeletonProps {
  liClassName?: string;
}

function Shimmer() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 animate-skeleton-shimmer bg-linear-to-r from-transparent via-white/70 to-transparent motion-reduce:hidden"
    />
  );
}

export function JerseyCardSkeleton({ liClassName }: JerseyCardSkeletonProps) {
  return (
    <li className={`h-full ${liClassName ?? ""}`} aria-hidden="true">
      <div className="my-2 h-full border-2 border-primary bg-white p-3">
        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded bg-primary/10">
          <Shimmer />
        </div>
        <div className="relative h-6 w-3/5 overflow-hidden rounded bg-primary/10">
          <Shimmer />
        </div>
        <div className="relative mt-1 h-5 w-16 overflow-hidden rounded bg-primary/10">
          <Shimmer />
        </div>
      </div>
    </li>
  );
}
