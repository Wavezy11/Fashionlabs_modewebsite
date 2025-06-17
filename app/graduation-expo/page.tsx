"use client"

import { useState } from "react"
import { Plus } from 'lucide-react'
import Image from "next/image"

export default function GraduationExpo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToTop = () => {
    const screen = document.querySelector(".screen")
    if (screen) {
      screen.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center overflow-hidden">
      <div className="p-5 bg-black">
        <div className="w-[390px] h-[844px] bg-white rounded-[60px] shadow-[0_0_30px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {/* iPhone Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[210px] h-[30px] bg-black rounded-b-[15px] z-10 flex justify-center items-center">
            <div className="flex justify-between items-center w-full px-2.5 text-white text-xs font-semibold">
              <span className="font-bold">9:41</span>
              <div className="flex items-center gap-0.5">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="screen h-full w-full overflow-y-auto pt-[30px] relative">
            {/* Header */}
            <header className="h-[145px] w-full sticky top-0 bg-[#242424] z-50 flex items-center justify-between px-6">
              {/* Plus Icon - Left */}
              <div className="flex items-center">
                <Plus className="w-6 h-6 text-white" onClick={toggleMenu} />
              </div>

              {/* Fashion Labs Logo - Center */}
              <div className="text-white text-lg font-bold text-center">
                <Image
                  src="/fashionlabs.png"
                  alt="Fashion Labs Logo"
                  width={150}
                  height={150}
                  className="max-h-[100px] max-w-[100px] object-contain mx-auto translate-x-5"
                />
              </div>

              {/* Yonder - Right */}
              <div className="text-white text-lg font-light">
                <Image
                  src="/Yonder-paars-White.png?height=40&width=120&text=Yonder"
                  alt="Yonder Logo"
                  width={80}
                  height={40}
                  className="max-h-10 max-w-[120px]"
                />
              </div>
            </header>

            {/* Navigation Menu Overlay */}
            <div
              className={`absolute top-0 left-0 w-full h-full bg-black z-[55] flex justify-center items-center transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
              <div className="w-full h-full flex flex-col justify-between p-5 pt-[100px] pb-[50px]">
                <ul className="list-none text-center mt-[60px]">
                  {["HOME", "MEELOOPDAG", "PROGRAMMA", "MODESHOW", "NIEUWS", "FAVORIETEN", "CONTACT"].map((item) => (
                    <li key={item} className="mb-[30px]">
                      <a
                        href="/homepagina"
                        className="text-white no-underline text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-center items-center gap-5 mb-10">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/fashionlabs.png"
                      alt="Fashion Labs Logo"
                      width={150}
                      height={150}
                      className="max-h-[100px] max-w-[100px] object-contain mx-auto"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/Yonder-paars-White.png?height=40&width=120&text=Yonder"
                      alt="Yonder Logo"
                      width={120}
                      height={40}
                      className="max-h-10 max-w-[120px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="relative w-full">
              {/* Title */}
              <div className="bg-white text-center py-4">
                <h1 className="text-2xl font-bold text-black">Graduation Expo</h1>
              </div>

              {/* Main Image */}
              <div className="relative w-full">
                <Image
                  src="/placeholder.svg?height=300&width=390&text=Graduation+Expo+Image"
                  alt="Graduation Expo"
                  width={390}
                  height={300}
                  className="w-full h-[300px] object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="bg-[#9480AB] px-6 py-8">
                <p className="text-white text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white p-[30px_20px_20px] relative">
              <div className="flex justify-between max-w-[1200px] mx-auto pb-5">
                <div>
                  <ul className="list-none">
                    {["Voor studenten", "Voor volwassenen", "Voor bedrijven", "Over FashionLabs"].map((item) => (
                      <li key={item} className="mb-[15px] flex items-center">
                        <span className="text-[#9480AB] mr-2.5 font-bold text-lg">+</span>
                        <a href="#" className="text-white no-underline text-base hover:underline">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-end gap-5">
                  <div className="text-white font-bold flex flex-col items-start relative">
                    <span className="text-xl">FASHION</span>
                    <span className="text-xl">LABS++:</span>
                  </div>
                  <div className="text-white text-lg italic">yonder</div>
                </div>
              </div>

              <div className="flex justify-center mt-2.5">
                <button
                  onClick={scrollToTop}
                  className="bg-white text-[#1a1a1a] border-none p-[12px_20px] w-full max-w-[300px] text-center text-base cursor-pointer transition-colors hover:bg-[#f0f0f0]"
                >
                  Terug naar boven
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
