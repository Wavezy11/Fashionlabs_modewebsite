"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const graduationStudents = [
  {
    id: "brandon",
    name: "Brandon",
    image: "fashionshow/Brandon.jpg",
    description:
      "Deze collectie is een artistieke en rebelse verkiezing van mentale gezondheid en de impact van sociale media op onze samenleving. Elk kledingstuk draagt de sporen van innerlijke strijd en chaos, maar ook van kracht, intelligentie en creativiteit. In plaats van de duistere kant te verbergen, wordt deze omarmd als een essentieel onderdeel van het mens-zijn.",
    highlightWords: ["mentale gezondheid", "essentieel onderdeel"],
  },
  {
    id: "izis",
    name: "Izis",
    image: "fashionshow/Izis.jpg",
    description:
      "Een collectie geïnspireerd door de kracht van vrouwelijkheid en moderne elegantie. Elk ontwerp vertelt een verhaal van zelfvertrouwen en authenticiteit, waarbij traditionele technieken worden gecombineerd met hedendaagse silhouetten.",
    highlightWords: ["vrouwelijkheid", "authenticiteit"],
  },
  {
    id: "lise",
    name: "Lise",
    image: "fashionshow/lise.jfif",
    description:
      "Deze collectie verkent de harmonie tussen natuur en mode. Door gebruik te maken van organische vormen en duurzame materialen ontstaat een unieke symbiose tussen comfort en stijl. Elk stuk vertelt het verhaal van bewuste keuzes en milieuvriendelijke innovatie.",
    highlightWords: ["natuur", "duurzame materialen"],
  },
  {
    id: "luna",
    name: "Luna",
    image: "fashionshow/Luna.jpg",
    description:
      "Een dromerige collectie die de mystiek van de nacht omarmt. Zachte texturen en vloeiende silhouetten creëren een gevoel van sereniteit en elegantie. Deze ontwerpen nodigen uit tot contemplatie en innerlijke rust.",
    highlightWords: ["mystiek", "sereniteit"],
  },
  {
    id: "maud",
    name: "Maud",
    image: "fashionshow/Maud.jpg",
    description:
      "Een krachtige collectie die de grenzen van conventionele mode doorbreekt. Door experimentele technieken en onverwachte materiaalcombinaties ontstaat een revolutionaire benadering van hedendaagse kleding. Elk ontwerp daagt de kijker uit om anders te denken.",
    highlightWords: ["revolutionaire", "experimentele technieken"],
  },
  {
    id: "may-zaan",
    name: "May-Zaan",
    image: "fashionshow/May-Zaan.jpg",
    description:
      "Deze collectie viert de diversiteit van culturele invloeden en moderne interpretaties. Door het mengen van traditionele patronen met eigentijdse snit ontstaat een unieke fusie die zowel verleden als toekomst eert.",
    highlightWords: ["culturele invloeden", "unieke fusie"],
  },
  {
    id: "nisa",
    name: "Nisa",
    image: "fashionshow/Nisa.jpg",
    description:
      "Een collectie die de kracht van minimalisme en functionaliteit combineert. Strakke lijnen en doordachte details creëren tijdloze stukken die zowel praktisch als elegant zijn. Elke creatie belichaamt de essentie van moderne sophistication.",
    highlightWords: ["minimalisme", "tijdloze stukken"],
  },
  {
    id: "olivier",
    name: "Olivier",
    image: "fashionshow/Olivier.jpg",
    description:
      "Deze collectie onderzoekt de spanning tussen structuur en vrijheid. Door architecturale elementen te integreren in draagbare mode ontstaat een fascinerende dialoog tussen vorm en functie. Elk ontwerp is een statement van creatieve onafhankelijkheid.",
    highlightWords: ["architecturale elementen", "creatieve onafhankelijkheid"],
  },
  {
    id: "sanne",
    name: "Sanne",
    image: "fashionshow/Sanne.jpg",
    description:
      "Een speelse collectie die kleur en textuur viert. Door het experimenteren met onconventionele materialen en levendige paletten ontstaat een vrolijke en optimistische benadering van mode. Elk stuk straalt pure vreugde en creativiteit uit.",
    highlightWords: ["levendige paletten", "pure vreugde"],
  },
  {
    id: "sarah",
    name: "Sarah",
    image: "fashionshow/Sarah.jpg",
    description:
      "Deze collectie omarmt de kracht van transformatie en persoonlijke groei. Door adaptieve ontwerpen en veelzijdige styling opties ontstaan kledingstukken die meegroeien met de drager. Elk ontwerp vertelt een verhaal van evolutie en zelfontdekking.",
    highlightWords: ["transformatie", "zelfontdekking"],
  },
  {
    id: "senna",
    name: "Senna",
    image: "fashionshow/Senna.jpg",
    description:
      "Een collectie die de grens tussen kunst en mode verkent. Door het integreren van artistieke technieken in draagbare ontwerpen ontstaat een unieke vorm van wearable art. Elk stuk is zowel functioneel als een kunstwerk op zich.",
    highlightWords: ["wearable art", "artistieke technieken"],
  },
  {
    id: "vera",
    name: "Vera",
    image: "fashionshow/Vera.jpg",
    description:
      "Deze collectie viert de schoonheid van imperfectie en authenticiteit. Door het omarmen van natuurlijke texturen en organische vormen ontstaat een eerlijke en oprechte benadering van mode. Elk ontwerp straalt warmte en menselijkheid uit.",
    highlightWords: ["authenticiteit", "menselijkheid"],
  },
  {
    id: "vy",
    name: "Vy",
    image: "fashionshow/Vy.jpg",
    description:
      "Een futuristische collectie die technologie en mode samenbrengt. Door het integreren van innovatieve materialen en cutting-edge technieken ontstaat een visie op de toekomst van kleding. Elk ontwerp is een blik vooruit naar wat mogelijk is.",
    highlightWords: ["futuristische", "cutting-edge technieken"],
  },
]

