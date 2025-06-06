"use client"

import { useState } from "react"
import Link from "next/link"

export default function SuccessPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-[390px] h-[844px] bg-white rounded-[60px] shadow-2xl overflow-hidden">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[210px] h-[30px] bg-black rounded-b-[15px] z-20 flex items-center justify-between px-4">
          <span className="text-white text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-[2px]">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-2 bg-white rounded-sm m-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-full pt-[30px] overflow-y-auto overflow-x-hidden">
          {/* Header */}
          <header className="h-[145px] bg-[#242424] relative flex items-center justify-between px-4 sticky top-0 z-10">
            {/* Menu Icon */}
            <div className="w-8 h-8 cursor-pointer relative z-20" onClick={toggleMenu}>
              <div
                className={`absolute w-full h-[3px] bg-[#9480AB] rounded transition-all duration-300 ${isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-2"}`}
              ></div>
              <div
                className={`absolute w-full h-[3px] bg-[#9480AB] rounded transition-all duration-300 ${isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-2"}`}
              ></div>
            </div>

            {/* Fashion Labs Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#9480AB] rounded-sm mb-1 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
                </div>
                <div className="text-white text-xs font-bold">
                  <div>FASHION</div>
                  <div>LABS</div>
                </div>
              </div>
            </div>

            {/* Yonder Text */}
            <div className="text-white text-lg font-light tracking-wider">yonder</div>
          </header>

          {/* Navigation Menu Overlay */}
          <div
            className={`fixed inset-0 bg-black z-30 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <div className="flex flex-col justify-between h-full pt-32 pb-12 px-8">
              <nav className="text-center">
                <ul className="space-y-8">
                  <li>
                    <Link
                      href="#"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      MEELOOPDAG
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      PROGRAMMA
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      MODESHOW
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      NIEUWS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      FAVORIETEN
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex justify-center items-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#9480AB] rounded-sm mb-2 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white rounded-sm"></div>
                  </div>
                  <div className="text-white text-sm font-bold">
                    <div>FASHION</div>
                    <div>LABS</div>
                  </div>
                </div>
                <div className="text-white text-lg font-light tracking-wider">yonder</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-white">
            {/* Success Message */}
            <div className="flex flex-col items-center justify-center px-8 py-20">
              <h1 className="text-3xl font-bold mb-8">GELUKT!</h1>
              <p className="text-center text-base leading-relaxed">
                Binnen twee minuten krijg je een bevestegingsmail binnen met alle benodigde informatie en tijden.
              </p>
              <Link
                href="/"
                className="mt-12 bg-black text-white px-12 py-4 text-lg font-bold tracking-wide hover:bg-gray-800 transition-colors"
              >
                HOME
              </Link>
            </div>

            {/* Checkered Pattern */}
            <div
              className="w-full h-10"
              style={{
                backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), 
                                 linear-gradient(-45deg, #000 25%, transparent 25%), 
                                 linear-gradient(45deg, transparent 75%, #000 75%), 
                                 linear-gradient(-45deg, transparent 75%, #000 75%)`,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }}
            ></div>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white px-8 py-8">
              <div className="space-y-6">
                <nav>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <span className="text-[#9480AB] text-xl font-bold mr-3">+</span>
                      <Link href="#" className="text-base hover:underline">
                        Voor studenten
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#9480AB] text-xl font-bold mr-3">+</span>
                      <Link href="#" className="text-base hover:underline">
                        Voor volwassenen
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#9480AB] text-xl font-bold mr-3">+</span>
                      <Link href="#" className="text-base hover:underline">
                        Voor bedrijven
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#9480AB] text-xl font-bold mr-3">+</span>
                      <Link href="#" className="text-base hover:underline">
                        Over FashionLabs
                      </Link>
                    </li>
                  </ul>
                </nav>

                <div className="flex justify-center items-center gap-8 py-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-[#9480AB] rounded-sm mb-2 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white rounded-sm"></div>
                    </div>
                    <div className="text-white text-sm font-bold">
                      <div>FASHION</div>
                      <div>LABS</div>
                    </div>
                  </div>
                  <div className="text-white text-lg font-light tracking-wider">yonder</div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="bg-white text-black px-8 py-3 w-full max-w-xs text-base font-medium hover:bg-gray-100 transition-colors"
                  >
                    Terug naar boven
                  </button>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
