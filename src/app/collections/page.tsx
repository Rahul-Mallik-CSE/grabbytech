"use client";

import { useState, useMemo } from "react";
import { FilterState, ProductCategory, SortOption } from "@/types/AllTypes";
import { products } from "@/data/productsdata";
import FilterPanel from "@/components/CollectionsComponents/FilterPanel";
import FilterSheet from "@/components/CollectionsComponents/FilterSheet";
import SortBar from "@/components/CollectionsComponents/SortBar";
import ProductGrid from "@/components/ProductsComponents/ProductGrid";

const defaultFilters: FilterState = {
  category: "All",
  inStockOnly: false,
  brand: "All",
  minPrice: "",
  maxPrice: "",
  sortBy: "featured",
};

function applyFilters(filters: FilterState) {
  let result = [...products];

  if (filters.category !== "All") {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.inStockOnly) {
    result = result.filter((p) => p.stock > 0);
  }
  if (filters.brand !== "All") {
    result = result.filter((p) => p.brand === filters.brand);
  }
  if (filters.minPrice !== "") {
    result = result.filter((p) => p.price >= Number(filters.minPrice));
  }
  if (filters.maxPrice !== "") {
    result = result.filter((p) => p.price <= Number(filters.maxPrice));
  }

  // Sorting
  switch (filters.sortBy as SortOption) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case "newest":
      result.sort((a, b) => Number(b.id) - Number(a.id));
      break;
    default:
      break;
  }

  return result;
}

export default function CollectionsPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filtered = useMemo(() => applyFilters(filters), [filters]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-12">
      {/* Black Page Header Banner */}
      <div className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            All Collections
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Explore our premium range of smart gadgets, tech, and lifestyle gear
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Mobile Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 md:hidden">
          <div className="flex items-center justify-between gap-2">
            <FilterSheet filters={filters} onChange={setFilters} />
            <span className="text-xs text-gray-500 font-medium">
              Products: <b className="text-gray-900">{filtered.length}</b>
            </span>
          </div>
          <SortBar filters={filters} onChange={setFilters} count={filtered.length} />
        </div>

        <div className="flex items-start gap-8">
          {/* Desktop Sidebar Filter (w-72) */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-20">
              <FilterPanel filters={filters} onChange={setFilters} />
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            {/* Desktop Sort Header */}
            <div className="hidden md:block mb-5">
              <SortBar filters={filters} onChange={setFilters} count={filtered.length} />
            </div>

            {/* Responsive Product Grid */}
            <ProductGrid
              products={filtered}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
