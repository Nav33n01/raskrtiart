"use client";

import Image from "next/image";
import { courses } from "../data/coursesData";
import { courseEnrollRedirect, slugify } from "../utils/whatsappRedirect";
import EnrollmentForm from "./EnrollmentForm";

export default function CoursesSection() {
  return (
    <section id="courses" className="bg-[#FBF4EC] pt-20">
      <div className="max-w-[1395px] mx-auto h-fit px-5 md:px-8 flex flex-col">
        {/* Heading */}
        <h2 className="text-5xl text-primary mb-12 font-primary">
          Certified Courses
        </h2>

        {/* Grid and Form Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Courses List */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {courses.map((course, index) => {
              const courseSlug = slugify(course.courseName);
              return (
                <div key={index} id={`course-${courseSlug}`} className="flex flex-col h-full gap-2 scroll-mt-28">
                  {/* Image */}
                  <div className="relative overflow-hidden h-90 w-full">
                    <Image
                      src={course.thumbnail}
                      alt={course.courseName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 right-2 bg-[#ffffff] text-[#9C3D14] text-sm px-2 py-1 rounded-full">
                      Age Group: {course.ageGroup}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      {/* Title */}
                      <h3
                        className="text-2xl md:text-[24px] text-[#323232] font-medium"
                        style={{ fontFamily: "Futura PT" }}
                      >
                        {course.courseName}
                      </h3>

                      <h4 className="text-[16px] text-[#9C3D14] font-medium mb-2">{course.classType && course.classType}</h4>

                      <div className="flex gap-3 mb-2">
                        <span className="border border-[#9C3D14] text-[#9C3D14] text-sm px-3 py-1 rounded-full w-fit">
                          {course.days}
                        </span>
                        {course.materials && (
                          <span className="border border-[#9C3D14] text-[#9C3D14] text-sm px-3 py-1 rounded-full w-fit">
                            {course.materials}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="md:mt-3">
                      <div className="md:space-y-1">
                        <p className="text-[18px] text-[#323232] font-book flex justify-between" style={{ fontFamily: "Futura PT" }}>
                          <span>Total Classes:</span>
                          <span className="font-medium">{course.totalClasses}</span>
                        </p>
                        <p className="text-[18px] text-[#323232] font-book flex justify-between" style={{ fontFamily: "Futura PT" }}>
                          <span>Timings:</span>
                          <span className="font-medium">{course.timings}</span>
                        </p>
                      </div>
                      <div className="flex items-center justify-end my-3">
                        <span
                          className="text-[#9C3D14] text-xl font-bold"
                          style={{ fontFamily: "Microsoft Sans Serif" }}
                        >
                          ₹ {course.fee.toLocaleString()}
                        </span>
                      </div>
                      {/* Buttons */}
                      <div className="flex flex-col gap-2 w-full mt-2">
                        <button
                          onClick={() => {
                            const form = document.getElementById("enroll-form");
                            if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          className="w-full bg-[#9C3D14] text-white py-2 text-lg font-medium cursor-pointer hover:bg-[#833310] transition-colors"
                          style={{ fontFamily: "Futura PT" }}
                          suppressHydrationWarning
                        >
                          Enroll Yourself
                        </button>
                        <button
                          onClick={() =>
                            window.open(
                              courseEnrollRedirect({
                                courseLink: typeof window !== "undefined" ? `${window.location.origin}/#course-${courseSlug}` : "",
                                courseName: course.courseName,
                                ageGroup: course.ageGroup,
                                days: course.days,
                                timings: course.timings,
                                fee: course.fee,
                              }),
                              "_blank"
                            )
                          }
                          className="w-full border-2 border-[#9C3D14] text-[#9C3D14] py-2 text-lg font-medium cursor-pointer hover:bg-[#9C3D14] hover:text-white transition-colors"
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
            })}
          </div>

          {/* Form */}
          <div className="lg:w-1/3 w-full lg:sticky lg:top-24 mt-10 lg:mt-0">
            <EnrollmentForm />
          </div>

        </div>
      </div>
    </section>
  );
}
