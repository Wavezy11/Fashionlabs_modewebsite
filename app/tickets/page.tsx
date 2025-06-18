"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function FashionShowTickets() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [standingTickets, setStandingTickets] = useState(0)
  const [wheelchairTickets, setWheelchairTickets] = useState(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const incrementTickets = (type: "standing" | "wheelchair") => {
    if (type === "standing") {
      setStandingTickets(standingTickets + 1)
    } else {
      setWheelchairTickets(wheelchairTickets + 1)
    }
  }

  const decrementTickets = (type: "standing" | "wheelchair") => {
    if (type === "standing" && standingTickets > 0) {
      setStandingTickets(standingTickets - 1)
    } else if (type === "wheelchair" && wheelchairTickets > 0) {
      setWheelchairTickets(wheelchairTickets - 1)
    }
  }

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(".scroll-container")
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center md:p-4 p-0">
      <div className="relative w-full h-full md:w-[390px] md:max-w-[390px] md:h-[90vh] md:max-h-[844px] bg-white md:rounded-[60px] md:shadow-2xl overflow-hidden overscroll-none">
        {/* Screen Content */}
        <div className="scroll-container h-full pt-[0] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-none">
          {/* Header */}
          <header className={`h-[145px] w-full sticky top-0 bg-[#242424] z-50 flex ${isMenuOpen ? "relative" : ""}`}>
            {/* Logo */}
            <div className="absolute left-[40%] top-[22.5%] h-full flex">
              <Image
                src="/fashionlabs.png"
                alt="Fashion Labs Logo"
                width={150}
                height={150}
                className="max-h-[100px] max-w-[100px] object-contain mx-autoh"
              />
            </div>

            {/* Yonder */}
            <div className="absolute top-[40%] left-[7.5%] max-h-[68px] h-full flex items-center justify-center pr-5">
              <div className="text-white text-lg font-light">
                <Image
                  src="/Yonder-paars-White.png?height=40&width=120&text=Yonder"
                  alt="Yonder Logo"
                  width={80}
                  height={40}
                  className="max-h-10 max-w-[120px]"
                />
              </div>
            </div>

            {/* Menu Icon */}
            <div className="absolute top-[55%] right-[7.5%] max-h-5 h-full flex items-center justify-center pr-5 z-[60]">
              <div className="relative w-[30px] h-[30px] cursor-pointer" onClick={toggleMenu}>
                <span
                  className={`absolute w-full h-[5px] bg-[#9480AB] rounded-sm top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
                ></span>
                <span
                  className={`absolute w-[5px] h-full bg-[#9480AB] rounded-sm left-1/2 top-0 transform -translate-x-1/2 transition-all duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
                ></span>
              </div>
            </div>
          </header>

          {/* Navigation Menu Overlay */}
          <div
            className={`absolute top-0 left-0 w-full h-full bg-[#242424] z-[45] flex justify-center items-center transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <div className="w-full h-full flex flex-col justify-center items-center p-5 pt-[180px] pb-[80px]">
              <ul className="list-none text-center">
                {[
                  { name: "HOME", path: "/" },
                  { name: "PROGRAMMA", path: "/programma" },
                  { name: "FASHIONSHOW", path: "/modeshow" },
                  { name: "TAILORSHOW", path: "/TAILERSHOW" },
                  { name: "NIEUWS", path: "/nieuws" },
                  { name: "MOMENTS", path: "/favorieten" },
                  { name: "INFORMATIE", path: "/informatie" },
                  { name: "CONTACT", path: "/contact" },
                ].map((item) => (
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

          {/* Main Content */}
          <main className="bg-white relative">
            {/* Title Section - White Background */}
            <div className="px-6 py-6 text-center bg-white">
              <h1 className="text-2xl font-bold tracking-wide">DIGITAL FASHION</h1>
              <h2 className="text-2xl font-bold tracking-wide">MODESHOW</h2>
            </div>

            {/* Purple Section with Hero Image */}
            <div className="bg-[#B8A5D1] relative px-8 py-8">
              {/* Hero Image */}
              <div className="relative w-full h-[200px] rounded-lg overflow-hidden z-10 mb-4">
                <Image src="/fashion-show-hero.png" alt="Fashion Show Models" fill className="object-cover" />
              </div>

              {/* Decorative Cross SVGs around the image */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-4 left-2 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="16"
                height="16"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-12 left-6 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="18"
                height="18"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2 right-4 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="14"
                height="14"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-8 right-8 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="22"
                height="22"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-4 left-8 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="16"
                height="16"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-8 right-12 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="12"
                height="12"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-20 left-1 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="14"
                height="14"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-16 right-2 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>
            </div>

            {/* White Section with Ticket Selection */}
            <div className="bg-white px-6 py-6">
              {/* Standing Tickets */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 mr-4">
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-bold">
                      {standingTickets > 0 ? "-" : ""}
                    </div>
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-bold">
                      {standingTickets}
                    </div>
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-bold">
                      +
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-black">Staanplaatsen</p>
                    <p className="text-gray-600 text-sm">€ 10,- per stuk</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementTickets("standing")}
                    className="w-8 h-8 bg-black text-white font-bold text-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                    disabled={standingTickets === 0}
                  >
                    -
                  </button>
                  <button
                    onClick={() => incrementTickets("standing")}
                    className="w-8 h-8 bg-black text-white font-bold text-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Wheelchair Tickets */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 mr-4">
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-bold">
                      {wheelchairTickets > 0 ? "-" : ""}
                    </div>
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-bold">
                      {wheelchairTickets}
                    </div>
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-bold">
                      +
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-black">Rolstoelplaatsen</p>
                    <p className="text-gray-600 text-sm">€ 10,- per stuk</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementTickets("wheelchair")}
                    className="w-8 h-8 bg-black text-white font-bold text-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                    disabled={wheelchairTickets === 0}
                  >
                    -
                  </button>
                  <button
                    onClick={() => incrementTickets("wheelchair")}
                    className="w-8 h-8 bg-black text-white font-bold text-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Info */}
              <div className="text-xs text-gray-600 mb-6 leading-relaxed">
                <p className="mb-1">Prijzen inclusief 3,10 servicekosten.</p>
                <p>
                  Afhankelijk van de gekozen betaalmethode kunnen er per bestelling betaalkosten van toepassing zijn.
                </p>
              </div>
            </div>

            {/* Purple Section with Continue Button */}
            <div className="bg-[#B8A5D1] px-6 py-8">
              <div className="flex justify-center">
                <button className="bg-black text-white px-12 py-4 text-lg font-bold tracking-wider hover:bg-gray-800 transition-colors w-full max-w-[280px]">
                  DOORGAAN
                </button>
              </div>
            </div>

            {/* Purple Checkered Pattern */}
            <div className="bg-[#B8A5D1] h-16 relative">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), 
                                   linear-gradient(-45deg, #000 25%, transparent 25%), 
                                   linear-gradient(45deg, transparent 75%, #000 75%), 
                                   linear-gradient(-45deg, transparent 75%, #000 75%)`,
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                }}
              ></div>
            </div>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white p-[20px] relative">
              <div className="flex justify-between items-center w-full pb-5">
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-[#9480AB] mr-2.5 font-bold text-lg">+</span>
                    <span className="text-white text-base">Voor studenten</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-[#9480AB] mr-2.5 font-bold text-lg">+</span>
                    <span className="text-white text-base">Voor volwassenen</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-[#9480AB] mr-2.5 font-bold text-lg">+</span>
                    <span className="text-white text-base">Voor bedrijven</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-[#9480AB] mr-2.5 font-bold text-lg">+</span>
                    <span className="text-white text-base">Over FashionLabs</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-5">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/fashionlabs.png"
                      alt="Fashion Labs Logo"
                      width={150}
                      height={150}
                      className="max-h-[100px] max-w-[100px] object-contain mx-autoh"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/Yonder-paars-White.png?height=40&width=120&text=Yonder"
                      alt="Yonder Logo"
                      width={102.5}
                      height={40}
                      className="max-h-10 max-w-[120px]"
                    />
                  </div>
                </div>
              </div>

              {/* Back to top button - full width at bottom with more rounded corners */}
              <div className="w-full">
                <button
                  onClick={scrollToTop}
                  className="bg-white text-[#1a1a1a] border-none p-4 w-full text-center text-base cursor-pointer transition-colors hover:bg-[#f0f0f0] font-medium rounded-[20px]"
                >
                  Terug naar boven
                </button>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
