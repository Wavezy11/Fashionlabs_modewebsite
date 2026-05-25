"use client"

import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = [
    { name: "Voor studenten", path: "/voor-studenten" },
    { name: "Voor volwassenen", path: "/voor-volwassenen" },
    { name: "Voor bedrijven", path: "/voor-bedrijven" },
    { name: "Over FashionLabs", path: "/over-fashionlabs" },
  ]

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 text-white pt-12 pb-8 px-5 lg:px-12 relative w-full mt-auto">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full max-w-screen-xl mx-auto gap-12 lg:gap-0">
        
        {/* Left Side: Links */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
          <ul className="list-none space-y-4">
            {footerLinks.map((item) => (
              <li key={item.name} className="flex items-center group">
                <span className="text-[#9480AB] mr-3 font-bold text-lg transition-transform group-hover:translate-x-1 duration-300">→</span>
                <Link href={item.path} className="text-white/80 hover:text-white transition-colors text-base tracking-wide uppercase font-medium">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Main Logo */}
        <div className="w-full lg:w-1/3 flex justify-center items-center">
          <Link href="/" className="group">
            <Image
              src="/fashionlabs.png"
              alt="Fashion Labs Logo"
              width={180}
              height={180}
              className="max-h-[120px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Right Side: Partner Logo */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end items-center">
          <div className="flex flex-col items-center lg:items-end gap-3">
            <span className="text-white/40 text-xs tracking-widest uppercase font-bold">In samenwerking met</span>
            <a href="https://www.yonder.nl/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/Yonder-paars-White.png"
                alt="Yonder Logo"
                width={140}
                height={50}
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="w-full max-w-screen-xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
        <p>© {new Date().getFullYear()} FashionLabs. Alle rechten voorbehouden.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/voorwaarden" className="hover:text-white transition-colors">Algemene Voorwaarden</Link>
        </div>
      </div>
    </footer>
  )
}
