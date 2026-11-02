"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { useCartContext } from "@/context/CartContext";

interface CartStepProps {
  onNext: () => void;
}

export default function CartStep({ onNext }: CartStepProps) {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } =
    useCartContext();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 text-center max-w-md mx-auto shadow-xs">
        <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FD6603] flex items-center justify-center mx-auto mb-4 border border-orange-100">
          <FiShoppingBag size={28} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          আপনার কার্ট বর্তমানে খালি আছে
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm mb-6">
          চেকআউট করতে প্রথমে পণ্য কার্টে যোগ করুন।
        </p>
        <Link
          href="/collections"
          className="inline-flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all active:scale-95 shadow-md shadow-[#FD6603]/25"
        >
          <span>পণ্য দেখুন (Browse Products)</span>
          <FiArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            কার্ট আইটেম ({totalItems} টি পণ্য)
          </h2>
          <Link
            href="/collections"
            className="text-xs sm:text-sm font-semibold text-[#FD6603] hover:underline"
          >
            + আরও পণ্য যোগ করুন
          </Link>
        </div>

        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-3 sm:gap-4 bg-white rounded-2xl border border-gray-200/80 p-3.5 sm:p-4 shadow-xs"
            >
              {/* Product Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-black border border-white/10">
                <Image
                  src={product.images[0]?.url || ""}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[#FD6603] font-extrabold text-sm sm:text-base">
                    ৳ {product.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-700 transition-colors"
                      >
                        <FiMinus size={11} />
                      </button>
                      <span className="text-xs font-bold w-6 text-center text-gray-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-700 transition-colors"
                      >
                        <FiPlus size={11} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="আইটেম মুছুন"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Box */}
      <div>
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-xs sticky top-24 space-y-4">
          <h3 className="font-bold text-gray-950 text-base sm:text-lg pb-3 border-b border-gray-100">
            অর্ডার সামারি (Order Summary)
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-gray-600">
              <span>মোট পণ্যের মূল্য ({totalItems} টি)</span>
              <span className="font-semibold text-gray-900">
                ৳ {totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>ডেলিভারি চার্জ</span>
              <span className="text-emerald-600 font-bold">ফ্রি (Free Delivery)</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between items-baseline font-black text-gray-950 text-base sm:text-lg">
              <span>সর্বমোট প্রদেয়</span>
              <span className="text-[#FD6603]">৳ {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-all active:scale-95 shadow-md shadow-[#FD6603]/30 cursor-pointer"
          >
            <span>ঠিকানা দিন (Continue to Address)</span>
            <FiArrowRight size={16} />
          </button>

          <p className="text-[11px] text-gray-500 text-center leading-relaxed">
            ক্যাশ অন ডেলিভারিতে পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন
          </p>
        </div>
      </div>
    </div>
  );
}
