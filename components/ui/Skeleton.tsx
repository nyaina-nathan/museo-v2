interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-primary/10 ${className ?? ""}`}
    >
      <span className="absolute inset-0 animate-skeleton-shimmer bg-linear-to-r from-transparent via-white/70 to-transparent motion-reduce:hidden" />
    </div>
  );
}