const StudentSection = ({ student, index }: { student: any; index: number }) => (
  <div className="bg-[#1a1a1a] px-6 py-8 text-center">
    <h2 className="text-white text-2xl font-bold mb-6">{student.name}</h2>
    <div className="flex justify-center mb-6">
      <div className="w-80 h-80 rounded-3xl overflow-hidden border-4 border-gray-800 shadow-lg">
        <img
          src={student.image || "/placeholder.svg"}
          alt={student.name}
          className="w-full h-full object-cover grayscale contrast-110 brightness-95"
        />
      </div>
    </div>
    <p className="text-white text-sm leading-relaxed max-w-sm mx-auto">
      {student.description.split(" ").map((word, wordIndex) => {
        const isHighlighted = student.highlightWords.some((highlight) =>
          word.toLowerCase().includes(highlight.toLowerCase()),
        )
        return isHighlighted ? (
          <span key={wordIndex} className="font-bold">
            {word}{" "}
          </span>
        ) : (
          <span key={wordIndex}>{word} </span>
        )
      })}
    </p>
  </div>
)

export default function GraduationShowPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
            className={`fixed top-0 left-0 w-full h-full bg-[#242424] z-[45] flex justify-center items-center transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
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
            {/* White Title Section */}
            <div className="bg-white px-6 py-8 text-center relative z-10">
              <h1 className="text-2xl font-bold tracking-wide text-black">Graduation Show</h1>
            </div>

            {/* Overlapping Image Container */}
            <div className="relative z-20 flex justify-center -mb-20">
              {/* Decorative Cross SVGs around the image */}
              {/* Left side crosses */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-4 left-8 z-30"
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
                className="absolute top-12 left-4 z-30"
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
                className="absolute bottom-6 left-12 z-30"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              {/* Right side crosses */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2 right-6 z-30"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="15"
                height="15"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-8 right-12 z-30"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="17"
                height="17"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-4 right-8 z-30"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <div className="w-64 h-48 rounded-2xl overflow-hidden shadow-lg">
                <img src="graduation-show-foto.png" alt="Graduation Show" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Purple Section with Text */}
            <div className="bg-[#B8A5D1] px-6 pt-24 pb-8 text-center relative z-10">
              <p className="text-white text-sm leading-relaxed max-w-sm mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* SVG Overlay Border */}
            <div className="w-full h-11 bg-[#B8A5D1] relative">
              <svg
                width="393"
                height="44"
                viewBox="0 0 393 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 w-full h-full z-30"
              >
                <path
                  d="M72.7208 14.5208V0.000238189H58.2003V14.5208H43.6798V29.0413H58.2003V43.5618H72.7208V29.0413H87.244V14.5208H72.7208Z"
                  fill="#000000"
                />
                <path
                  d="M160.08 14.5208V0.000238189H145.56V14.5208H131.039V29.0413H145.56V43.5618H160.08V29.0413H174.604V14.5208H160.08Z"
                  fill="#000000"
                />
                <path d="M14.5205 0.000238189H0V14.5208H14.5205V0.000238189Z" fill="#000000" />
                <path d="M43.5615 0.000238189H29.041V14.5208H43.5615V0.000238189Z" fill="#000000" />
                <path d="M14.5205 29.0414H0V43.562H14.5205V29.0414Z" fill="#000000" />
                <path d="M43.5615 29.0414H29.041V43.562H43.5615V29.0414Z" fill="#000000" />
                <path d="M101.88 0.000238189H87.3596V14.5208H101.88V0.000238189Z" fill="#000000" />
                <path d="M130.921 0.000238189H116.401V14.5208H130.921V0.000238189Z" fill="#000000" />
                <path d="M101.88 29.0414H87.3596V43.562H101.88V29.0414Z" fill="#000000" />
                <path d="M130.921 29.0414H116.401V43.562H130.921V29.0414Z" fill="#000000" />
                <path
                  d="M247.44 14.5208V0.000238189H232.92V14.5208H218.399V29.0413H232.92V43.5618H247.44V29.0413H261.963V14.5208H247.44Z"
                  fill="#000000"
                />
                <path
                  d="M334.8 14.5208V0.000238189H320.279V14.5208H305.759V29.0413H320.279V43.5618H334.8V29.0413H349.323V14.5208H334.8Z"
                  fill="#000000"
                />
                <path d="M189.24 0.000238189H174.719V14.5208H189.24V0.000238189Z" fill="#000000" />
                <path d="M218.281 0H203.76V14.5205H218.281V0Z" fill="#000000" />
                <path d="M189.24 29.0412H174.719V43.5617H189.24V29.0412Z" fill="#000000" />
                <path d="M218.281 29.0412H203.76V43.5617H218.281V29.0412Z" fill="#000000" />
                <path d="M276.599 0.000238189H262.079V14.5208H276.599V0.000238189Z" fill="#000000" />
                <path d="M305.64 0H291.12V14.5205H305.64V0Z" fill="#000000" />
                <path d="M276.599 29.0412H262.079V43.5617H276.599V29.0412Z" fill="#000000" />
                <path d="M305.64 29.0412H291.12V43.5617H305.64V29.0412Z" fill="#000000" />
                <path d="M363.959 0.000238189H349.438V14.5208H363.959V0.000238189Z" fill="#000000" />
                <path d="M393 0H378.479V14.5205H393V0Z" fill="#000000" />
                <path d="M363.959 29.0412H349.438V43.5617H363.959V29.0412Z" fill="#000000" />
                <path d="M393 29.0412H378.479V43.5617H393V29.0412Z" fill="#000000" />
              </svg>
            </div>

            {/* Student Sections */}
            {graduationStudents.map((student, index) => (
              <StudentSection key={student.id} student={student} index={index} />
            ))}

            {/* Vote Button Section */}
            <div className="bg-[#1a1a1a] px-6 py-8 text-center">
              <button className="border-2 border-white text-white px-8 py-3 text-lg font-bold tracking-wider hover:bg-white hover:text-black transition-colors rounded-lg">
                STEMMEN
              </button>
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

              {/* Back to top button */}
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
