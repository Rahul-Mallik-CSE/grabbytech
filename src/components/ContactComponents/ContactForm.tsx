"use client";

import { useState } from "react";
import { FiSend, FiCheckCircle } from "react-icons/fi";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
        <FiCheckCircle className="text-[#FD6603]" size={48} />
        <h3 className="text-xl sm:text-2xl font-bold text-white">Message Sent Successfully!</h3>
        <p className="text-white/60 text-sm sm:text-base max-w-md">
          Thank you for reaching out to GrabbyTech. We have received your message and will get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#FD6603] text-white font-semibold text-sm hover:bg-[#FD6603]/90 transition-all cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 border border-white/10 rounded-2xl p-6 sm:p-10 space-y-6">
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Send Us a Message</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-white/80">Your Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FD6603] transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-white/80">Your Email</label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FD6603] transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-medium text-white/80">Subject</label>
        <input
          type="text"
          required
          placeholder="How can we help you?"
          className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FD6603] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-medium text-white/80">Message</label>
        <textarea
          required
          rows={5}
          placeholder="Type your message here..."
          className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FD6603] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FD6603] text-white font-semibold text-sm hover:bg-[#FD6603]/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            <span>Send Message</span>
            <FiSend size={16} />
          </>
        )}
      </button>
    </form>
  );
}