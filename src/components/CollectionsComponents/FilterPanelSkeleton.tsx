export default function FilterPanelSkeleton() {
  return (
    <div className="space-y-6 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-12 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg px-3 py-2">
            <div className="h-4 w-3/5 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-6 animate-pulse rounded-full bg-gray-100" />
          </div>
        ))}
      </div>
      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-9 w-full animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}
