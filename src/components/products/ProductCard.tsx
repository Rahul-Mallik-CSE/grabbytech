"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShoppingCart, FiStar, FiEye, FiCheck } from "react-icons/fi";
import { Product } from "@/types/AllTypes";
import { useCartContext } from "@/context/CartContext";
import { cn } from "cn";

interface ProductCardProps {
  product: Product;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={11}
            className={i < Math.round(rating) ? "text-[#FD6603]" : "text-white/20"}
            fill={i < Math.round(rating) ? "#FD6603" : "transparent"}
          />
        ))}
      </div>
      <span className="text-white/40 text-[11px] ml-0.5">({count})</span>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCartContext();
  const router = useRouter();

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    setAdding(true);
    addItem(product, 1);
    setTimeout(() => setAdding(false), 1000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    addItem(product, 1);
    router.push("/checkout");
  };

  return (
    <div className="group bg-[#0f0f0f] border border-white/10 hover:border-[#FD6603]/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-[#161616]">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[imgIdx]?.url ?? product.images[0].url}
            alt={product.images[imgIdx]?.alt ?? product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Discount Tag (like 4th image) */}
          {discount && product.stock > 0 ? (
            <span className="bg-black/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/15">
              -{discount}%
            </span>
          ) : (
            <span />
          )}

          {/* Status Badge (like 5th image: Sold out / Sale) */}
          {product.stock === 0 ? (
            <span className="bg-black/90 text-white/80 text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-white/20">
              Sold out
            </span>
          ) : product.badge ? (
            <span
              className={cn(
                "text-[10px] font-semibold px-2.5 py-0.5 rounded-full border",
                product.badge === "Sale"
                  ? "bg-[#FD6603]/15 text-[#FD6603] border-[#FD6603]/30"
                  : "bg-white/10 text-white border-white/20"
              )}
            >
              {product.badge}
            </span>
          ) : null}
        </div>

        {/* Quick View Button on Hover */}
        <div className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center pointer-events-none">
          <Link
            href={`/products/${product.slug}`}
            className="pointer-events-auto bg-black/80 hover:bg-black text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 backdrop-blur-sm transition-all active:scale-95"
          >
            <FiEye size={13} />
            Quick View
          </Link>
        </div>

        {/* Image dot indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 pointer-events-auto">
            {product.images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`View photo ${i + 1}`}
                onMouseEnter={() => setImgIdx(i)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setImgIdx(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === imgIdx ? "bg-[#FD6603] w-3.5" : "bg-white/40 w-1.5 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
        {/* Category Pill Tag (like 4th image) */}
        <span className="inline-block text-[10px] font-medium text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded w-fit tracking-wide uppercase line-clamp-1">
          {product.category}
        </span>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-white text-xs sm:text-sm font-medium line-clamp-2 leading-snug hover:text-[#FD6603] transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating Stars (like 5th image) */}
        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price Row (like 4th & 5th image) */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-sm sm:text-base font-bold text-white">
            Tk {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-white/40 line-through">
              Tk {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Two Action Buttons: Cart and Buy (like 4th image, styled with theme) */}
        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10">
          {/* Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={cn(
              "flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-semibold border transition-all active:scale-95",
              product.stock === 0
                ? "border-white/10 text-white/20 cursor-not-allowed"
                : adding
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                : "border-white/20 text-white hover:border-[#FD6603] hover:text-[#FD6603] hover:bg-white/5"
            )}
          >
            {adding ? (
              <>
                <FiCheck size={12} className="text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <FiShoppingCart size={13} />
                <span>Cart</span>
              </>
            )}
          </button>

          {/* Buy Button (Primary color) */}
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className={cn(
              "flex items-center justify-center h-9 rounded-lg text-xs font-semibold text-white transition-all active:scale-95 shadow-sm",
              product.stock === 0
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "bg-[#FD6603] hover:bg-[#e55b03]"
            )}
          >
            {product.stock === 0 ? "Sold Out" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
