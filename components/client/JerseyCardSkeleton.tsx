import { Skeleton } from "@/components/ui/Skeleton";

interface JerseyCardSkeletonProps {
  liClassName?: string;
}

export function JerseyCardSkeleton({ liClassName }: JerseyCardSkeletonProps) {
  return (
    <li className={`h-full ${liClassName ?? ""}`} aria-hidden="true">
      <div className="my-2 h-full border-2 border-primary bg-white p-3">
        <Skeleton className="mb-3 aspect-square w-full rounded" />
        <Skeleton className="h-6 w-3/5 rounded" />
        <Skeleton className="mt-1 h-5 w-16 rounded" />
      </div>
    </li>
  );
}
