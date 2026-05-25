"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "PROGRAMMA", path: "/informatie#programma" },
    { name: "GRADUATION-EXPO", path: "/graduation-expo" },
    { name: "GRADUATION-SHOW", path: "/graduation-show" },
    { name: "FASHION-SHOW", path: "/fashion-show" },
    { name: "TICKETS", path: "/tickets" },
    { name: "MOMENTS", path: "/favorieten" },
    { name: "INFORMATIE", path: "/informatie" },
    { name: "CONTACT", path: "/contact" },
  ]

  return (
    <>
      <header className={`h-20 md:h-24 w-full sticky top-0 bg-[#1a1a1a] z-50 flex items-center justify-between px-4 lg:px-12 border-b border-white/10`}>
        {/* Mobile / Tablet View (< 1024px) */}
        <div className="lg:hidden w-full h-full flex items-center justify-between relative">
          {/* Yonder (Left) */}
          <div className="flex items-center z-10">
            <a href="https://www.yonder.nl/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Yonder-paars-White.png"
                alt="Yonder Logo"
                width={80}
                height={30}
                className="h-6 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>

          {/* Logo (Centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <Link href="/">
              <Image
                src="/fashionlabs.png"
                alt="Fashion Labs Logo"
                width={70}
                height={70}
                className="max-h-[60px] w-auto object-contain drop-shadow-md"
              />
            </Link>
          </div>

          {/* Menu Icon (Right) */}
          <div className="flex items-center z-[60]">
            <button className="relative w-8 h-8 focus:outline-none flex flex-col items-center justify-center gap-1.5" onClick={toggleMenu} aria-label="Toggle Menu">
              <span
                className={`w-8 h-1 bg-[#9480AB] rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`w-8 h-1 bg-[#9480AB] rounded-full transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`w-8 h-1 bg-[#9480AB] rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Desktop View (>= 1024px) */}
        <div className="hidden lg:flex w-full h-full items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/fashionlabs.png"
              alt="Fashion Labs Logo"
              width={100}
              height={100}
              className="max-h-[80px] w-auto object-contain"
            />
          </Link>

          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-white hover:text-[#9480AB] text-sm xl:text-base font-bold tracking-wide transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-shrink-0 flex items-center space-x-6">
            <a href="https://www.yonder.nl/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Yonder-paars-White.png"
                alt="Yonder Logo"
                width={100}
                height={40}
                className="max-h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Menu Overlay (Mobile Only) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#242424] z-[45] flex justify-center items-center transition-all duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="w-full h-full flex flex-col justify-center items-center p-5 pt-[180px] pb-[80px] overflow-y-auto">
          <ul className="list-none text-center">
            {navLinks.map((item) => (
              <li key={item.name} className="mb-[20px]">
                <Link
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white no-underline text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
