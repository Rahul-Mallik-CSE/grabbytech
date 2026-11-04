export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-50 pb-24 md:pb-16">
      <div className="h-12 border-b border-gray-200 bg-white" />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6 h-4 w-36 rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-gray-200/80 bg-white p-5 shadow-xs sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10">
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-gray-200" />
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="aspect-square rounded-xl bg-gray-200" />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2"><div className="h-6 w-28 rounded bg-gray-200" /><div className="h-6 w-24 rounded bg-gray-200" /></div>
            <div className="space-y-2"><div className="h-8 w-full rounded bg-gray-200" /><div className="h-8 w-4/5 rounded bg-gray-200" /></div>
            <div className="h-5 w-48 rounded bg-gray-200" />
            <div className="h-16 w-full rounded-2xl bg-gray-200" />
            <div className="space-y-2"><div className="h-4 w-full rounded bg-gray-200" /><div className="h-4 w-5/6 rounded bg-gray-200" /><div className="h-4 w-2/3 rounded bg-gray-200" /></div>
            <div className="h-12 w-full rounded-xl bg-gray-200" />
            <div className="grid grid-cols-2 gap-3"><div className="h-12 rounded-xl bg-gray-200" /><div className="h-12 rounded-xl bg-gray-200" /></div>
          </div>
        </div>
        <div className="mt-8 space-y-4 sm:mt-12"><div className="h-10 w-72 rounded bg-gray-200" /><div className="h-48 w-full rounded-2xl bg-gray-200" /></div>
      </div>
    </div>
  );
}
