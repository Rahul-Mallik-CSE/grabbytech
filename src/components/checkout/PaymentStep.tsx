"use client";

import { useState } from "react";
import { CheckoutFormData } from "@/types/AllTypes";
import { useCartContext } from "@/context/CartContext";
import { FiArrowLeft, FiCheck, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface PaymentStepProps {
  address: CheckoutFormData;
  onBack: () => void;
}

export default function PaymentStep({ address, onBack }: PaymentStepProps) {
  const { items, totalPrice, clearCart } = useCartContext();
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    setPlacing(true);
    // Simulate order placement
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    setPlacing(false);
    setPlaced(true);
    // Redirect after 3 seconds
    setTimeout(() => router.push("/"), 3000);
  };

  if (placed) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mb-5">
          <FiCheck size={36} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-500 text-sm">
          Thank you for your order. Our team will confirm and deliver soon.
          Redirecting you to home...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Review & Confirm</h2>

      {/* Delivery Address Preview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
          <FiMapPin size={14} className="text-[#FD6603]" />
          Delivery Address
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <FiUser size={13} className="text-gray-400" />
            {address.fullName}
          </div>
          <div className="flex items-center gap-2">
            <FiPhone size={13} className="text-gray-400" />
            {address.phone}
          </div>
          <p className="ml-5 text-gray-500">
            {address.address}, {address.city}, {address.district}
            {address.postalCode ? ` - ${address.postalCode}` : ""}
          </p>
          {address.notes && (
            <p className="ml-5 text-gray-400 italic">Note: {address.notes}</p>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-3">
          Order Items ({items.length})
        </h3>
        <div className="space-y-2">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 line-clamp-1 flex-1 mr-4">
                {product.name} × {quantity}
              </span>
              <span className="font-semibold text-gray-900">
                ৳{(product.price * quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <hr className="my-3 border-gray-100" />
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>৳{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <h3 className="font-semibold text-gray-800 text-sm mb-3">
          Payment Method
        </h3>
        <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-[#FD6603] bg-[#FD6603]/5">
          <div className="w-5 h-5 rounded-full border-2 border-[#FD6603] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FD6603]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Cash on Delivery</p>
            <p className="text-xs text-gray-500">Pay when your order arrives</p>
          </div>
          <span className="ml-auto text-[10px] font-bold text-[#FD6603] bg-[#FD6603]/10 px-2 py-0.5 rounded-full">
            Only Option
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-xl text-sm hover:border-gray-300 transition-all"
        >
          <FiArrowLeft size={15} /> Back
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          className="flex-1 flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] disabled:opacity-70 text-white font-semibold py-3 rounded-xl text-sm transition-all active:scale-95"
        >
          {placing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Placing Order...
            </>
          ) : (
            <>
              <FiCheck size={15} /> Place Order (Cash on Delivery)
            </>
          )}
        </button>
      </div>
    </div>
  );
}

