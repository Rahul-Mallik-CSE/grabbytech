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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl font-bold text-white">Checkout</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CheckoutStepper currentStep={step} />

        {step === "cart" && (
          <CartStep onNext={() => setStep("address")} />
        )}

        {step === "address" && (
          <AddressStep
            onNext={(data) => {
              setAddress(data);
              setStep("payment");
            }}
            onBack={() => setStep("cart")}
          />
        )}

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

