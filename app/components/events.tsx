"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { events } from "../data/eventsWorkshopsSection";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import EventModal from "./EventModal";
import Button from "./Button";

const AUTO_INTERVAL = 4000; // ms between auto-advances

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Update screen size state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = isMobile ? events.length - 1 : Math.max(0, events.length - 3);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, AUTO_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isMobile, maxIndex]);

  return (
    <section className="py-10 overflow-hidden">
      <div className="md:max-w-[1395px] md:mx-auto px-4 md:px-8 relative">

        {/* Heading + Contact Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
          <h2 className="text-4xl md:text-5xl text-primary font-primary">
            Events and Workshops
          </h2>

          <Button
            variant="primary"
            className="text-base md:text-lg py-3 px-6 shadow-md hover:scale-105 transition-transform"
            onClick={() => setIsEventModalOpen(true)}
            suppressHydrationWarning
          >
            Contact for events and workshops
          </Button>
        </div>

        {/* Event Modal */}
        <EventModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
        />

        {/* Carousel Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#E5A24A] text-white flex items-center justify-center shadow-lg hover:bg-[#d4913b] transition-colors"
            aria-label="Previous slide"
            suppressHydrationWarning
          >
            <LuChevronLeft className="text-2xl" />
          </button>

          {/* Slides Wrapper */}
          <div className="overflow-hidden w-full px-2 md:px-0">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.333)}%)`,
              }}
            >
              {events.map((event: { image: string; title: string; date?: string }, i: number) => (
                <div
                  key={i}
                  className="w-full md:w-1/3 flex-shrink-0 px-2 md:px-4 box-border"
                >
                  <div className="relative h-[460px] md:h-[560px] w-full rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-primary via-primary/70 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end pt-20 p-6">
                      <h3 className="text-white text-xl font-medium font-secondary mb-1">
                        {event.title}
                      </h3>
                      {event.date && (
                        <p className="text-gray-200 text-sm md:text-base">
                          {event.date}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#E5A24A] text-white flex items-center justify-center shadow-lg hover:bg-[#d4913b] transition-colors"
            aria-label="Next slide"
            suppressHydrationWarning
          >
            <LuChevronRight className="text-2xl" />
          </button>

        </div>

        {/* Pagination Dots — shown on all screen sizes */}
        <div className="flex justify-center gap-2 mt-6">
          {events.map((_: unknown, i: number) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i <= maxIndex ? i : maxIndex)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-[#E5A24A] w-6" : "bg-gray-300 w-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              suppressHydrationWarning
            />
          ))}
        </div>

      </div>
    </section>
  );
}
