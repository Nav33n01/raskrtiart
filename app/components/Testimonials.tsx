"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { TestimonialsData } from "../data/testimonials";

const AUTO_INTERVAL = 6000; // ms — longer because videos need viewing time

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = TestimonialsData.length;

  const goTo = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((index + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => goTo(currentIndex - 1);
  const nextSlide = () => goTo(currentIndex + 1);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goTo(currentIndex + 1);
    }, AUTO_INTERVAL);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, currentIndex]);

  const slide = TestimonialsData[currentIndex];

  return (
    <section
      className="max-w-[1395px] mx-auto py-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Heading + Navigation */}
      <div className="flex justify-between mb-6 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-primary text-primary">
          WHAT PEOPLE SAY
        </h2>

        <div className="flex gap-5 items-center">
          <LuChevronLeft
            onClick={prevSlide}
            className="text-2xl text-primary hover:cursor-pointer hover:text-[#9C3D14] transition-colors"
          />
          <LuChevronRight
            onClick={nextSlide}
            className="text-2xl text-primary hover:cursor-pointer hover:text-[#9C3D14] transition-colors"
          />
        </div>
      </div>

      {/* Slide — LEFT image + RIGHT video/text — synchronized via single index */}
      <div
        className={`flex justify-center px-4 md:px-8 transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl">

          {/* LEFT — always the slide's image */}
          <div className="relative w-full md:w-1/3 h-[300px] md:h-[480px] rounded-xl overflow-hidden shadow-xl flex-shrink-0">
            <Image
              src={slide.image}
              alt={slide.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top"
            />
          </div>

          {/* RIGHT — video if available, otherwise text testimonial */}
          <div className="w-full md:w-2/3">
            {slide.video ? (
              /* Video testimonial */
              <div className="bg-[#FBF4EC] rounded-xl shadow-xl p-2 h-full">
                <video
                  key={slide.video}
                  className="rounded-lg w-full h-[300px] md:h-[480px] object-cover"
                  controls
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
            ) : (
              /* Text testimonial */
              <div className="bg-[#FBF4EC] rounded-xl shadow-xl p-6 md:p-8 h-full flex flex-col justify-center">
                <p className="text-lg md:text-xl italic text-foreground mb-6 leading-relaxed">
                  &quot;{slide.testimonial}&quot;
                </p>
                <div>
                  <p className="text-lg font-semibold text-primary">{slide.name}</p>
                  {slide.about && (
                    <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: "Futura PT" }}>
                      {slide.about}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6 px-4">
        {TestimonialsData.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-primary w-6" : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
            suppressHydrationWarning
          />
        ))}
      </div>

    </section>
  );
};

export default Testimonials;