"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiGrid } from "react-icons/fi";
import ProductCard from "@/components/ProductsComponents/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductsComponents/ProductCardSkeleton";
import { useGetProductsQuery } from "@/redux/features/products/productsAPI";

const INITIAL_LIMIT = 10;

export default function ProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const { data, isLoading, isError } = useGetProductsQuery({ page_size: 20 });
  const apiProducts = data?.products ?? [];
  const visibleProducts = showAll ? apiProducts : apiProducts.slice(0, INITIAL_LIMIT);
  const hasMore = apiProducts.length > INITIAL_LIMIT;

  return (
    <section className="py-6 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-3 sm:mb-6 pb-1 sm:pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FD6603]" />
              <p className="text-[#FD6603] text-xs sm:text-sm font-bold uppercase tracking-wider">
                Our Products
              </p>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 mt-1">
              Featured Gadgets & Tech
            </h2>
          </div>

          <Link
            href="/collections"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-[#FD6603] font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <FiGrid size={15} />
            <span className="hidden sm:inline">All Collections</span>
            <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Product Grid - 2 cols on mobile, up to 5 on wide screens */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : isError ? (
            <p className="col-span-full py-16 text-center text-red-500">Unable to load products.</p>
          ) : visibleProducts.length ? visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) : (
            <p className="col-span-full py-16 text-center text-gray-500">No products found.</p>
          )}
        </div>

        {/* See More Button: shown only if products.length > 10 */}
        {hasMore && (
          <div className="flex justify-center mt-10 sm:mt-12">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-md shadow-[#FD6603]/25 cursor-pointer"
            >
              <span>{showAll ? "Show Less" : `See More Products (${apiProducts.length - INITIAL_LIMIT}+ More)`}</span>
              <FiArrowRight
                size={16}
                className={showAll ? "-rotate-90 transition-transform" : "transition-transform"}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
