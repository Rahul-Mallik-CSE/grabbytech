"use client";

import { useState } from "react";
import { Product } from "@/types/AllTypes";
import { customerReviews } from "@/data/customerReviewData";
import { FiStar, FiX } from "react-icons/fi";
import Image from "next/image";
import { cn } from "cn";

interface ProductDetailTabsProps {
  product: Product;
}

function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={size}
          fill={i < Math.round(rating) ? "#FD6603" : "transparent"}
          className={i < Math.round(rating) ? "text-[#FD6603]" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function ReviewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitReview = async () => {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: product.name, productId: product.id, rating, review, name, email }),
      });
      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(result.error || "Unable to submit your review.");
      setSuccess(result.message || "Your review has been submitted.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit your review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8" onClick={(event) => event.stopPropagation()}>
        <button type="button" aria-label="Close review form" onClick={onClose} className="absolute right-5 top-5 text-gray-500 hover:text-black">
          <FiX size={24} />
        </button>
        <h2 className="mb-6 text-2xl font-light text-gray-800">Write a review</h2>
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
            <Image loading="lazy" src={product.images[0]?.url ?? "/grabbytechLogo.jpg"} alt={product.name} fill className="object-cover" />
          </div>
          <p className="font-medium text-gray-700">{product.name}</p>
        </div>
        <label className="mb-2 block text-sm text-gray-600">Rating</label>
        <div className="mb-6 flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <button type="button" key={index} aria-label={`${index + 1} stars`} onClick={() => setRating(index + 1)}>
              <FiStar size={30} fill={index < rating ? "#FD6603" : "transparent"} className="text-[#FD6603]" />
            </button>
          ))}
        </div>
        <label className="mb-2 block text-sm text-gray-600" htmlFor="review">Review</label>
        <textarea id="review" value={review} onChange={(event) => setReview(event.target.value)} maxLength={2000} placeholder="Share your feedback with us now" className="mb-5 min-h-40 w-full resize-none rounded-lg border border-gray-300 p-4 outline-none focus:border-[#FD6603]" />
        <label className="mb-2 block text-sm text-gray-600" htmlFor="review-name">Your name</label>
        <input id="review-name" value={name} onChange={(event) => setName(event.target.value)} className="mb-5 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#FD6603]" />
        <label className="mb-2 block text-sm text-gray-600" htmlFor="review-email">Your email</label>
        <input id="review-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mb-6 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#FD6603]" />
        {error && <p role="alert" className="mb-4 text-sm text-red-500">{error}</p>}
        {success && <p role="status" className="mb-4 text-sm text-emerald-600">{success}</p>}
        <button type="button" disabled={submitting || !rating || !review.trim() || !name.trim() || !email.trim()} onClick={submitReview} className="w-full rounded-lg bg-gray-900 py-3 font-bold text-white disabled:bg-gray-300">{submitting ? "Submitting..." : "Submit review"}</button>
      </div>
    </div>
  );
}

export default function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specs">("description");
  const [reviewOpen, setReviewOpen] = useState(false);
  const productReviews = customerReviews.slice(0, 2);

  return (
    <div className="mt-8 sm:mt-12">
      <div className="flex items-center gap-6 sm:gap-10 border-b border-gray-200">
        {(["description", "specs"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn("pb-3 text-sm sm:text-base font-bold capitalize border-b-2", activeTab === tab ? "border-black text-black" : "border-transparent text-gray-400")}>
            {tab === "specs" ? "Specifications" : "Description"}
          </button>
        ))}
      </div>
      <div className="py-6">
        {activeTab === "description" ? (
          <div className="prose prose-sm max-w-none rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs sm:p-8" dangerouslySetInnerHTML={{ __html: product.descriptionHtml ?? product.description }} />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xs">
            {[
              ["Model", product.name],
              ["Brand", product.brand || "N/A"],
              ["Category", product.category],
              ["SKU", product.id],
              ["Weight", product.weight || "N/A"],
              ["Warranty", product.warranty || "N/A"],
            ].map(([label, value], index) => (
              <div key={label} className={cn("flex flex-col p-4 text-sm sm:flex-row sm:items-center", index % 2 ? "bg-gray-50/50" : "")}>
                <span className="mb-1 font-bold text-gray-900 sm:mb-0 sm:w-1/3">{label}</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <section className="border-t border-gray-200 pt-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="mt-2 flex items-center gap-3"><Stars rating={product.rating} /><span className="text-sm text-gray-500">{product.rating} ({product.reviewCount} reviews)</span></div>
          </div>
          <button type="button" onClick={() => setReviewOpen(true)} className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white hover:bg-black">Write a review</button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {productReviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full"><Image src={review.avatar} alt={review.name} fill className="object-cover" /></div>
                <div><p className="text-sm font-bold text-gray-900">{review.name}</p><p className="text-[11px] text-gray-500">{review.date}</p></div>
              </div>
              <Stars rating={review.rating} size={14} />
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
      {reviewOpen && <ReviewModal product={product} onClose={() => setReviewOpen(false)} />}
    </div>
  );
}
