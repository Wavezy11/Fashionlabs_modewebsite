"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function FashionShowApp() {
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

  return (
  <div className="min-h-screen bg-black flex justify-center items-center overflow-hidden">
      <div className="p-5 bg-black">
        <div className="w-[390px] h-[844px] bg-white rounded-[60px] shadow-[0_0_30px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {/* Screen Content */}
          <div className="screen h-full w-full overflow-y-auto relative">
            {/* Header */}
            <header className="h-[145px] w-full sticky top-0 bg-[#242424] z-50 flex">
              {/* Logo */}
              <div className="absolute left-[38%] top-[22.5%] h-full flex">
                <Image
                  src="/fashionlabs.png"
                  alt="Fashion Labs Logo"
                  width={150}
                  height={150}
                  className="max-h-[100px] max-w-[100px] object-contain mx-autoh"
                />
              </div>

              {/* Yonder - Adjusted positioning */}
       <div className="absolute top-[37%] left-[5%] max-h-[68px] h-full flex items-center justify-center pr-5">
                       <div className="text-white text-lg font-light">
                         <Image
                           src="/Yonder-paars-White.png?height=40&width=120&text=Yonder"
                           alt="Yonder Logo"
                           width={80}
                           height={40}
                           className="max-h-10 max-w-[120px]"
                         />
                       </div>{" "}
                     </div>

              {/* Menu Icon - Adjusted positioning */}
                   <div className="absolute top-[52%] right-[5%] max-h-5 h-full flex items-center justify-center pr-5 z-[60]">
                <div className="relative w-[30px] h-[30px] cursor-pointer" onClick={toggleMenu}>
                  <span
                    className={`absolute w-full h-[3px] bg-[#9480AB] rounded-sm top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
                  ></span>
                  <span
                    className={`absolute w-[3px] h-full bg-[#9480AB] rounded-sm left-1/2 top-0 transform -translate-x-1/2 transition-all duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
                  ></span>
                </div>
              </div>
            </header>

            {/* Navigation Menu Overlay */}
            <div
              className={`absolute top-0 left-0 w-full h-full bg-black z-[55] flex justify-center items-center transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
              <div className="w-full h-full flex flex-col justify-between p-5 pt-[70px] pb-[50px]">
                <ul className="list-none text-center mt-[40px]">
                  {[
                    { name: "HOME", path: "/" },
                    { name: "MEELOOPDAG", path: "/meeloopdag" },
                    { name: "PROGRAMMA", path: "/programma" },
                    { name: "MODESHOW", path: "/modeshow" },
                    { name: "NIEUWS", path: "/nieuws" },
                    { name: "FAVORIETEN", path: "/favorieten" },
                    { name: "CONTACT", path: "/contact" },
                  ].map((item) => (
                    <li key={item.name} className="mb-[30px]">
                      <a
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white no-underline text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors duration-300"
                      >
                        {item.name}
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
                                 className="max-h-[100px] max-w-[100px] object-contain mx-autoh"
                               />
                             </div>
                             <div className="flex items-center justify-center">
                               <Image
                                 src="/Yonder.paars.White.png"
                                 alt="Yonder Logo"
                                 width={120}
                                 height={40}
                                 className="max-h-10 max-w-[120px]"
                               />
                             </div>
                           </div>
                         </div>
                       </div>

            {/* Main Content */}
            <main className="bg-white">
              {/* Hero Image */}
              <div className="w-full h-48 relative">
                <Image
                  src="/placeholder.svg?height=192&width=390"
                  alt="Digital Fashion Show"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title */}
              <div className="px-6 py-6">
                <h1 className="text-2xl font-bold mb-1 tracking-wide">DIGITAL FASHION</h1>
                <h2 className="text-2xl font-bold tracking-wide">MODESHOW</h2>
              </div>

              {/* Ticket Selection */}
              <div className="px-6 pb-6">
                {/* Standing Tickets */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4">
                      <span className="text-3xl font-bold">{standingTickets}</span>
                      <span className="text-2xl font-bold text-[#9480AB]">+</span>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Staanplaatsen</p>
                      <p className="text-gray-600">€ 10,- per stuk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrementTickets("standing")}
                      className="w-10 h-10 bg-[#9480AB] text-white font-bold text-2xl flex items-center justify-center rounded-full hover:bg-[#8470A0] transition-colors"
                      disabled={standingTickets === 0}
                    >
                      -
                    </button>
                    <button
                      onClick={() => incrementTickets("standing")}
                      className="w-10 h-10 bg-[#9480AB] text-white font-bold text-2xl flex items-center justify-center rounded-full hover:bg-[#8470A0] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Wheelchair Tickets */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4">
                      <span className="text-3xl font-bold">{wheelchairTickets}</span>
                      <span className="text-2xl font-bold text-[#9480AB]">+</span>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Rolstoelplaatsen</p>
                      <p className="text-gray-600">€ 10,- per stuk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrementTickets("wheelchair")}
                      className="w-10 h-10 bg-[#9480AB] text-white font-bold text-2xl flex items-center justify-center rounded-full hover:bg-[#8470A0] transition-colors"
                      disabled={wheelchairTickets === 0}
                    >
                      -
                    </button>
                    <button
                      onClick={() => incrementTickets("wheelchair")}
                      className="w-10 h-10 bg-[#9480AB] text-white font-bold text-2xl flex items-center justify-center rounded-full hover:bg-[#8470A0] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Info */}
                <div className="text-sm text-gray-600 mb-8 leading-relaxed">
                  <p className="mb-2">Prijzen inclusief 3,10 servicekosten.</p>
                  <p>
                    Afhankelijk van de gekozen betaalmethode kunnen er per bestelling betaalkosten van toepassing zijn.
                  </p>
                </div>

                {/* Continue Button */}
                <div className="flex justify-center">
                  <button className="bg-black text-white px-16 py-4 text-lg font-bold tracking-wider hover:bg-gray-800 transition-colors rounded-sm">
                    DOORGAAN
                  </button>
                </div>
              </div>

              {/* Checkered Pattern */}
              <div
                className="w-full h-12"
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
              <footer className="bg-[#1a1a1a] text-white px-6 py-8">
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
                      <div className="text-white text-sm font-bold leading-tight text-center">
                        <div>FASHION</div>
                        <div>LABS</div>
                      </div>
                    </div>
                    <div className="text-white text-lg font-light tracking-wider">yonder</div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="bg-white text-black px-8 py-3 w-full max-w-xs text-base font-medium hover:bg-gray-100 transition-colors rounded-sm"
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
    </div>
  )
}
