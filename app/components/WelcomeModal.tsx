"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../utils/supabase";
import { IoClose } from "react-icons/io5";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", query: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Auto-open modal on every site visit / refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // 1-second delay for smooth load
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase is not fully configured in .env.local yet!");
      setTimeout(() => {
        setStatus("success");
      }, 1000);
      return;
    }

    try {
      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name,
          phone: formData.phone,
          course: formData.query || "Website Visitor Inquiry",
        },
      ]);
      if (error) {
        console.error("Supabase Error:", error);
        setStatus("error");
      } else {
        setStatus("success");
        setFormData({ name: "", phone: "", query: "" });
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border border-[#9C3D14]/50 rounded-md p-3 focus:outline-none focus:border-[#9C3D14] focus:ring-1 focus:ring-[#9C3D14] text-base bg-[#FBF4EC]";
  const labelClass = "block text-[#9C3D14] mb-1 font-medium text-base";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Modal Container */}
      <div
        className="relative bg-[#FBF4EC] border-2 border-[#9C3D14] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cancel / Close button on top-right */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-[#9C3D14] hover:text-[#5c2309] bg-white/80 rounded-full p-1.5 shadow-md transition-colors"
          aria-label="Cancel and close form"
          suppressHydrationWarning
        >
          <IoClose className="text-2xl" />
        </button>

        {/* LEFT SIDE — IMAGE */}
        <div className="relative w-full md:w-1/2 h-48 md:h-auto flex-shrink-0">
          <Image
            src="/shweta.jpeg"
            alt="Welcome to Raskrti Art"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-transparent flex items-end p-6">
            <div className="text-white">
              <h4 className="text-2xl font-primary">Raskrti Art School</h4>
              <p className="text-sm font-book text-gray-200" style={{ fontFamily: "Futura PT" }}>
                Welcome to our creative world of fine arts & craft
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-primary text-primary mb-2 text-center md:text-left">
            Welcome to Raskrti Art!
          </h3>
          <p
            className="text-[#323232] mb-6 text-sm md:text-base leading-relaxed text-center md:text-left"
            style={{ fontFamily: "Futura PT" }}
          >
            Fill out your details and we will reach out to you within one day!
          </p>

          {status === "success" ? (
            <div
              className="bg-[#e4ffd4] border border-green-500 text-green-800 p-6 rounded-lg text-center font-medium flex flex-col gap-3"
              style={{ fontFamily: "Futura PT" }}
            >
              <p className="text-lg">Thank you! We will reach out to you within one day.</p>
              <button
                onClick={handleClose}
                className="mt-2 w-full bg-green-700 text-white py-2.5 text-base font-medium cursor-pointer hover:bg-green-800 transition-colors rounded-md"
                suppressHydrationWarning
              >
                Close & Continue Browsing
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              style={{ fontFamily: "Futura PT" }}
              suppressHydrationWarning
            >
              <div>
                <label className={labelClass}>Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  placeholder="Your Name"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                  placeholder="+91 9999999999"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className={labelClass}>What You Want to Know?</label>
                <input
                  type="text"
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                  className={inputClass}
                  placeholder="E.g., Courses, Classes, Artworks..."
                  suppressHydrationWarning
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 w-full bg-[#9C3D14] text-white py-3 text-lg font-medium cursor-pointer hover:bg-[#833310] transition-colors rounded-md disabled:opacity-70"
                suppressHydrationWarning
              >
                {status === "submitting" ? "Submitting..." : "Submit Inquiry"}
              </button>

              {status === "error" && (
                <p className="text-red-600 text-center text-xs mt-1 font-medium">
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
