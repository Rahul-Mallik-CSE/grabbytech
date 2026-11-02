"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiGrid } from "react-icons/fi";
import { products } from "@/data/productsdata";
import ProductCard from "@/components/products/ProductCard";

const INITIAL_LIMIT = 10;

export default function ProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, INITIAL_LIMIT);
  const hasMore = products.length > INITIAL_LIMIT;

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FD6603]" />
              <p className="text-[#FD6603] text-xs sm:text-sm font-bold uppercase tracking-wider">
                Our Products
              </p>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 mt-1">
              ফিচার্ড গ্যাজেট ও পণ্যসমূহ
            </h2>
          </div>

          <Link
            href="/collections"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-[#FD6603] font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <FiGrid size={15} />
            <span className="hidden sm:inline">সকল কালেকশন</span>
            <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Product Grid - 2 cols on mobile, up to 5 on wide screens */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* See More Button: shown only if products.length > 10 */}
        {hasMore && (
          <div className="flex justify-center mt-10 sm:mt-12">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-md shadow-[#FD6603]/25 cursor-pointer"
            >
              <span>{showAll ? "কম দেখান (Show Less)" : `আরও পণ্য দেখুন (${products.length - INITIAL_LIMIT}+ More)`}</span>
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
