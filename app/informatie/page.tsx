"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"

export default function FashionLabsProgram() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const programItems = [
    {
      id: "texlab",
      time: "14:30",
      title: "TexLab expo",
      location: "'t Hart / Vide - 2e jaars mode",
      hasPlus: true,
    },
    {
      id: "demos1",
      time: "15:00",
      title: "Demo's",
      location: "Overal - kappers demo's",
      hasPlus: true,
    },
    {
      id: "pitches",
      time: "15:30",
      title: "Pitches Texlab",
      location: "Vide",
      hasPlus: true,
    },
    {
      id: "chatgpt",
      time: "16:00",
      title: "Chat GPT",
      location: "Forum - Roel Mathijsen?",
      hasPlus: true,
    },
    {
      id: "demos2",
      time: "16:30",
      title: "Demo's",
      location: "Overal",
      hasPlus: true,
    },
    {
      id: "fashionshow1",
      time: "17:30",
      title: "Fashionshow & Prijsuitrijking 1",
      location: "'t Hart",
      hasPlus: true,
    },
    {
      id: "altalk",
      time: "18:00",
      title: "Al talk",
      location: "Forum - Elmo Mistiaen",
      hasPlus: true,
    },
    {
      id: "netwerkborrel",
      time: "19:00",
      title: "Netwerkborrel",
      location: "Horeca bar",
      hasPlus: true,
    },
    {
      id: "graduation-expo",
      time: "19:30",
      title: "Graduation expo",
      location: "'t Hart",
      hasPlus: true,
    },
    {
      id: "graduation-talk",
      time: "20:00",
      title: "Graduation talk",
      location: "Forum ?",
      hasPlus: true,
    },
    {
      id: "graduation-show",
      time: "20:40",
      title: "Graduation show Prijsuitrijking 2",
      location: "'t Hart",
      hasPlus: true,
    },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProgram = (programId: string) => {
    setExpandedProgram(expandedProgram === programId ? null : programId)
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
                    className="max-h-[100px] max-w-[100px] object-contain mx-autoh"
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
                    inhoud vormgegeven. Tijdens de bijeenkomst komen mode, beauty en interactieve technologie samen en
                    zal er worden geshowd, gepresenteerd, geëxposeerd en genetwerkt.
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
                              <Plus className="w-6 h-6 text-[#9480AB]" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Location Text */}
                      <div className="text-white text-sm pl-4">{item.location}</div>
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
