"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../utils/supabase";

interface EnrollmentFormProps {
  /** HTML element ID for scrolling. Defaults to "enroll-form" */
  id?: string;
  /** Title at the top of the form. Defaults to "Enroll Yourself" */
  formTitle?: string;
  /** Override the third field label. Defaults to "Course Interested In" */
  courseLabel?: string;
  /** Override the third field placeholder text */
  coursePlaceholder?: string;
  /** Initial course or class name passed from card */
  defaultCourse?: string;
  /** Auto-focus the name field on mount */
  autoFocus?: boolean;
  /** Flash a highlight animation on mount */
  autoHighlight?: boolean;
}

export default function EnrollmentForm({
  id = "enroll-form",
  formTitle = "Enroll Yourself",
  courseLabel = "Course Interested In",
  coursePlaceholder = "E.g., Tanjour Painting",
  defaultCourse = "",
  autoFocus = false,
  autoHighlight = false,
}: EnrollmentFormProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", course: defaultCourse });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isHighlighted, setIsHighlighted] = useState(autoHighlight);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      nameInputRef.current?.focus();
    }
    if (autoHighlight) {
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [autoFocus, autoHighlight]);

  const handleReset = () => {
    setFormData({ name: "", phone: "", course: "" });
    setStatus("idle");
    setIsHighlighted(false);
  };

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
      id={id}
      className={`bg-[#FBF4EC] border-2 border-[#9C3D14] p-8 md:p-10 rounded-lg shadow-xl sticky top-24 w-full max-w-lg mx-auto transition-all duration-300 scroll-mt-28 ${
        isHighlighted ? "ring-4 ring-[#9C3D14]/50 scale-[1.01]" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-3xl font-primary text-primary text-center flex-1">
          {formTitle}
        </h3>
      </div>
      <p
        className="text-[#323232] font-book mb-6 text-center text-lg leading-relaxed"
        style={{ fontFamily: "Futura PT" }}
      >
        Fill out your details and we will reach out to you within one day!
      </p>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-[#9C3D14]/25" />
        <span className="text-[#9C3D14] text-lg">✦</span>
        <div className="flex-1 h-px bg-[#9C3D14]/25" />
      </div>

      {/* Selected item pill & Reset button */}
      {(formData.course || formData.name || formData.phone || status !== "idle") && (
        <div className="flex items-center justify-between gap-2 mb-5 text-sm" style={{ fontFamily: "Futura PT" }}>
          {formData.course ? (
            <span className="inline-flex items-center gap-1.5 bg-[#9C3D14]/10 border border-[#9C3D14]/30 text-[#9C3D14] px-2.5 py-1 rounded-full text-xs font-medium">
              Selected: <strong className="truncate max-w-[180px]">{formData.course}</strong>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, course: "" }))}
                className="hover:text-[#53200a] ml-1 text-sm font-bold cursor-pointer"
                title="Remove selection"
              >
                ×
              </button>
            </span>
          ) : <span />}

          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-[#9C3D14] hover:text-[#53200a] hover:underline cursor-pointer ml-auto flex items-center gap-1"
            title="Reset form fields"
          >
            ↻ Reset form
          </button>
        </div>
      )}

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
              ref={nameInputRef}
              name="name"
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
              name="phone"
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
              name="course"
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
