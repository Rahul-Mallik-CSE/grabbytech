"use client";

import { useState } from "react";
import { FiSliders } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterPanel from "./FilterPanel";
import FilterPanelSkeleton from "./FilterPanelSkeleton";
import { FilterState } from "@/types/AllTypes";

interface FilterSheetProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  categories: string[];
  categoryCounts: Record<string, number>;
  isLoading?: boolean;
}

export default function FilterSheet({ filters, onChange, categories, categoryCounts, isLoading = false }: FilterSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center gap-2 border border-gray-200 bg-white text-gray-800 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold hover:border-[#FD6603] hover:text-[#FD6603] transition-colors shadow-xs">
        <FiSliders size={14} className="text-[#FD6603]" />
        <span>Filters</span>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white border-r border-gray-200 w-[85vw] max-w-sm overflow-y-auto p-0 z-50"
      >
        <SheetHeader className="px-5 py-4 border-b border-gray-100 flex flex-row items-center justify-between">
          <SheetTitle className="text-gray-900 font-bold text-base">
            Filter Products
          </SheetTitle>
        </SheetHeader>
        <div className="p-4">
          {isLoading ? (
            <FilterPanelSkeleton />
          ) : (
            <FilterPanel
              filters={filters}
              onChange={onChange}
              categories={categories}
              categoryCounts={categoryCounts}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
