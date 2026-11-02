"use client";

import { CheckoutStep } from "@/types/AllTypes";
import { FiShoppingCart, FiMapPin, FiCreditCard, FiCheck } from "react-icons/fi";
import { cn } from "cn";

const steps: { key: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { key: "cart", label: "Cart", icon: FiShoppingCart },
  { key: "address", label: "Address", icon: FiMapPin },
  { key: "payment", label: "Payment", icon: FiCreditCard },
];

const stepOrder: CheckoutStep[] = ["cart", "address", "payment"];

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIdx = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map(({ key, label, icon: Icon }, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        return (
          <div key={key} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                  done
                    ? "bg-[#FD6603] border-[#FD6603] text-white"
                    : active
                    ? "border-[#FD6603] text-[#FD6603] bg-white"
                    : "border-gray-200 text-gray-400 bg-white"
                )}
              >
                {done ? <FiCheck size={16} /> : <Icon size={16} />}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  active ? "text-[#FD6603]" : done ? "text-gray-700" : "text-gray-400"
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-16 sm:w-24 mx-2 mb-5 transition-all",
                  idx < currentIdx ? "bg-[#FD6603]" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

