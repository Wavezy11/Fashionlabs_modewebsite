"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"

export default function FashionLabsProgram() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const programItems = [
    {
      id: "texlab",
      time: "15:00",
      title: "TexLab expo",
      location: "'t Hart / Vide - 2e jaars mode",
      hasPlus: false,
      isExpandable: false,
    },
    {
      id: "Pitches",
      time: "15:00",
      title: "Pitches TexLab",
      location: "Vide",
      hasPlus: false,
      isExpandable: false,
    },
    {
      id: "Digital Alumni talk",
      time: "16:30",
      title: "Digital Alumni talk",
      location: "Forum / Alumni Student Wanida",
      hasPlus: false,
      isExpandable: false,
    },
    {
      id: "Fashionshow",
      time: "17:30",
      title: "Fashionshow",
      location: "`t Hart / mode en kappers",
      hasPlus: true,
      isExpandable: true,
    },
    {
      id: "Netwerk borrel",
      time: "18:30",
      title: "Netwerk borrel",
      location: "Horeca bar",
      hasPlus: false,
      isExpandable: false,
    },
    {
      id: "AI talk Elmo Mistiaen",
      time: "19:00",
      title: "AI talk Elmo Mistiaen",
      location: "Forum / Elmo Mistiaen",
      hasPlus: false,
      isExpandable: false,
    },
    {
      id: "Graduation Pitches",
      time: "19:30",
      title: "Graduation Pitches",
      location: "t Hart / vide *",
      hasPlus: true,
      isExpandable: true,
    },
    {
      id: "Graduation Talk",
      time: "20:00",
      title: "Graduation Talk",
      location: "Forum / Jim intervieuw, Nisa, Jomar en .......",
      hasPlus: false,
      isExpandable: false,
    },
    {
      id: "Graduation show",
      time: "20:30",
      title: "Graduation show",
      location: "'t Hart / examenstudenten mode",
      hasPlus: true,
      isExpandable: true,
    },
  ]

  const expandedContent = {
    Fashionshow: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    "Graduation Pitches": {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    "Graduation show": {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProgram = (programId: string) => {
    setExpandedProgram(expandedProgram === programId ? null : programId)
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
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-white relative">
            {/* Information Section with Background */}
            <div className="relative w-full">
              {/* Background Image */}
              <Image
                src="/background.png"
                alt="Background"
                width={390}
                height={400}
                className="w-full h-[400px] object-cover"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-6">
                <h2 className="text-xl font-bold text-white mb-4">INFORMATIE</h2>
                <p className="text-sm text-white leading-relaxed">
                  Op 26 juli vindt de tweede editie van Fashion Labs & Looks plaats bij MindLabs in Tilburg,
                  georganiseerd door Yonder. Dit event wordt georganiseerd door de Yonder School voor Mode. Studenten
                  van de opleidingen Mode en Uiterlijke Verzorging, ICT en Media, en Kunst, Cultuur en Media hebben de
                  inhoud vormgegeven. Tijdens de bijeenkomst komen mode, beauty en interactieve technologie samen en zal
                  er worden geshowd, gepresenteerd, geëxposeerd en genetwerkt.
                </p>
              </div>
            </div>

            {/* Location and Time - Black Box */}
            <div className="bg-black text-white p-6 text-center">
              <div className="font-bold text-lg mb-2">MindLabs</div>
              <div className="text-sm mb-2">Locomotiefboulevard 101 5041 SE Tilburg</div>
              <div className="font-bold text-lg">14:30 - 21:30</div>
            </div>

            {/* Program Section */}
            <div className="bg-[#9480AB] px-4 py-6">
              <h2 className="text-xl font-bold text-white mb-6 text-center">PROGRAMMA</h2>

              <div className="space-y-4">
                {programItems.map((item) => (
                  <div key={item.id} className="space-y-2">
                    {/* Program Item */}
                    <div className="flex items-center">
                      {/* Time Box */}
                      <div className="bg-black text-white px-4 py-3 font-bold text-lg min-w-[80px] text-center">
                        {item.time}
                      </div>

                      {/* Content Box */}
                      <div className="bg-white flex-1 px-4 py-3 flex items-center justify-between">
                        <h3 className="font-bold text-[#9480AB] text-lg">{item.title}</h3>
                        {item.hasPlus && (
                          <button onClick={() => toggleProgram(item.id)} className="flex-shrink-0">
                            {expandedProgram === item.id ? (
                              <Minus className={`w-6 h-6 text-[#9480AB] ${item.isExpandable ? "stroke-[3]" : ""}`} />
                            ) : (
                              <Plus className={`w-6 h-6 text-[#9480AB] ${item.isExpandable ? "stroke-[3]" : ""}`} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Location Text */}
                    <div className="text-white text-sm pl-4">{item.location}</div>

                    {/* Expanded Content */}
                    {expandedProgram === item.id && item.isExpandable && expandedContent[item.title] && (
                      <div className="bg-white mx-4 p-4 rounded-lg shadow-lg">
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {expandedContent[item.title].description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tickets Section */}
            <div className="px-4 py-6 bg-[#9480AB] flex justify-center">
              <a
                href="/tickets"
                className="bg-black text-white px-8 py-3 rounded-none font-bold text-center inline-block min-w-[200px]"
              >
                TICKETS
              </a>
            </div>

            {/* Map Section */}
            <div className="bg-black text-white py-4 text-center">
              <h2 className="text-xl font-bold mb-4">PLATTEGROND</h2>
            </div>

            <div className="px-4 py-6 bg-white">
              <Image
                src="/maps.png"
                alt="Plattegrond Tilburg"
                width={350}
                height={200}
                className="w-full h-[200px] object-cover rounded-lg mb-4"
              />
              <div className="text-center text-sm text-gray-600">
                Mindlabs - Locomotiefboulevard 101 5041 SE Tilburg
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white p-[20px] relative">
              <div className="flex justify-between w-full pb-5">
                <div>
                  <ul className="list-none">
                    {[
                      { name: "Voor studenten", path: "/voor-studenten" },
                      { name: "Voor volwassenen", path: "/voor-volwassenen" },
                      { name: "Voor bedrijven", path: "/voor-bedrijven" },
                      { name: "Over FashionLabs", path: "/over-fashionlabs" },
                    ].map((item) => (
                      <li key={item.name} className="mb-[15px] flex items-center">
                        <span className="text-[#9480AB] mr-2.5 font-bold text-lg">+</span>
                        <a href={item.path} className="text-white no-underline text-base hover:underline">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
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

              {/* Back to top button - full width at bottom */}
              <div className="w-full">
                <button
                  onClick={scrollToTop}
                  className="bg-white text-[#1a1a1a] border-none p-4 w-full text-center text-base cursor-pointer transition-colors hover:bg-[#f0f0f0] font-medium rounded-t-lg"
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
