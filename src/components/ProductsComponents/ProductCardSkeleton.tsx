export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f]">
      <div className="aspect-square animate-pulse bg-white/10" />
      <div className="flex flex-col gap-3 p-3 sm:p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-white/10" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-white/10" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-white/10" />
        </div>
        <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
        <div className="h-5 w-2/5 animate-pulse rounded bg-white/10" />
        <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
          <div className="h-9 animate-pulse rounded-lg bg-white/10" />
          <div className="h-9 animate-pulse rounded-lg bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
}
