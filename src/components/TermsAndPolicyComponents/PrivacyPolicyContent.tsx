import React from "react";
import { FiShield, FiDatabase, FiLock, FiShare2, FiHelpCircle } from "react-icons/fi";

export default function PrivacyPolicyContent() {
  const sections = [
    {
      icon: FiDatabase,
      title: "Information We Collect",
      content: "We may collect your name, phone number, email address, shipping address, and order details when you place an order or contact us.",
    },
    {
      icon: FiShield,
      title: "How We Use Your Information",
      content: "We use your information to process orders, arrange delivery, provide support, and improve our service quality.",
    },
    {
      icon: FiLock,
      title: "Data Protection",
      content: "We take reasonable security measures to protect customer information and limit access to authorized team members only.",
    },
    {
      icon: FiShare2,
      title: "Third-Party Services",
      content: "Payment, shipping, analytics, and communication partners may process limited data only when needed to complete service operations.",
    },
    {
      icon: FiHelpCircle,
      title: "Contact",
      content: "If you have any privacy-related questions, contact our support team before placing your next order.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Privacy <span className="text-[#FD6603]">Policy</span>
          </h1>
          <p className="mt-4 text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            How GrabbyTech collects, uses, and protects customer information.
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