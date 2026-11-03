"use client";

import { useState } from "react";
import { Product } from "@/types/AllTypes";
import { customerReviews } from "@/data/customerReviewData";
import { FiStar } from "react-icons/fi";
import Image from "next/image";
import { cn } from "cn";

interface ProductDetailTabsProps {
  product: Product;
}

export default function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  // Taking 2 static reviews for the UI mock
  const productReviews = customerReviews.slice(0, 2);

  return (
    <div className="mt-8 sm:mt-12">
      <div className="flex items-center gap-6 sm:gap-10 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab("description")}
          className={cn(
            "pb-3 text-sm sm:text-base font-bold transition-all border-b-2 cursor-pointer",
            activeTab === "description"
              ? "border-black text-black"
              : "border-transparent text-gray-400 hover:text-gray-700"
          )}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={cn(
            "pb-3 text-sm sm:text-base font-bold transition-all border-b-2 cursor-pointer",
            activeTab === "specs"
              ? "border-black text-black"
              : "border-transparent text-gray-400 hover:text-gray-700"
          )}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={cn(
            "pb-3 text-sm sm:text-base font-bold transition-all border-b-2 cursor-pointer",
            activeTab === "reviews"
              ? "border-black text-black"
              : "border-transparent text-gray-400 hover:text-gray-700"
          )}
        >
          Reviews ({productReviews.length})
        </button>
      </div>

      <div className="py-6">
        {activeTab === "description" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-8 shadow-xs">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs">
            <div className="divide-y divide-gray-100 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center p-4">
                <span className="sm:w-1/3 font-bold text-gray-900 mb-1 sm:mb-0">
                  Model
                </span>
                <span className="text-gray-600">{product.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-gray-50/50">
                <span className="sm:w-1/3 font-bold text-gray-900 mb-1 sm:mb-0">
                  Brand
                </span>
                <span className="text-gray-600">{product.brand || "N/A"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center p-4">
                <span className="sm:w-1/3 font-bold text-gray-900 mb-1 sm:mb-0">
                  Category
                </span>
                <span className="text-gray-600">{product.category}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-gray-50/50">
                <span className="sm:w-1/3 font-bold text-gray-900 mb-1 sm:mb-0">
                  Warranty
                </span>
                <span className="text-gray-600">7-Day Replacement Warranty</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs flex flex-col items-center">
              <h3 className="text-5xl font-black text-gray-900 mb-2">
                {product.rating}
              </h3>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    size={18}
                    fill={i < Math.round(product.rating) ? "#FD6603" : "transparent"}
                    className={
                      i < Math.round(product.rating)
                        ? "text-[#FD6603]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mb-6">
                Based on {product.reviewCount} reviews
              </p>

              <div className="w-full space-y-2 mb-6">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-4 font-medium flex items-center gap-0.5">
                      {star}
                      <FiStar size={10} />
                    </span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-400 rounded-full"
                        style={{
                          width: star === 5 ? "80%" : star === 4 ? "15%" : "0%",
                        }}
                      />
                    </div>
                    <span className="w-4 text-right">
                      {star === 5 ? 120 : star === 4 ? 25 : 0}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95 cursor-pointer">
                Write a review
              </button>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {review.name}
                          </p>
                          <p className="text-[11px] text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar
                            key={i}
                            size={12}
                            fill={i < review.rating ? "#FD6603" : "transparent"}
                            className={
                              i < review.rating ? "text-[#FD6603]" : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200/80 p-10 shadow-xs flex flex-col items-center justify-center text-center h-full">
                  <p className="text-gray-500 text-sm">
                    No reviews yet. Be the first to write one!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}