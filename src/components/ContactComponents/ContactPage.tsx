import React from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import ContactForm from "@/components/ContactComponents/ContactForm";

export const metadata = {
  title: "Contact Us - GrabbyTech",
  description: "Get in touch with GrabbyTech for smart lifestyle tech and innovative everyday essentials.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Get in <span className="text-[#FD6603]">Touch</span>
        </h1>
        <p className="mt-4 text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Have questions about our products, orders, or smart lifestyle tech? Reach out to us and our support team will get back to you as soon as possible.
        </p>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Contact Information Cards (Left Column) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Address Card */}
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex items-start gap-4 transition-all hover:border-white/20">
              <div className="p-3 bg-[#FD6603]/10 text-[#FD6603] rounded-xl shrink-0">
                <FiMapPin size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">Our Office</h3>
                <p className="mt-1 text-white/60 text-sm leading-relaxed">
                  Tutpara Central Road,<br />
                  Khulna, Bangladesh
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex items-start gap-4 transition-all hover:border-white/20">
              <div className="p-3 bg-[#FD6603]/10 text-[#FD6603] rounded-xl shrink-0">
                <FiPhone size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">Phone Number</h3>
                <p className="mt-1 text-white/60 text-sm">
                  <a href="tel:+8801951755457" className="hover:text-white transition-colors">
                    +8801951755457
                  </a>
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex items-start gap-4 transition-all hover:border-white/20">
              <div className="p-3 bg-[#FD6603]/10 text-[#FD6603] rounded-xl shrink-0">
                <FiMail size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">Email Address</h3>
                <p className="mt-1 text-white/60 text-sm">
                  <a href="mailto:Contact@grabbytech.com" className="hover:text-white transition-colors">
                    Contact@grabbytech.com
                  </a>
                </p>
              </div>
            </div>

            {/* Support Hours Card */}
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex items-start gap-4 transition-all hover:border-white/20">
              <div className="p-3 bg-[#FD6603]/10 text-[#FD6603] rounded-xl shrink-0">
                <FiClock size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">Working Hours</h3>
                <p className="mt-1 text-white/60 text-sm">
                  Sat - Thu: 9:00 AM - 8:00 PM<br />
                  Friday: Closed
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form Component (Right 2 Columns) */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

        </div>
      </section>
    </div>
  );
}