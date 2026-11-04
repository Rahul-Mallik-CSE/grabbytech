"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckoutFormData } from "@/types/AllTypes";
import { useCartContext } from "@/context/CartContext";
import {
  FiArrowLeft,
  FiCheck,
  FiMapPin,
  FiCheckCircle,
  FiTruck,
  FiShoppingBag,
} from "react-icons/fi";
import { usePlaceGuestOrderMutation } from "@/redux/features/checkout/checkoutAPI";
import type {
  GuestOrderItem,
  GuestOrderResponse,
} from "@/redux/features/checkout/checkoutAPI";
import OrderDetailsPdf, {
  OrderPdfData,
} from "@/components/CheckoutComponents/OrderDetailsPdf";

interface PaymentStepProps {
  address: CheckoutFormData;
  onBack: () => void;
}

export default function PaymentStep({ address, onBack }: PaymentStepProps) {
  const { items, totalPrice, totalItems, clearCart } = useCartContext();
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<OrderPdfData | null>(null);
  const [placeGuestOrder] = usePlaceGuestOrderMutation();
  const [orderError, setOrderError] = useState("");

  const handlePlaceOrder = async () => {
    if (!items.length) return;
    setPlacing(true);
    setOrderError("");
    try {
      const orderItems: GuestOrderItem[] = items.map(({ product, quantity }) => ({
        product_id: product.id,
        name: product.name,
        quantity,
        unit_price: product.price,
        total_price: product.price * quantity,
      }));
      const response: GuestOrderResponse = await placeGuestOrder({
        guest_name: address.fullName,
        guest_phone: address.phone,
        guest_email: address.email,
        guest_shipping: {
          full_name: address.fullName,
          phone: address.phone,
          division: "DHAKA",
          district: address.district,
          upazila: address.city,
          address_line: address.address,
          postal_code: address.postalCode,
        },
        payment_method: 1,
        items: orderItems,
      }).unwrap();
      const serverOrderId = response.order_number ?? response.order_id ?? response.id;
      setOrderId(serverOrderId ? String(serverOrderId) : "Submitted successfully");
      setOrderData({ response, customer: address, items: orderItems });
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      const errorData =
        typeof error === "object" && error !== null && "data" in error
          ? (error as { data?: unknown }).data
          : undefined;
      const message =
        typeof errorData === "object" && errorData !== null
          ? ("detail" in errorData && typeof errorData.detail === "string"
              ? errorData.detail
              : "message" in errorData && typeof errorData.message === "string"
                ? errorData.message
                : Object.entries(errorData)
                    .map(([field, value]) => `${field}: ${Array.isArray(value) ? value.join(", ") : String(value)}`)
                    .join(" | ") || "The order could not be placed.")
          : "The order could not be placed. Please try again.";
      setOrderError(message);
    } finally {
      setPlacing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 text-center shadow-lg space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/15">
          <FiCheck size={36} />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Order Placed Successfully!
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 mt-2">
            Thank You! Your order has been placed.
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Order ID: <span className="font-mono font-bold text-gray-900">{orderId}</span>
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 text-left text-xs sm:text-sm text-gray-700 space-y-2 border border-gray-200/60">
          <div className="flex items-center gap-2 font-semibold text-gray-900 pb-2 border-b border-gray-200">
            <FiTruck className="text-[#FD6603]" />
            <span>Cash on Delivery Confirmation</span>
          </div>
          <p>
            <b className="text-gray-900">Recipient:</b> {address.fullName} ({address.phone})
          </p>
          <p>
            <b className="text-gray-900">Delivery Address:</b> {address.address}, {address.city}, {address.district}
          </p>
          <p className="text-emerald-700 font-bold pt-1">
            Please pay Tk {totalPrice.toLocaleString()} upon receiving your order.
          </p>
        </div>

        <p className="text-xs text-gray-500">
          Our customer service team will contact you shortly to confirm your delivery schedule.
        </p>

        <div className="pt-2">
          {orderData && (
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <OrderDetailsPdf data={orderData} />
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FD6603] px-8 py-3.5 text-xs font-bold text-white shadow-md shadow-[#FD6603]/30 transition-all hover:bg-[#e55b03] active:scale-95"
              >
                <FiShoppingBag size={16} /> Back to Homepage
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-950">
            Order Review & Payment
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Please verify your delivery details and confirm your order
          </p>
        </div>

        {/* Delivery Address Preview */}
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiMapPin className="text-[#FD6603]" /> Delivery Address
            </span>
            <button
              type="button"
              onClick={onBack}
              className="text-xs text-[#FD6603] font-semibold hover:underline"
            >
              Change
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
              <p className="text-gray-500 italic text-[11px]">Note: {address.notes}</p>
            ) : null}
          </div>
        </div>

        {/* Selected Products Preview */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Order Items ({totalItems} {totalItems === 1 ? "item" : "items"})
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
                    Qty: {quantity} × Tk {product.price.toLocaleString()}
                  </p>
                </div>
                <span className="font-bold text-gray-900 flex-shrink-0">
                  Tk {(product.price * quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="text-emerald-600 font-bold">Free Delivery</span>
          </div>

          <div className="flex items-center justify-between text-base sm:text-lg font-black text-gray-950 pt-1">
            <span>Total Payable:</span>
            <span className="text-[#FD6603]">Tk {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Method - Cash on Delivery */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Payment Method
          </p>
          
          <div className="border-2 border-[#FD6603] bg-[#FD6603]/5 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-[#FD6603] flex items-center justify-center flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FD6603]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-gray-950">
                  Cash on Delivery (COD)
                </span>
                <span className="bg-[#FD6603] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">
                No advance payment required. Pay safely in cash once your package arrives.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {orderError && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
            {orderError}
          </p>
        )}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
          >
            <FiArrowLeft size={16} /> Back to Address
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
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <FiCheckCircle size={18} />
                <span>Confirm Order (Cash on Delivery)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
