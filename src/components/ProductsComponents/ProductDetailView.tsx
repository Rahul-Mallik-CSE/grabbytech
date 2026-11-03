"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiShoppingCart,
  FiStar,
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiCheck,
  FiRotateCcw,
} from "react-icons/fi";
import { Product } from "@/types/AllTypes";
import { useCartContext } from "@/context/CartContext";
import { cn } from "cn";
import ProductDetailTabs from "./ProductDetailTabs";

interface ProductDetailViewProps {
  product: Product;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={15}
            fill={i < Math.round(rating) ? "#FD6603" : "transparent"}
            className={i < Math.round(rating) ? "text-[#FD6603]" : "text-gray-300"}
          />
        ))}
      </div>
      <span className="text-xs sm:text-sm text-gray-500 font-medium">
        {rating} ({count} Customer Reviews)
      </span>
    </div>
  );
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartContext();
  const router = useRouter();

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    addItem(product, qty);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#FD6603] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[#FD6603] transition-colors">
            Collections
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Back Link */}
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-[#FD6603] mb-6 transition-colors font-medium"
        >
          <FiArrowLeft size={16} /> Back to all products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-8 md:p-10 shadow-xs">
          {/* LEFT: Image Gallery */}
          <div className="space-y-4">
            {/* Main Active Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/10 shadow-md">
              <Image
                src={product.images[activeImg]?.url || product.images[0].url}
                alt={product.images[activeImg]?.alt || product.name}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {product.stock === 0 ? (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center">
                  <span className="text-white font-bold text-lg bg-red-600/90 px-4 py-1.5 rounded-full">
                    Sold Out
                  </span>
                </div>
              ) : null}

              {discount && product.stock > 0 ? (
                <span className="absolute top-4 left-4 bg-[#FD6603] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  -{discount}% OFF
                </span>
              ) : null}
            </div>

            {/* Thumbnail Navigation (4-5 images) */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden border-2 transition-all bg-black",
                    i === activeImg
                      ? "border-[#FD6603] ring-2 ring-[#FD6603]/30 scale-102"
                      : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
                  )}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Information & Buying Options */}
          <div className="flex flex-col gap-5">
            {/* Category and Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <span className="text-[11px] font-bold text-white bg-black px-2.5 py-1 rounded-md">
                Brand: {product.brand}
              </span>
              {product.badge && product.stock > 0 && (
                <span className="text-[11px] font-bold bg-[#FD6603] text-white px-2.5 py-1 rounded-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <StarRating rating={product.rating} count={product.reviewCount} />

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-gray-950">
                Tk {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm sm:text-base text-gray-400 line-through">
                  Tk {product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount && (
                <span className="text-xs sm:text-sm font-bold text-[#FD6603] ml-auto">
                  Save: Tk {(product.originalPrice! - product.price).toLocaleString()} ({discount}%)
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Feature Bullets */}
            <div className="space-y-2 py-2 border-y border-gray-100">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                Key Features:
              </p>
              {product.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <FiCheck size={15} className="text-[#FD6603] flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Stock Availability */}
            <div>
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs sm:text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock ({product.stock} units available)
                </span>
              ) : (
                <span className="text-red-500 text-xs sm:text-sm font-bold">
                  Currently Out of Stock
                </span>
              )}
            </div>

            {/* Quantity and Action Buttons */}
            {product.stock > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-gray-900">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Two Buy Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={cn(
                      "flex items-center justify-center gap-2 border-2 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer",
                      added
                        ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                        : "border-black text-black hover:bg-black hover:text-white"
                    )}
                  >
                    {added ? (
                      <>
                        <FiCheck size={16} /> Added to Cart
                      </>
                    ) : (
                      <>
                        <FiShoppingCart size={16} /> Add to Cart
                      </>
                    )}
                  </button>

                  {/* Buy Now (Primary color) */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-md shadow-[#FD6603]/30 cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            )}

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
              <div className="p-2.5 rounded-xl bg-gray-50 flex flex-col items-center gap-1">
                <FiTruck size={18} className="text-[#FD6603]" />
                <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
                  Free Delivery
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 flex flex-col items-center gap-1">
                <FiShield size={18} className="text-[#FD6603]" />
                <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
                  Cash on Delivery
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 flex flex-col items-center gap-1">
                <FiRotateCcw size={18} className="text-[#FD6603]" />
                <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
                  7-Day Warranty
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <ProductDetailTabs product={product} />
      </div>
    </div>
  );
}

