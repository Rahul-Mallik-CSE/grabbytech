"use client";

import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { customerReviews } from "@/data/customerReviewData";

export default function CustomerReviewSection() {
  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-[#FD6603] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FD6603]/10 border border-[#FD6603]/20 mb-3">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950">
            Trusted by Our Customers
          </h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            See what our verified buyers have to say about their experience with GrabbyTech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {customerReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-4 md:p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center gap-1 mb-2 sm:mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      fill={i < review.rating ? "#FD6603" : "transparent"}
                      className={
                        i < review.rating ? "text-[#FD6603]" : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-2 sm:mb-4 italic">
                  "{review.comment}"
                </p>
              </div>
              
              <div className="flex items-center gap-4  border-t border-gray-50">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}