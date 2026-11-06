import { Skeleton } from "@/components/ui/Skeleton";

export function JerseyDetailSkeleton() {
  return (
    <section className="bg-white py-20" aria-busy="true">
      <span role="status" className="sr-only">
        Loading this piece…
      </span>

      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
        <Skeleton className="mb-10 h-9 w-40 rounded" />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="min-w-0">
            <Skeleton className="aspect-square w-full rounded" />

            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} className="aspect-square w-full rounded" />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-10 w-3/4 rounded md:h-12" />
            <Skeleton className="mt-4 h-7 w-24 rounded" />

            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>

            <div className="mt-8 flex gap-3">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-11 w-11 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
