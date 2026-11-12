"use client";

import Image from "next/image";
import { classEnrollRedirect, slugify } from "../utils/whatsappRedirect";

interface ClassCardProps {
  thumbnail: string;
  className: string;
  ageGroup: string;
  fee: number;
  totalClasses: number;
  days: string;
  timings: string;
  materials?: string;
  onEnroll?: (className: string) => void;
}

export default function ClassCard({
  thumbnail,
  className,
  ageGroup,
  fee,
  totalClasses,
  days,
  timings,
  materials,
  onEnroll,
}: ClassCardProps) {
  const classSlug = slugify(className);

  return (
    <div id={`class-${classSlug}`} className="max-w-7xl h-fit w-full bg-[#FBF4EC] flex flex-col p-4 md:p-0 scroll-mt-28">

      {/* Image */}
      <div className="relative overflow-hidden w-full h-[244px] mb-3">
        <Image
          src={thumbnail}
          alt={className}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        <div>
          <h3
            className="text-2xl md:text-[24px] text-[#323232] font-medium uppercase mb-2"
            style={{ fontFamily: "Futura PT" }}
          >
            {className}
          </h3>
          <div className="flex gap-3">
            <span className="border border-[#9C3D14] text-[#9C3D14] text-sm px-3 py-1 rounded-full w-fit ">
              {days}
            </span>
            {materials && <span className="border border-[#9C3D14] text-[#9C3D14] text-sm px-3 py-1 rounded-full w-fit ">
              {materials}
            </span>}
          </div>

          <div className="md:space-y-1 mt-2">
            <p className="text-[18px] text-[#323232] font-book flex justify-between" style={{ fontFamily: "Futura PT" }}>
              <span>Age Group:</span>
              <span className="font-medium">{ageGroup}</span>
            </p>
            <p className="text-[18px] text-[#323232] font-book flex justify-between" style={{ fontFamily: "Futura PT" }}>
              <span>Total Classes:</span>
              <span className="font-medium">{totalClasses}</span>
            </p>
            <p className="text-[18px] text-[#323232] font-book flex justify-between" style={{ fontFamily: "Futura PT" }}>
              <span>Timings:</span>
              <span className="font-medium">{timings}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4">
          <div className="flex items-center justify-end mb-3">
            <span
              className="text-[#9C3D14] text-xl font-bold"
              style={{ fontFamily: "Microsoft Sans Serif" }}
            >
              ₹ {fee.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-2 w-full mt-2">
            <button
              onClick={() => {
                if (onEnroll) {
                  onEnroll(className);
                } else {
                  const form = document.getElementById("class-enroll-form");
                  if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="w-full bg-[#9C3D14] text-white py-2 text-lg cursor-pointer hover:bg-[#833310] transition-colors"
              style={{ fontFamily: "Futura PT" }}
              suppressHydrationWarning
            >
              Enroll Yourself
            </button>
            <button
              onClick={() =>
                window.open(
                  classEnrollRedirect({
                    classLink: typeof window !== "undefined" ? `${window.location.origin}/#class-${classSlug}` : "",
                    className,
                    ageGroup,
                    days,
                    timings,
                    fee,
                  }),
                  "_blank"
                )
              }
              className="w-full border-2 border-[#9C3D14] text-[#9C3D14] py-2 text-lg cursor-pointer hover:bg-[#9C3D14] hover:text-white transition-colors"
              style={{ fontFamily: "Futura PT" }}
              suppressHydrationWarning
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
