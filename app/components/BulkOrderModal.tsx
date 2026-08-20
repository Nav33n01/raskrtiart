"use client";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { IoClose } from "react-icons/io5";

interface BulkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  organization: "",
  interest: "",
  quantity: "",
  message: "",
};

export default function BulkOrderModal({ isOpen, onClose }: BulkOrderModalProps) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase is not fully configured in .env.local yet!");
      setTimeout(() => setStatus("success"), 1000);
      return;
    }

    try {
      const { error } = await supabase.from("bulk_orders").insert([formData]);
      if (error) {
        console.error("Supabase Error:", error);
        setStatus("error");
      } else {
        setStatus("success");
        setFormData(INITIAL_FORM);
        setTimeout(() => setStatus("idle"), 60000);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("error");
    }
  };

  const handleChange = (field: keyof typeof INITIAL_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData({ ...formData, [field]: e.target.value });

  const inputClass =
    "w-full border border-[#9C3D14]/50 rounded-md p-3.5 focus:outline-none focus:border-[#9C3D14] focus:ring-1 focus:ring-[#9C3D14] text-base bg-[#FBF4EC]";
  const labelClass = "block text-[#9C3D14] mb-2 font-medium text-base";

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal panel — stop propagation so clicking inside doesn't close */}
      <div
        className="relative bg-[#FBF4EC] border-2 border-[#9C3D14] rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#9C3D14] hover:text-[#5c2309] transition-colors p-1"
          aria-label="Close modal"
          suppressHydrationWarning
        >
          <IoClose className="text-3xl" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-10">
          <h3 className="text-3xl font-primary text-primary mb-3 text-center">
            Bulk Order Enquiry
          </h3>
          <p
            className="text-[#323232] mb-6 text-center text-base leading-relaxed"
            style={{ fontFamily: "Futura PT" }}
          >
            Fill out your details and we will reach out to you within one day!
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-px bg-[#9C3D14]/25" />
            <span className="text-[#9C3D14] text-lg">✦</span>
            <div className="flex-1 h-px bg-[#9C3D14]/25" />
          </div>

          {status === "success" ? (
            <div
              className="bg-[#e4ffd4] border border-green-500 text-green-800 p-8 rounded-lg text-center font-medium flex flex-col gap-4"
              style={{ fontFamily: "Futura PT" }}
            >
              <p className="text-xl">Thank you! We will reach out to you shortly.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 w-full bg-green-700 text-white py-3 text-lg font-medium cursor-pointer hover:bg-green-800 transition-colors rounded-md"
                suppressHydrationWarning
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" style={{ fontFamily: "Futura PT" }} suppressHydrationWarning>

              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input type="text" required value={formData.name} onChange={handleChange("name")} className={inputClass} placeholder="Your Name" suppressHydrationWarning />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={handleChange("phone")} className={inputClass} placeholder="+91 9999999999" suppressHydrationWarning />
                </div>
              </div>

              {/* Row 2: Email + Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" value={formData.email} onChange={handleChange("email")} className={inputClass} placeholder="your@email.com" suppressHydrationWarning />
                </div>
                <div>
                  <label className={labelClass}>Organization / Company</label>
                  <input type="text" value={formData.organization} onChange={handleChange("organization")} className={inputClass} placeholder="Company Name (optional)" suppressHydrationWarning />
                </div>
              </div>

              {/* Row 3: Interest + Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>What Are You Interested In? *</label>
                  <input type="text" required value={formData.interest} onChange={handleChange("interest")} className={inputClass} placeholder="E.g., Tanjore Paintings, Gifts..." suppressHydrationWarning />
                </div>
                <div>
                  <label className={labelClass}>Quantity / No. of Items *</label>
                  <input type="text" required value={formData.quantity} onChange={handleChange("quantity")} className={inputClass} placeholder="E.g., 50 pieces" suppressHydrationWarning />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>Message / Requirements</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={handleChange("message")}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us more about your requirements, customization needs, delivery timeline, etc."
                  suppressHydrationWarning
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 w-full bg-[#9C3D14] text-white py-4 text-xl font-medium cursor-pointer hover:bg-[#833310] transition-colors rounded-md disabled:opacity-70"
                suppressHydrationWarning
              >
                {status === "submitting" ? "Submitting..." : "Send Enquiry"}
              </button>

              {status === "error" && (
                <p className="text-red-600 text-center text-sm mt-1 font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
