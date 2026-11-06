import { Skeleton } from "@/components/ui/Skeleton";

interface JerseyCardSkeletonProps {
  liClassName?: string;
}

export function JerseyCardSkeleton({ liClassName }: JerseyCardSkeletonProps) {
  return (
    <li className={`h-full ${liClassName ?? ""}`} aria-hidden="true">
      <div className="my-2 flex h-full flex-col border-2 border-primary bg-white p-4">
        <Skeleton className="mb-4 aspect-square w-full" />
        <Skeleton className="h-[22px] w-3/4 rounded" />
        <Skeleton className="mt-2 h-3.5 w-full rounded" />
        <Skeleton className="mt-1 mb-4 h-3.5 w-2/3 rounded" />
        <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-3.5">
          <Skeleton className="h-5 w-20 rounded" />
          <Skeleton className="h-3.5 w-14 rounded" />
        </div>
      </div>
    </li>
  );
}
