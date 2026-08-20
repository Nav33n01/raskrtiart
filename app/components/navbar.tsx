"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const pathname = usePathname();
  const router = useRouter();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname !== "/") {
      router.push(`/${id ? `#${id}` : ""}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 bg-primary transition-transform duration-300 py-3 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Raskrti Art"
                width={45}
                height={45}
                className="w-11 h-11 object-contain"
              />
              <span
                className="text-white text-2xl md:text-3xl cursor-pointer"
                style={{ fontFamily: "Mauline" }}
              >
                Raskrti Art
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <ul
              className="hidden lg:flex gap-8 xl:gap-10 text-white text-lg font-book"
              style={{ fontFamily: "Futura PT" }}
            >
              <li className="hover:underline underline-offset-4 cursor-pointer">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>
                  Home
                </a>
              </li>
              <li className="hover:underline underline-offset-4 cursor-pointer">
                <a href="#aboutUs" onClick={(e) => handleSmoothScroll(e, "aboutUs")}>
                  About Us
                </a>
              </li>
              <li className="hover:underline underline-offset-4 cursor-pointer">
                <a href="#courses" onClick={(e) => handleSmoothScroll(e, "courses")}>
                  Courses
                </a>
              </li>
              <li className="hover:underline underline-offset-4 cursor-pointer">
                <a href="#classes" onClick={(e) => handleSmoothScroll(e, "classes")}>
                  Classes
                </a>
              </li>
              <li className="hover:underline underline-offset-4 cursor-pointer">
                <a href="#store" onClick={(e) => handleSmoothScroll(e, "store")}>
                  Store
                </a>
              </li>
              <li className="hover:underline underline-offset-4 cursor-pointer">
                <a href="#gallery" onClick={(e) => handleSmoothScroll(e, "gallery")}>
                  Gallery
                </a>
              </li>
              <li className="hover:underline underline-offset-4 cursor-pointer">
                <a href="#contact-us" onClick={(e) => handleSmoothScroll(e, "contact-us")}>
                  Contact
                </a>
              </li>
            </ul>

            {/* Hamburger Icon (Mobile / Tablet) */}
            <div
              className="lg:hidden text-white cursor-pointer p-1"
              onClick={() => setIsOpen(true)}
              suppressHydrationWarning
            >
              <FiMenu size={30} />
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile / Tablet Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-primary/95 backdrop-blur-md text-white z-[60] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6 pt-8">
          <FiX
            size={36}
            className="cursor-pointer hover:text-gray-200 transition-colors"
            onClick={() => setIsOpen(false)}
            suppressHydrationWarning
          />
        </div>

        <ul
          className="flex flex-col items-center justify-center gap-8 text-2xl h-[70%]"
          style={{ fontFamily: "Futura PT" }}
        >
          <li className="hover:underline underline-offset-4 cursor-pointer">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>
              Home
            </a>
          </li>
          <li className="hover:underline underline-offset-4 cursor-pointer">
            <a href="#aboutUs" onClick={(e) => handleSmoothScroll(e, "aboutUs")}>
              About Us
            </a>
          </li>
          <li className="hover:underline underline-offset-4 cursor-pointer">
            <a href="#courses" onClick={(e) => handleSmoothScroll(e, "courses")}>
              Courses
            </a>
          </li>
          <li className="hover:underline underline-offset-4 cursor-pointer">
            <a href="#classes" onClick={(e) => handleSmoothScroll(e, "classes")}>
              Classes
            </a>
          </li>
          <li className="hover:underline underline-offset-4 cursor-pointer">
            <a href="#store" onClick={(e) => handleSmoothScroll(e, "store")}>
              Store
            </a>
          </li>
          <li className="hover:underline underline-offset-4 cursor-pointer">
            <a href="#gallery" onClick={(e) => handleSmoothScroll(e, "gallery")}>
              Gallery
            </a>
          </li>
          <li className="hover:underline underline-offset-4 cursor-pointer">
            <a href="#contact-us" onClick={(e) => handleSmoothScroll(e, "contact-us")}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
