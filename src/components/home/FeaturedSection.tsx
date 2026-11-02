import Link from "next/link";
import {
  FiTruck,
  FiShieldCheck,
  FiHeadphones,
  FiRefreshCw,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const highlights = [
  {
    icon: FiTruck,
    title: "সারা বাংলাদেশে ফ্রি ডেলিভারি",
    desc: "কোনো গোপন চার্জ ছাড়া সারা দেশে ফ্রি হোম ডেলিভারি সুবিধা।",
  },
  {
    icon: FiShieldCheck,
    title: "ক্যাশ অন ডেলিভারি (COD)",
    desc: "পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ নিশ্চিন্তে মূল্য পরিশোধ করুন।",
  },
  {
    icon: FiRefreshCw,
    title: "সহজ রিটার্ন পলিসি",
    desc: "পণ্যে কোনো সমস্যা থাকলে ঝামেলাহীন রিপ্লেসমেন্ট গ্যারান্টি।",
  },
  {
    icon: FiHeadphones,
    title: "২৪/৭ কাস্টমার সাপোর্ট",
    desc: "যেকোনো প্রশ্ন বা তথ্যের জন্য আমাদের টিম সার্বক্ষণিক প্রস্তুত।",
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
            স্মার্ট লাইফস্টাইলের বিশ্বস্ত সঙ্গী
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-3 leading-relaxed">
            আমরা নিশ্চিত করি আন্তর্জাতিক মানের স্মার্ট গ্যাজেট, অথেন্টিক প্রডাক্ট এবং দ্রুততম গ্রাহক সেবা।
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
                <span>অরিজিনাল কোয়ালিটি নিশ্চয়তা</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                আপনার প্রয়োজনীয় গ্যাজেটটি বেছে নিন এখনই
              </h3>
              <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
                সহজ অর্ডার প্রক্রিয়া এবং দ্রুত ডেলিভারি সহ ক্যাশ অন ডেলিভারিতে শপিং করুন আপনার পছন্দের পণ্য।
              </p>
            </div>

            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#FD6603]/30 whitespace-nowrap"
            >
              <span>সকল পণ্য দেখুন</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
