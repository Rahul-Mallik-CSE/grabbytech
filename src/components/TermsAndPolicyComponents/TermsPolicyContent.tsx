import React from "react";
import { FiCheckSquare, FiInfo, FiCheckCircle, FiDollarSign, FiShieldOff } from "react-icons/fi";

export default function TermsPolicyContent() {
  const sections = [
    {
      icon: FiCheckSquare,
      title: "General Use",
      content: "By browsing this website or placing an order, you agree to the terms, policies, and operational rules published by GrabbyTech.",
    },
    {
      icon: FiInfo,
      title: "Product Information",
      content: "We try to keep product details, pricing, and availability accurate, but information may change without prior notice.",
    },
    {
      icon: FiCheckCircle,
      title: "Orders and Confirmation",
      content: "An order is considered confirmed only after our team verifies availability and accepts the request for processing.",
    },
    {
      icon: FiDollarSign,
      title: "Pricing and Payments",
      content: "All listed prices, delivery fees, and promotional offers are subject to update based on business and operational needs.",
    },
    {
      icon: FiShieldOff,
      title: "Limitation of Liability",
      content: "GrabbyTech is not responsible for indirect losses caused by delivery delay, misuse of products, or events outside our control.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Terms and <span className="text-[#FD6603]">Conditions</span>
          </h1>
          <p className="mt-4 text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            General terms for browsing, ordering, payment, and use of GrabbyTech services.
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