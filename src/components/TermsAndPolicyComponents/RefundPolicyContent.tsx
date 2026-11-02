import React from "react";
import { FiAlertCircle, FiPackage, FiRefreshCw, FiXCircle, FiUserCheck } from "react-icons/fi";

export default function RefundPolicyContent() {
  const sections = [
    {
      icon: FiAlertCircle,
      title: "Return Eligibility",
      content: "Customers should report damaged, defective, or incorrect items as soon as possible after delivery with supporting photos or videos.",
    },
    {
      icon: FiPackage,
      title: "Condition of Returned Items",
      content: "Returned items should remain unused where applicable and include original packaging, accessories, and proof of purchase.",
    },
    {
      icon: FiRefreshCw,
      title: "Refund Process",
      content: "Approved refunds are processed after inspection. The refund timeline may vary depending on the payment method used.",
    },
    {
      icon: FiXCircle,
      title: "Non-Returnable Cases",
      content: "Products damaged by misuse, unauthorized modification, or customer handling after delivery may not qualify for refund or return.",
    },
    {
      icon: FiUserCheck,
      title: "Support Team Review",
      content: "Our team reviews each case individually and may offer replacement, store adjustment, or refund based on the issue reported.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Refund and <span className="text-[#FD6603]">Return</span>
          </h1>
          <p className="mt-4 text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Rules for return requests, replacements, and refund approval.
          </p>
        </div>

        {/* Content List */}
        <div className="space-y-2 md:space-y-4">
          {sections.map((sec, index) => {
            const Icon = sec.icon;
            return (
              <div 
                key={index}
                className="bg-neutral-900 border border-white/10 rounded-2xl p-6 sm:p-8 flex items-start gap-5 transition-all hover:border-white/20"
              >
                <div className="p-3 bg-[#FD6603]/10 text-[#FD6603] rounded-xl shrink-0">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{sec.title}</h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">{sec.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}