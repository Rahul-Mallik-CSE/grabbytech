"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterState, SortOption } from "@/types/AllTypes";
import FilterPanel from "@/components/CollectionsComponents/FilterPanel";
import FilterSheet from "@/components/CollectionsComponents/FilterSheet";
import SortBar from "@/components/CollectionsComponents/SortBar";
import ProductGrid from "@/components/ProductsComponents/ProductGrid";
import { useGetProductsQuery } from "@/redux/features/products/productsAPI";

const defaultFilters: FilterState = {
  category: "All",
  inStockOnly: false,
  brand: "All",
  minPrice: "",
  maxPrice: "",
  sortBy: "featured",
};

const toSlug = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function getApiParams(filters: FilterState, search: string) {
  const ordering: Record<SortOption, string | undefined> = {
    featured: "-is_featured",
    "price-asc": "sale_price",
    "price-desc": "-sale_price",
    rating: "-average_rating",
    newest: "-created_at",
  };
  return {
    search: search || undefined,
    category_slug:
      filters.category === "All" ? undefined : toSlug(filters.category),
    brand_slug: filters.brand === "All" ? undefined : toSlug(filters.brand),
    min_price: filters.minPrice === "" ? undefined : filters.minPrice,
    max_price: filters.maxPrice === "" ? undefined : filters.maxPrice,
    in_stock: filters.inStockOnly ? true : undefined,
    ordering: ordering[filters.sortBy],
  };
}

function CollectionsContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const params = useMemo(() => getApiParams(filters, search), [filters, search]);
  const { data, isLoading, isError } = useGetProductsQuery(params);
  const products = data?.products ?? [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-12">
      <div className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">All Collections</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            {search ? `Search results for "${search}"` : "Explore our premium range of smart gadgets, tech, and lifestyle gear"}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 md:hidden">
          <div className="flex items-center justify-between gap-2">
            <FilterSheet filters={filters} onChange={setFilters} />
            <span className="text-xs text-gray-500 font-medium">Products: <b className="text-gray-900">{data?.count ?? 0}</b></span>
          </div>
          <SortBar filters={filters} onChange={setFilters} count={data?.count ?? 0} />
        </div>
        <div className="flex items-start gap-8">
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-20"><FilterPanel filters={filters} onChange={setFilters} /></div>
          </aside>
          <div className="flex-1 min-w-0">
            <div className="hidden md:block mb-5"><SortBar filters={filters} onChange={setFilters} count={data?.count ?? 0} /></div>
            {isLoading ? (
              <p className="py-20 text-center text-gray-500">Loading products...</p>
            ) : isError ? (
              <p className="py-20 text-center text-red-500">Unable to load products. Please try again.</p>
            ) : (
              <ProductGrid products={products} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading collections...</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
