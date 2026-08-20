"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const row1Images = [
  "/gallery/1.jpeg",
  "/gallery/2.jpeg",
  "/gallery/3.jpeg",
  "/gallery/4.jpeg",
  "/gallery/5.jpeg",
  "/gallery/6.jpeg",
  "/gallery/7.jpeg",
  "/gallery/8.jpeg",
  "/gallery/9.jpg",
  "/gallery/10.jpeg",
  "/gallery/11.jpeg",
  "/gallery/12.jpg",
  "/gallery/13.jpeg",
  "/gallery/14.jpg",
  "/gallery/15.jpeg",
  "/gallery/16.jpeg",
  "/gallery/17.jpeg",
  "/gallery/18.jpg",
  "/gallery/19.jpeg",
  "/gallery/20.jpeg",
  "/gallery/21.jpeg",
  "/gallery/22.jpg",
  "/gallery/23.jpg",
  "/gallery/24.jpg",
  "/gallery/25.jpg",
  "/gallery/26.jpg",
];

const row2Images = [
  "/gallery/27.jpg",
  "/gallery/28.jpg",
  "/gallery/29.jpg",
  "/gallery/30.jpg",
  "/gallery/31.jpg",
  "/gallery/32.jpg",
  "/gallery/33.jpg",
  "/gallery/34.jpg",
  "/gallery/35.jpg",
  "/gallery/36.jpg",
  "/gallery/37.jpg",
  "/gallery/38.jpg",
  "/gallery/39.jpeg",
  "/gallery/40.jpeg",
  "/gallery/41.jpeg",
  "/gallery/42.jpeg",
  "/gallery/43.jpeg",
  "/gallery/44.jpeg",
  "/gallery/45.jpeg",
  "/gallery/46.jpeg",
  "/gallery/47.jpeg",
  "/gallery/48.jpeg",
  "/gallery/49.jpeg",
  "/gallery/50.jpeg",
  "/gallery/51.jpeg",
  "/gallery/52.jpeg",
];

export default function ArtGallery() {
  const [drag, setDrag] = useState<{ row: 1 | 2; startX: number; scrollLeft: number; moved: boolean } | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxSrc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxSrc]);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleMouseDown = (e: React.MouseEvent, row: 1 | 2) => {
    const scrollContainer = row === 1 ? row1Ref.current : row2Ref.current;
    if (!scrollContainer) return;
    setDrag({ row, startX: e.pageX, scrollLeft: scrollContainer.scrollLeft, moved: false });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drag) return;
    const scrollContainer = drag.row === 1 ? row1Ref.current : row2Ref.current;
    if (!scrollContainer) return;
    const distance = e.pageX - drag.startX;
    if (Math.abs(distance) > 4) {
      setDrag((d) => d ? { ...d, moved: true } : d);
    }
    scrollContainer.scrollLeft = drag.scrollLeft - distance;
  };

  const handleMouseUp = () => setDrag(null);

  const handleImageClick = (src: string) => {
    // Only open lightbox if user wasn't dragging
    if (!drag?.moved) {
      setLightboxSrc(src);
    }
  };

  const handleTouchStart = (e: React.TouchEvent, row: 1 | 2) => {
    const scrollContainer = row === 1 ? row1Ref.current : row2Ref.current;
    if (!scrollContainer) return;
    setDrag({ row, startX: e.touches[0].pageX, scrollLeft: scrollContainer.scrollLeft, moved: false });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!drag) return;
    const scrollContainer = drag.row === 1 ? row1Ref.current : row2Ref.current;
    if (!scrollContainer) return;
    const currentX = e.touches[0].pageX;
    const distance = currentX - drag.startX;
    scrollContainer.scrollLeft = drag.scrollLeft - distance;
  };

  return (
    <section id="gallery" className="bg-[#FBF4EC] py-10 overflow-hidden py-20">
      <div className="md:max-w-[1395px] md:mx-auto px-4 md:px-16">

        <h2 className="text-3xl md:text-5xl text-[#9C3D14] mb-10 font-primary">
          Raskrti Art Gallery
        </h2>

        {/* ROW 1 – Right to Left */}
        <div
          ref={row1Ref}
          className="h-[230px] md:h-[300px] overflow-hidden mb-6 cursor-grab active:cursor-grabbing touch-pan-y"
          onMouseDown={(e) => handleMouseDown(e, 1)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={(e) => handleTouchStart(e, 1)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ userSelect: "none" }}
        >
          <div className="flex gap-6 animate-marquee-left w-max">
            {row1Images.concat(row1Images).map((src, index) => (
              <div
                key={`row1-${index}`}
                className="relative h-[230px] md:h-[300px] w-[220px] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#9C3D14] transition-all duration-200"
                onClick={() => handleImageClick(src)}
              >
                <Image
                  src={src}
                  alt="Gallery artwork"
                  fill
                  sizes="220px"
                  draggable={false}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2 – Left to Right */}
        <div
          ref={row2Ref}
          className="h-[230px] md:h-[300px] overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
          onMouseDown={(e) => handleMouseDown(e, 2)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={(e) => handleTouchStart(e, 2)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ userSelect: "none" }}
        >
          <div className="flex gap-6 animate-marquee-right w-max">
            {row2Images.concat(row2Images).map((src, index) => (
              <div
                key={`row2-${index}`}
                className="relative h-[230px] md:h-[300px] w-[220px] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#9C3D14] transition-all duration-200"
                onClick={() => handleImageClick(src)}
              >
                <Image
                  src={src}
                  alt="Gallery artwork"
                  fill
                  sizes="220px"
                  quality={80}
                  draggable={false}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <style jsx global>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }

          .animate-marquee-left {
            animation: marquee-left 100s linear infinite;
          }

          .animate-marquee-right {
            animation: marquee-right 100s linear infinite;
          }

          .animate-marquee-left:hover,
          .animate-marquee-right:hover {
            animation-play-state: paused;
            cursor: grab;
          }

          .animate-marquee-left:active,
          .animate-marquee-right:active {
            cursor: grabbing;
          }
        `}</style>

      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-50 p-2"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close image"
            suppressHydrationWarning
          >
            <IoClose />
          </button>

          {/* Image container — stops click propagation */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="Gallery artwork enlarged"
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}