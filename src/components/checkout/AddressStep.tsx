"use client";

import { useState } from "react";
import { CheckoutFormData } from "@/types/AllTypes";
import { FiArrowRight, FiArrowLeft, FiMapPin } from "react-icons/fi";

interface AddressStepProps {
  onNext: (data: CheckoutFormData) => void;
  onBack: () => void;
}

const DISTRICTS = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
  "Cumilla",
  "Gazipur",
  "Narayanganj",
  "Bogura",
];

export default function AddressStep({ onNext, onBack }: AddressStepProps) {
  const [form, setForm] = useState<CheckoutFormData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const validate = () => {
    const e: Partial<CheckoutFormData> = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name";
    if (!form.phone.trim()) {
      e.phone = "Please enter your mobile phone number";
    } else if (!form.phone.replace(/[\s-]/g, "").match(/^(?:\+?88)?01[3-9]\d{8}$/)) {
      e.phone = "Please enter a valid 11-digit mobile number (e.g. 017XXXXXXXX)";
    }
    if (!form.address.trim()) e.address = "Please enter your full delivery address";
    if (!form.city.trim()) e.city = "Please enter your area or city";
    if (!form.district) e.district = "Please select your district";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <FiMapPin size={20} className="text-[#FD6603]" />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-950">
              Shipping Address
            </h2>
            <p className="text-xs text-gray-500">
              Where should we deliver your order?
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#FD6603] focus:ring-1 focus:ring-[#FD6603] transition-colors"
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-500 font-medium">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                Mobile Number *
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#FD6603] focus:ring-1 focus:ring-[#FD6603] transition-colors"
              />
              {errors.phone && (
                <p className="text-[11px] text-red-500 font-medium">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-gray-700">
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#FD6603] focus:ring-1 focus:ring-[#FD6603] transition-colors"
            />
          </div>

          {/* Street Address */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-gray-700">
              Full Street Address (House, Road, Area) *
            </label>
            <input
              type="text"
              placeholder="e.g. House # 12, Road # 4, Sector # 7, Uttara"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#FD6603] focus:ring-1 focus:ring-[#FD6603] transition-colors"
            />
            {errors.address && (
              <p className="text-[11px] text-red-500 font-medium">{errors.address}</p>
            )}
          </div>

          {/* District & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                District *
              </label>
              <select
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 outline-none focus:border-[#FD6603] focus:ring-1 focus:ring-[#FD6603] transition-colors cursor-pointer"
              >
                <option value="">Select District</option>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-[11px] text-red-500 font-medium">
                  {errors.district}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                City / Thana / Area *
              </label>
              <input
                type="text"
                placeholder="e.g. Uttara / Gulshan / Dhanmondi"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#FD6603] focus:ring-1 focus:ring-[#FD6603] transition-colors"
              />
              {errors.city && (
                <p className="text-[11px] text-red-500 font-medium">{errors.city}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-gray-700">
              Order Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Any special delivery instructions..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#FD6603] focus:ring-1 focus:ring-[#FD6603] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
          >
            <FiArrowLeft size={16} /> Back to Cart
          </button>

          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-all active:scale-95 shadow-md shadow-[#FD6603]/30 cursor-pointer"
          >
            <span>Continue to Payment</span>
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    </form>
  );
}
