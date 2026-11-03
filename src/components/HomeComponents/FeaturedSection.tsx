import Link from "next/link";
import {
  FiTruck,
  FiShield,
  FiHeadphones,
  FiRefreshCw,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const highlights = [
  {
    icon: FiTruck,
    title: "Free Delivery Nationwide",
    desc: "Enjoy 100% free home delivery across Bangladesh with no hidden charges.",
  },
  {
    icon: FiShield,
    title: "Cash on Delivery (COD)",
    desc: "Pay easily at your doorstep only after receiving and inspecting your package.",
  },
  {
    icon: FiRefreshCw,
    title: "Easy 3-Day Replacement",
    desc: "Hassle-free replacement guarantee if you encounter any manufacturer defects.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Dedicated Support",
    desc: "Our customer service team is always available to help with any inquiries.",
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-14 sm:py-20 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-[#FD6603] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FD6603]/10 border border-[#FD6603]/20 mb-3">
            Why GrabbyTech
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Your Trusted Partner in Smart Living
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-3 leading-relaxed">
            We provide high-grade smart tech, 100% authentic products, and swift customer care.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#111111] border border-white/10 hover:border-[#FD6603]/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FD6603]/10 border border-[#FD6603]/25 flex items-center justify-center text-[#FD6603] mb-4">
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-white">
                {title}
              </h3>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Promo CTA Card */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-black border border-white/10 p-6 sm:p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FD6603]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-[#FD6603] text-xs font-bold uppercase tracking-wider mb-2">
                <FiCheckCircle size={15} />
                <span>100% Authentic Quality Guaranteed</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Upgrade Your Everyday Gear Today
              </h3>
              <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Seamless order process, speedy delivery, and secure Cash on Delivery right to your doorstep.
              </p>
            </div>

            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#FD6603]/30 whitespace-nowrap"
            >
              <span>Shop All Products</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
