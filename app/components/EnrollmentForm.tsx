"use client";

import { useState } from "react";
import { supabase } from "../utils/supabase";

interface EnrollmentFormProps {
  /** Title at the top of the form. Defaults to "Enroll Yourself" */
  formTitle?: string;
  /** Override the third field label. Defaults to "Course Interested In" */
  courseLabel?: string;
  /** Override the third field placeholder text */
  coursePlaceholder?: string;
}

export default function EnrollmentForm({
  formTitle = "Enroll Yourself",
  courseLabel = "Course Interested In",
  coursePlaceholder = "E.g., Tanjore Painting",
}: EnrollmentFormProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", course: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase is not fully configured in .env.local yet!");
      setTimeout(() => setStatus("success"), 1000);
      return;
    }

    try {
      const { error } = await supabase.from("leads").insert([formData]);
      if (error) {
        console.error("Supabase Error: ", error);
        setStatus("error");
      } else {
        setStatus("success");
        setFormData({ name: "", phone: "", course: "" });
        setTimeout(() => setStatus("idle"), 60000);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("error");
    }
  };

  return (
    <div
      id="enroll-form"
      className="bg-[#FBF4EC] border-2 border-[#9C3D14] p-8 md:p-10 rounded-lg shadow-xl sticky top-24 w-full max-w-lg mx-auto"
    >
      <h3 className="text-3xl font-primary text-primary mb-3 text-center">
        {formTitle}
      </h3>
      <p
        className="text-[#323232] font-book mb-8 text-center text-lg leading-relaxed"
        style={{ fontFamily: "Futura PT" }}
      >
        Fill out your details and we will reach out to you within one day!
      </p>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-[#9C3D14]/25" />
        <span className="text-[#9C3D14] text-lg">✦</span>
        <div className="flex-1 h-px bg-[#9C3D14]/25" />
      </div>

      {status === "success" ? (
        <div
          className="bg-[#e4ffd4] border border-green-500 text-green-800 p-8 rounded-lg text-center font-medium flex flex-col gap-4"
          style={{ fontFamily: "Futura PT" }}
        >
          <p className="text-xl">Thank you! We have received your details.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 w-full bg-green-700 text-white py-3 text-lg font-medium cursor-pointer hover:bg-green-800 transition-colors rounded-md"
            suppressHydrationWarning
          >
            Submit Another Response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" suppressHydrationWarning>
          <div>
            <label
              className="block text-[#9C3D14] mb-2 font-medium text-lg"
              style={{ fontFamily: "Futura PT" }}
            >
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-[#9C3D14]/50 rounded-md p-3.5 focus:outline-none focus:border-[#9C3D14] focus:ring-1 focus:ring-[#9C3D14] text-base"
              placeholder="Your Name"
              style={{ fontFamily: "Futura PT" }}
              suppressHydrationWarning
            />
          </div>

          <div>
            <label
              className="block text-[#9C3D14] mb-2 font-medium text-lg"
              style={{ fontFamily: "Futura PT" }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-[#9C3D14]/50 rounded-md p-3.5 focus:outline-none focus:border-[#9C3D14] focus:ring-1 focus:ring-[#9C3D14] text-base"
              placeholder="+91 9999999999"
              style={{ fontFamily: "Futura PT" }}
              suppressHydrationWarning
            />
          </div>

          <div>
            <label
              className="block text-[#9C3D14] mb-2 font-medium text-lg"
              style={{ fontFamily: "Futura PT" }}
            >
              {courseLabel}
            </label>
            <input
              type="text"
              required
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full border border-[#9C3D14]/50 rounded-md p-3.5 focus:outline-none focus:border-[#9C3D14] focus:ring-1 focus:ring-[#9C3D14] text-base"
              placeholder={coursePlaceholder}
              style={{ fontFamily: "Futura PT" }}
              suppressHydrationWarning
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 w-full bg-[#9C3D14] text-white py-4 text-xl font-medium cursor-pointer hover:bg-[#833310] transition-colors rounded-md disabled:opacity-70"
            style={{ fontFamily: "Futura PT" }}
            suppressHydrationWarning
          >
            {status === "submitting" ? "Submitting..." : "Submit Details"}
          </button>

          {status === "error" && (
            <p
              className="text-red-600 text-center text-sm mt-2 font-medium"
              style={{ fontFamily: "Futura PT" }}
            >
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
