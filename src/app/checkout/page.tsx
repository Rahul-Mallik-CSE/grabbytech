"use client";

import { useState } from "react";
import { CheckoutFormData, CheckoutStep } from "@/types/AllTypes";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CartStep from "@/components/checkout/CartStep";
import AddressStep from "@/components/checkout/AddressStep";
import PaymentStep from "@/components/checkout/PaymentStep";

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [address, setAddress] = useState<CheckoutFormData | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-16">
      {/* Checkout Header */}
      <div className="bg-black border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            চেকআউট প্রক্রিয়া (Secure Checkout)
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            সহজ ৩টি ধাপে ক্যাশ অন ডেলিভারিতে অর্ডার সম্পন্ন করুন
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Visual Stepper */}
        <CheckoutStepper currentStep={step} />

        {/* Step 1: Cart */}
        {step === "cart" && (
          <CartStep onNext={() => setStep("address")} />
        )}

        {/* Step 2: Address */}
        {step === "address" && (
          <AddressStep
            onNext={(data) => {
              setAddress(data);
              setStep("payment");
            }}
            onBack={() => setStep("cart")}
          />
        )}

        {/* Step 3: Payment */}
        {step === "payment" && address && (
          <PaymentStep
            address={address}
            onBack={() => setStep("address")}
          />
        )}
      </div>
    </div>
  );
}
