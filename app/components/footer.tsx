"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LuFacebook, LuInstagram } from "react-icons/lu";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push(`/${id ? `#${id}` : ""}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-primary">

      {/* top row */}
      <div className="md:max-w-7xl mx-auto px-4 md:px-16 text-white flex flex-col lg:flex-row justify-between py-12 gap-10">
        
        {/* Logo & Brand */}
        <div className="flex-shrink-0">
          <Link href="/">
            <div className="flex gap-3 items-center">
              <Image
                src="/logo.png"
                alt="Raskrti Art"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <span
                className="text-[32px] font-regular"
                style={{ fontFamily: "Mauline" }}
              >
                Raskrti Art
              </span>
            </div>
          </Link>
          <p className="text-white/80 text-sm mt-3 max-w-xs font-book" style={{ fontFamily: "Futura PT" }}>
            Nurturing creativity and artistic excellence through traditional & contemporary art.
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 flex-1 lg:ml-12">

          {/* Courses Section */}
          <div>
            <h4
              className="mb-4 text-[20px] font-medium text-white hover:underline cursor-pointer"
              style={{ fontFamily: "Futura PT" }}
            >
              <a href="#courses" onClick={(e) => handleSmoothScroll(e, "courses")}>
                Courses
              </a>
            </h4>
            <ul
              className="space-y-2 text-[16px] md:text-[18px] font-book text-white/90"
              style={{ fontFamily: "Futura PT" }}
            >
              <li>
                <a href="#courses" onClick={(e) => handleSmoothScroll(e, "courses")} className="hover:underline">
                  Tanjour Painting
                </a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleSmoothScroll(e, "courses")} className="hover:underline">
                  Fabric Painting
                </a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleSmoothScroll(e, "courses")} className="hover:underline">
                  Madhubani Painting
                </a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleSmoothScroll(e, "courses")} className="hover:underline">
                  Relief Art Work
                </a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleSmoothScroll(e, "courses")} className="hover:underline">
                  Pichwai Art
                </a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleSmoothScroll(e, "courses")} className="hover:underline">
                  Fine Art (Diploma)
                </a>
              </li>
            </ul>
          </div>

          {/* Classes Section */}
          <div>
            <h4
              className="mb-4 text-[20px] font-medium text-white hover:underline cursor-pointer"
              style={{ fontFamily: "Futura PT" }}
            >
              <a href="#classes" onClick={(e) => handleSmoothScroll(e, "classes")}>
                Classes
              </a>
            </h4>
            <ul
              className="space-y-2 text-[16px] md:text-[18px] font-book text-white/90"
              style={{ fontFamily: "Futura PT" }}
            >
              <li>
                <a href="#classes" onClick={(e) => handleSmoothScroll(e, "classes")} className="hover:underline">
                  Tanjour Painting
                </a>
              </li>
              <li>
                <a href="#classes" onClick={(e) => handleSmoothScroll(e, "classes")} className="hover:underline">
                  Resin Art (Basic)
                </a>
              </li>
              <li>
                <a href="#classes" onClick={(e) => handleSmoothScroll(e, "classes")} className="hover:underline">
                  Clay Art
                </a>
              </li>
              <li>
                <a href="#classes" onClick={(e) => handleSmoothScroll(e, "classes")} className="hover:underline">
                  Acrylic Colour
                </a>
              </li>
              <li>
                <a href="#classes" onClick={(e) => handleSmoothScroll(e, "classes")} className="hover:underline">
                  Portrait Making
                </a>
              </li>
              <li>
                <a href="#classes" onClick={(e) => handleSmoothScroll(e, "classes")} className="hover:underline">
                  Soft Pastel
                </a>
              </li>
            </ul>
          </div>

          {/* Artworks Section */}
          <div>
            <h4
              className="mb-4 text-[20px] font-medium text-white hover:underline cursor-pointer"
              style={{ fontFamily: "Futura PT" }}
            >
              <a href="#store" onClick={(e) => handleSmoothScroll(e, "store")}>
                Artworks
              </a>
            </h4>
            <ul
              className="space-y-2 text-[16px] md:text-[18px] font-book text-white/90"
              style={{ fontFamily: "Futura PT" }}
            >
              <li>
                <a href="#store" onClick={(e) => handleSmoothScroll(e, "store")} className="hover:underline">
                  Buy Artworks
                </a>
              </li>
              <li>
                <a href="#store" onClick={(e) => handleSmoothScroll(e, "store")} className="hover:underline">
                  Buy Miniature Artworks
                </a>
              </li>
              <li>
                <a href="#store" onClick={(e) => handleSmoothScroll(e, "store")} className="hover:underline">
                  Rajasthani Miniature
                </a>
              </li>
              <li>
                <a href="#store" onClick={(e) => handleSmoothScroll(e, "store")} className="hover:underline">
                  Tanjour Artworks
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h4
              className="mb-4 text-[20px] font-medium text-white"
              style={{ fontFamily: "Futura PT" }}
            >
              Social Media
            </h4>
            <ul
              className="space-y-3 text-[16px] md:text-[18px] font-book text-white/90"
              style={{ fontFamily: "Futura PT" }}
            >
              <li>
                <a
                  href="https://www.instagram.com/raskrti/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <LuInstagram className="text-xl" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1DcTKqtgtZ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <LuFacebook className="text-xl" />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="bg-[#53200a] py-3 text-white text-center text-sm md:text-[20px] font-book" style={{ fontFamily: "Futura PT" }}>
        © 2026 Raskrti Art School
      </div>
    </footer>
  );
}
