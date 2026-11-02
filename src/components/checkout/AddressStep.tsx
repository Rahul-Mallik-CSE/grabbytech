"use client";

import { useState } from "react";
import { CheckoutFormData } from "@/types/AllTypes";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

interface AddressStepProps {
  onNext: (data: CheckoutFormData) => void;
  onBack: () => void;
}

const DISTRICTS = [
  "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna",
  "Barishal", "Rangpur", "Mymensingh",
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
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.phone.match(/^01[3-9]\d{8}$/))
      e.phone = "Enter a valid BD phone number";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.district) e.district = "District is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext(form);
  };

  const field = (
    key: keyof CheckoutFormData,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#FD6603] focus:ring-2 focus:ring-[#FD6603]/20 transition-all"
      />
      {errors[key] && (
        <span className="text-xs text-red-500">{errors[key]}</span>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Delivery Address</h2>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field("fullName", "Full Name *", "text", "Your full name")}
          {field("phone", "Phone Number *", "tel", "01XXXXXXXXX")}
        </div>
        {field("email", "Email (optional)", "email", "you@email.com")}
        {field("address", "Street Address *", "text", "House, road, area...")}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field("city", "City / Thana *", "text", "Your city")}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">District *</label>
            <select
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#FD6603] focus:ring-2 focus:ring-[#FD6603]/20 bg-white transition-all"
            >
              <option value="">Select district</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.district && (
              <span className="text-xs text-red-500">{errors.district}</span>
            )}
          </div>
        </div>
        {field("postalCode", "Postal Code", "text", "1200")}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Order Notes (optional)</label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Any special instructions..."
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#FD6603] focus:ring-2 focus:ring-[#FD6603]/20 resize-none transition-all"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-xl text-sm hover:border-gray-300 transition-all"
        >
          <FiArrowLeft size={15} /> Back
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-semibold py-3 rounded-xl text-sm transition-all active:scale-95"
        >
          Continue to Payment <FiArrowRight size={15} />
        </button>
      </div>
    </form>
  );
}

