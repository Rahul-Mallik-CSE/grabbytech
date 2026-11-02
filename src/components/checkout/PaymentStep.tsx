"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckoutFormData } from "@/types/AllTypes";
import { useCartContext } from "@/context/CartContext";
import {
  FiArrowLeft,
  FiCheck,
  FiMapPin,
  FiPhone,
  FiUser,
  FiCheckCircle,
  FiTruck,
  FiShoppingBag,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

interface PaymentStepProps {
  address: CheckoutFormData;
  onBack: () => void;
}

export default function PaymentStep({ address, onBack }: PaymentStepProps) {
  const { items, totalPrice, totalItems, clearCart } = useCartContext();
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handlePlaceOrder = async () => {
    setPlacing(true);
    const generatedId = `GT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    // Simulate placing order
    await new Promise((r) => setTimeout(r, 1200));
    clearCart();
    setPlacing(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 text-center shadow-lg space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/15">
          <FiCheck size={36} />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            অর্ডার সফল হয়েছে!
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 mt-2">
            ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            অর্ডার আইডি: <span className="font-mono font-bold text-gray-900">{orderId}</span>
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 text-left text-xs sm:text-sm text-gray-700 space-y-2 border border-gray-200/60">
          <div className="flex items-center gap-2 font-semibold text-gray-900 pb-2 border-b border-gray-200">
            <FiTruck className="text-[#FD6603]" />
            <span>ক্যাশ অন ডেলিভারি নিশ্চিতকরণ</span>
          </div>
          <p>
            <b className="text-gray-900">প্রাপক:</b> {address.fullName} ({address.phone})
          </p>
          <p>
            <b className="text-gray-900">ডেলিভারি ঠিকানা:</b> {address.address}, {address.city}, {address.district}
          </p>
          <p className="text-emerald-700 font-bold pt-1">
            পণ্য হাতে পেয়ে ৳ {totalPrice.toLocaleString()} টাকা পরিশোধ করুন।
          </p>
        </div>

        <p className="text-xs text-gray-500">
          আমাদের প্রতিনিধি শীঘ্রই ফোন করে আপনার অর্ডারটি কনফার্ম করবেন।
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all active:scale-95 shadow-md shadow-[#FD6603]/30"
          >
            <FiShoppingBag size={16} /> হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-950">
            অর্ডার ও পেমেন্ট রিভিউ (Order Review & Payment)
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            অনুগ্রহ করে তথ্যগুলো যাচাই করে অর্ডার নিশ্চিত করুন
          </p>
        </div>

        {/* Delivery Address Preview */}
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiMapPin className="text-[#FD6603]" /> ডেলিভারি ঠিকানা
            </span>
            <button
              type="button"
              onClick={onBack}
              className="text-xs text-[#FD6603] font-semibold hover:underline"
            >
              পরিবর্তন করুন
            </button>
          </div>

          <div className="text-xs sm:text-sm text-gray-800 space-y-1">
            <p className="font-bold text-gray-900">
              {address.fullName} • <span className="text-gray-600 font-normal">{address.phone}</span>
            </p>
            <p className="text-gray-600">
              {address.address}, {address.city}, {address.district}
            </p>
            {address.notes ? (
              <p className="text-gray-500 italic text-[11px]">নোট: {address.notes}</p>
            ) : null}
          </div>
        </div>

        {/* Selected Products Preview */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            অর্ডার আইটেম ({totalItems} টি পণ্য)
          </p>
          <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto pr-1">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="py-2.5 flex items-center justify-between text-xs sm:text-sm gap-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-gray-400 text-[11px]">
                    পরিমাণ: {quantity} × ৳ {product.price.toLocaleString()}
                  </p>
                </div>
                <span className="font-bold text-gray-900 flex-shrink-0">
                  ৳ {(product.price * quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600">ডেলিভারি চার্জ</span>
            <span className="text-emerald-600 font-bold">ফ্রি (Free Delivery)</span>
          </div>

          <div className="flex items-center justify-between text-base sm:text-lg font-black text-gray-950 pt-1">
            <span>সর্বমোট পরিশোধযোগ্য:</span>
            <span className="text-[#FD6603]">৳ {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Method - Cash on Delivery */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            পেমেন্ট মেথড (Payment Method)
          </p>
          
          <div className="border-2 border-[#FD6603] bg-[#FD6603]/5 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-[#FD6603] flex items-center justify-center flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FD6603]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-gray-950">
                  ক্যাশ অন ডেলিভারি (Cash on Delivery)
                </span>
                <span className="bg-[#FD6603] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  সক্রিয়
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">
                কোনো অগ্রিম পেমেন্ট নেই — পণ্য ডেলিভারিম্যানের কাছ থেকে বুঝে পেয়ে মূল্য পরিশোধ করুন।
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
          >
            <FiArrowLeft size={16} /> ঠিকানায় ফেরত
          </button>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={placing}
            className="flex-1 flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] disabled:opacity-75 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-all active:scale-95 shadow-md shadow-[#FD6603]/30 cursor-pointer"
          >
            {placing ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>অর্ডার প্রসেস হচ্ছে...</span>
              </>
            ) : (
              <>
                <FiCheckCircle size={18} />
                <span>অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
