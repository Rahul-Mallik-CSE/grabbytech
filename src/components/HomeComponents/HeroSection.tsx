import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="bg-black relative overflow-hidden min-h-[55vh] md:min-h-[65vh] flex items-center">
      {/* Background gradient blob */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#FD6603]/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#FD6603]/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 text-[#FD6603] border border-[#FD6603]/30 bg-[#FD6603]/10 text-xs font-semibold px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FD6603] animate-pulse" />
            Free Delivery Across Bangladesh
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
            Grab Smarter.{" "}
            <span className="text-[#FD6603]">Live Better.</span>
          </h1>

          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Discover premium gadgets, home tech, and lifestyle accessories — all
            hand-picked for quality, innovation, and everyday value.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all active:scale-95"
            >
              Shop All Products <FiArrowRight size={16} />
            </Link>
            <Link
              href="#featured"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Decorative stats row */}
        <div className="flex flex-wrap gap-8 mt-14 md:mt-20">
          {[
            { value: "500+", label: "Happy Customers" },
            { value: "12+", label: "Product Categories" },
            { value: "4.7★", label: "Average Rating" },
            { value: "Free", label: "Home Delivery" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-white font-bold text-xl">{value}</p>
              <p className="text-white/40 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

