"use client";

import { FilterState, ProductCategory } from "@/types/AllTypes";
import { CATEGORIES, BRANDS, products } from "@/data/productsdata";
import { cn } from "cn";
import { FiSliders, FiRotateCcw } from "react-icons/fi";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

function getCategoryCount(category: string) {
  if (category === "All") return products.length;
  return products.filter((p) => p.category === category).length;
}

function getBrandCount(brand: string) {
  if (brand === "All") return products.length;
  return products.filter((p) => p.brand === brand).length;
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const set = (partial: Partial<FilterState>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-6">
      {/* Header: Filters */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
          <FiSliders size={18} className="text-[#FD6603]" />
          <span>Filters</span>
        </div>

        <button
          onClick={() =>
            onChange({
              category: "All",
              inStockOnly: false,
              brand: "All",
              minPrice: "",
              maxPrice: "",
              sortBy: "featured",
            })
          }
          className="text-xs text-gray-400 hover:text-[#FD6603] flex items-center gap-1 transition-colors"
          title="Reset filters"
        >
          <FiRotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-gray-900 font-bold text-sm mb-3">Category</h4>
        <ul className="space-y-1">
          {CATEGORIES.map((cat) => {
            const active = filters.category === cat;
            const displayName = cat === "All" ? "All Categories" : cat;
            const count = getCategoryCount(cat);

            return (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() =>
                    set({ category: cat as ProductCategory | "All" })
                  }
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm transition-all text-left",
                    active
                      ? "bg-[#0b101b] text-white font-semibold shadow-xs"
                      : "text-gray-600 hover:bg-gray-100/70 hover:text-gray-900"
                  )}
                >
                  <span className="truncate pr-2">{displayName}</span>
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 font-medium",
                      active ? "bg-white/15 text-white" : "text-gray-400"
                    )}
                  >
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Stock Status */}
      <div className="pt-2 border-t border-gray-100">
        <h4 className="text-gray-900 font-bold text-sm mb-3">Stock Status</h4>
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => set({ inStockOnly: e.target.checked })}
            className="w-4 h-4 accent-[#FD6603] rounded border-gray-300 text-[#FD6603] focus:ring-[#FD6603]"
          />
          <span className="text-sm text-gray-700">In-stock products only</span>
        </label>
      </div>

      {/* Brand */}
      <div className="pt-2 border-t border-gray-100">
        <h4 className="text-gray-900 font-bold text-sm mb-3">Brand</h4>
        <ul className="space-y-1">
          {BRANDS.map((brand) => {
            const active = filters.brand === brand;
            const displayName = brand === "All" ? "All Brands" : brand;
            const count = getBrandCount(brand);

            return (
              <li key={brand}>
                <button
                  type="button"
                  onClick={() => set({ brand })}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm transition-all text-left",
                    active
                      ? "bg-[#FD6603]/10 text-[#FD6603] font-semibold"
                      : "text-gray-600 hover:bg-gray-100/70 hover:text-gray-900"
                  )}
                >
                  <span>{displayName}</span>
                  <span className="text-xs text-gray-400 font-medium">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price Range */}
      <div className="pt-2 border-t border-gray-100">
        <h4 className="text-gray-900 font-bold text-sm mb-3">Price Range (Tk)</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) =>
                set({
                  minPrice: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#FD6603] focus:ring-1 focus:ring-[#FD6603] transition-colors"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                set({
                  maxPrice: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#FD6603] focus:ring-1 focus:ring-[#FD6603] transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
