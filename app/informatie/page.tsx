"use client"

import { useState } from "react"
import Link from "next/link"

export default function InformatiePage() {
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
          {/* Header - Fixed Position */}
          <header className="fixed top-[30px] left-0 right-0 h-[145px] bg-[#242424] flex items-center justify-between px-4 z-10 w-[390px] mx-auto">
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
                <img src="/placeholder.svg?height=32&width=32" alt="Fashion Labs Logo" className="w-8 h-8 mb-1" />
                <img src="/placeholder.svg?height=24&width=60" alt="Fashion Labs Text" className="h-6" />
              </div>
            </div>

            {/* Yonder Logo */}
            <img src="/placeholder.svg?height=18&width=60" alt="Yonder" className="h-[18px]" />
          </header>

          {/* Navigation Menu Overlay */}
          <div
            className={`fixed inset-0 bg-black z-30 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            onClick={toggleMenu}
          >
            <div className="flex flex-col justify-between h-full pt-32 pb-12 px-8" onClick={(e) => e.stopPropagation()}>
              <nav className="text-center">
                <ul className="space-y-8">
                  <li>
                    <Link
                      href="/"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      MEELOOPDAG
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/modeshow"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      MODESHOW
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/informatie"
                      className="text-[#9480AB] text-xl font-bold tracking-wide"
                      onClick={toggleMenu}
                    >
                      INFORMATIE
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/favorieten"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      FAVORIETEN
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex justify-center items-center gap-8">
                <div className="flex flex-col items-center">
                  <img src="/placeholder.svg?height=48&width=48" alt="Fashion Labs Logo" className="w-12 h-12 mb-2" />
                  <img src="/placeholder.svg?height=32&width=80" alt="Fashion Labs Text" className="h-8" />
                </div>
                <img src="/placeholder.svg?height=18&width=60" alt="Yonder" className="h-[18px]" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-white pt-[145px]">
            {/* Title */}
            <h1 className="text-xl font-bold text-center py-5 tracking-wider">INFORMATIE</h1>

            {/* Event Info */}
            <div className="px-6 pb-4">
              <p className="text-sm leading-relaxed mb-6">
                Op 26 juli vindt de tweede editie van Fashion Labs & Looks plaats bij MindLabs in Tilburg, georganiseerd
                door Yonder. Dit event wordt georganiseerd door de Yonder School voor Mode. Studenten van de opleidingen
                Mode en Uiterlijke Verzorging, ICT en Media, en Kunst, Cultuur en Media hebben de inhoud vormgegeven.
                Tijdens de bijeenkomst komen mode, beauty en interactieve technologie samen en zal er worden geshowd,
                gepresenteerd, geëxposeerd en genetwerkt.
              </p>

              {/* Location and Time */}
              <div className="mb-6">
                <p className="font-bold text-sm">MindLabs</p>
                <p className="text-sm">Locomotiefboulevard 101 5041 SE Tilburg</p>
                <p className="font-bold text-sm mt-2">14:30 - 21:30</p>
              </div>

              {/* Program */}
              <h2 className="font-bold text-lg mb-4">PROGRAMMA</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">14:30</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">TexLab expo</p>
                        <p className="text-xs text-gray-600">'t Hart / Vide - 2e jaars mode</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">15:00</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Demo's</p>
                        <p className="text-xs text-gray-600">Overal - kappers demo's</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">15:30</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Pitches Texlab</p>
                        <p className="text-xs text-gray-600">Vide</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">16:00</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Chat GPT</p>
                        <p className="text-xs text-gray-600">Forum - Roel Mathijsen?</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">16:30</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Demo's</p>
                        <p className="text-xs text-gray-600">Overal</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">17:30</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Fashionshow & Prijsuitrijking 1</p>
                        <p className="text-xs text-gray-600">'t Hart</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">18:00</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">AI talk</p>
                        <p className="text-xs text-gray-600">Forum - Elmo Mistiaen</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">19:00</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Netwerkborrel</p>
                        <p className="text-xs text-gray-600">Horeca bar</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">19:30</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Graduation expo</p>
                        <p className="text-xs text-gray-600">'t Hart</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">20:00</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Graduation talk</p>
                        <p className="text-xs text-gray-600">Forum ?</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="font-bold text-sm mr-3 min-w-[45px]">20:40</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Graduation show Prijsuitrijking 2</p>
                        <p className="text-xs text-gray-600">'t Hart</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#9480AB] text-xl font-bold ml-3">+</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mb-6">
                <button className="bg-black text-white px-6 py-3 text-sm font-bold">TICKETS</button>
                <button className="bg-black text-white px-6 py-3 text-sm font-bold">PLATTEGROND</button>
              </div>

              {/* Map */}
              <div className="bg-gray-200 h-40 rounded-md mb-4 relative overflow-hidden">
                {/* Simple map representation */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400">
                  {/* Street lines */}
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gray-500"></div>
                  <div className="absolute top-16 left-0 right-0 h-1 bg-gray-500"></div>
                  <div className="absolute top-24 left-0 right-0 h-1 bg-gray-500"></div>
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-500"></div>
                  <div className="absolute left-16 top-0 bottom-0 w-1 bg-gray-500"></div>

                  {/* Location marker */}
                  <div className="absolute top-20 left-20 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>

                  {/* Street labels */}
                  <div className="absolute top-2 left-2 text-xs text-gray-700">Burgemeester Brokxlaan</div>
                  <div className="absolute top-10 left-2 text-xs text-gray-700">Station Tilburg</div>
                  <div className="absolute top-18 left-2 text-xs text-gray-700">Spoorlaan</div>
                  <div className="absolute bottom-8 right-2 text-xs text-gray-700 font-bold">Mindlabs</div>
                  <div className="absolute bottom-2 left-2 text-xs text-gray-700">Het Wapen van Tilburg</div>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600 mb-4">
                Mindlabs - Locomotiefboulevard 101 5041 SE Tilburg
              </p>
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
                    <img src="/placeholder.svg?height=40&width=40" alt="Fashion Labs Logo" className="w-10 h-10 mb-2" />
                    <img src="/placeholder.svg?height=24&width=60" alt="Fashion Labs Text" className="h-6" />
                  </div>
                  <img src="/placeholder.svg?height=18&width=60" alt="Yonder" className="h-[18px]" />
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
