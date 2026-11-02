"use client";

import { SortOption, FilterState } from "@/types/AllTypes";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "জনপ্রিয় (Featured)", value: "featured" },
  { label: "মূল্য: কম থেকে বেশি", value: "price-asc" },
  { label: "মূল্য: বেশি থেকে কম", value: "price-desc" },
  { label: "সর্বোচ্চ রেটিং (Top Rated)", value: "rating" },
  { label: "নতুন পণ্য (Newest)", value: "newest" },
];

interface SortBarProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  count: number;
}

export default function SortBar({ filters, onChange, count }: SortBarProps) {
  return (
    <div className="flex items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200/80 shadow-xs">
      <p className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
        মোট <span className="font-bold text-gray-900">{count}</span> টি পণ্য
      </p>
      <div className="flex items-center gap-1.5 min-w-0">
        <label className="text-xs sm:text-sm text-gray-500 hidden sm:inline whitespace-nowrap">
          সর্ট করুন:
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onChange({ ...filters, sortBy: e.target.value as SortOption })
          }
          className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs sm:text-sm text-gray-800 outline-none focus:border-[#FD6603] bg-white cursor-pointer truncate max-w-[170px] sm:max-w-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
