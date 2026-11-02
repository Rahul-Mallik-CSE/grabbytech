"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import {
  FiShoppingCart,
  FiStar,
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiCheck,
} from "react-icons/fi";
import { products } from "@/data/productsdata";
import { useCartContext } from "@/context/CartContext";
import { cn } from "cn";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={14}
            fill={i < Math.round(rating) ? "#FD6603" : "transparent"}
            className={i < Math.round(rating) ? "text-[#FD6603]" : "text-gray-300"}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">
        {rating} ({count} reviews)
      </span>
    </div>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartContext();

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#FD6603] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[#FD6603] transition-colors">
            Collections
          </Link>
          <span>/</span>
          <span className="text-gray-800 line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back button */}
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#FD6603] mb-8 transition-colors"
        >
          <FiArrowLeft size={15} /> Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT — Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src={product.images[activeImg].url}
                alt={product.images[activeImg].alt}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Sold Out</span>
                </div>
              )}
              {discount && product.stock > 0 && (
                <span className="absolute top-4 left-4 bg-[#FD6603] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    i === activeImg
                      ? "border-[#FD6603]"
                      : "border-transparent hover:border-gray-200"
                  )}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="flex flex-col gap-5">
            {/* Category + badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {product.category}
              </span>
              {product.badge && product.stock > 0 && (
                <span className="text-[10px] font-bold bg-[#FD6603] text-white px-2 py-0.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <StarRating rating={product.rating} count={product.reviewCount} />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-gray-900">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount && (
                <span className="text-sm font-bold text-[#FD6603]">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Features */}
            <div className="space-y-2">
              {product.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <FiCheck size={14} className="text-[#FD6603] flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Stock */}
            <div>
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-500 text-sm font-medium">Out of Stock</span>
              )}
            </div>

            {/* Qty + Actions */}
            {product.stock > 0 && (
              <div className="flex flex-col gap-3">
                {/* Quantity selector */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Qty:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 border-2 font-semibold py-3 rounded-xl text-sm transition-all active:scale-95",
                      added
                        ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                        : "border-[#FD6603] text-[#FD6603] hover:bg-[#FD6603]/5"
                    )}
                  >
                    {added ? (
                      <>
                        <FiCheck size={15} /> Added to Cart
                      </>
                    ) : (
                      <>
                        <FiShoppingCart size={15} /> Add to Cart
                      </>
                    )}
                  </button>
                  <Link
                    href="/checkout"
                    onClick={() => addItem(product, qty)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-semibold py-3 rounded-xl text-sm transition-all active:scale-95"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiTruck size={14} className="text-[#FD6603]" />
                Free delivery
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiShield size={14} className="text-[#FD6603]" />
                Quality guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* Full description */}
        <div className="mt-14 max-w-3xl">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Product Details</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

