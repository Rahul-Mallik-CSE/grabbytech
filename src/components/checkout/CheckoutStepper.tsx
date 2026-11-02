"use client";

import { CheckoutStep } from "@/types/AllTypes";
import { FiShoppingCart, FiMapPin, FiCreditCard, FiCheck } from "react-icons/fi";
import { cn } from "cn";

const steps: { key: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { key: "cart", label: "কার্ট (Cart)", icon: FiShoppingCart },
  { key: "address", label: "ঠিকানা (Address)", icon: FiMapPin },
  { key: "payment", label: "পেমেন্ট (Payment)", icon: FiCreditCard },
];

const stepOrder: CheckoutStep[] = ["cart", "address", "payment"];

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIdx = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 sm:mb-12">
      {steps.map(({ key, label, icon: Icon }, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;

        return (
          <div key={key} className="flex items-center">
            {/* Step node */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 transition-all",
                  done
                    ? "bg-[#FD6603] border-[#FD6603] text-white shadow-sm"
                    : active
                    ? "border-[#FD6603] text-[#FD6603] bg-white ring-4 ring-[#FD6603]/15 shadow-sm"
                    : "border-gray-300 text-gray-400 bg-white"
                )}
              >
                {done ? <FiCheck size={18} /> : <Icon size={16} />}
              </div>
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-semibold whitespace-nowrap",
                  active
                    ? "text-[#FD6603]"
                    : done
                    ? "text-gray-900"
                    : "text-gray-400"
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-10 sm:w-20 md:w-28 mx-1 sm:mx-2 mb-4 transition-all",
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
