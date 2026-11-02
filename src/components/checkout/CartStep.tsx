"use client";

import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2, FiArrowRight } from "react-icons/fi";
import { useCartContext } from "@/context/CartContext";

interface CartStepProps {
  onNext: () => void;
}

export default function CartStep({ onNext }: CartStepProps) {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } =
    useCartContext();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h2>
        {items.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-4"
          >
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm line-clamp-2">
                {product.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
              <p className="text-[#FD6603] font-bold text-base mt-1">
                ৳{product.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FD6603] hover:text-[#FD6603] transition-colors"
                >
                  <FiMinus size={11} />
                </button>
                <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FD6603] hover:text-[#FD6603] transition-colors"
                >
                  <FiPlus size={11} />
                </button>
                <button
                  onClick={() => removeItem(product.id)}
                  className="ml-auto text-red-400 hover:text-red-500 transition-colors"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
          <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({totalItems} items)</span>
              <span>৳{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className="text-emerald-600 font-medium">Free</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>৳{totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={onNext}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-semibold py-3 rounded-xl text-sm transition-all active:scale-95"
          >
            Continue to Address <FiArrowRight size={15} />
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Free delivery across Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
}

