"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const graduationExpoStudents = [
  {
    id: "isabelle",
    name: "Isabelle",
    image: "graduation-expo/Isabelle.jpg",
    description:
      "Deze collectie is een artistieke en rebelse verkiezing van mentale gezondheid en de impact van sociale media op onze samenleving. Elk kledingstuk draagt de sporen van innerlijke strijd en chaos, maar ook van kracht, intelligentie en creativiteit.",
    highlightWords: ["mentale gezondheid", "kracht"],
  },
  {
    id: "jadie-marie",
    name: "Jadie-Marie",
    image: "graduation-expo/Jadie-Marie.jpg",
    description:
      "Een collectie geïnspireerd door de kracht van vrouwelijke empowerment en moderne elegantie. Door het combineren van sterke silhouetten met zachte details ontstaat een perfecte balans tussen kracht en kwetsbaarheid.",
    highlightWords: ["vrouwelijke empowerment", "perfecte balans"],
  },
  {
    id: "jomar",
    name: "Jomar",
    image: "graduation-expo/Jomar.jfif",
    description:
      "Deze collectie verkent de grenzen tussen streetwear en haute couture. Door urbane invloeden te mengen met luxe materialen ontstaat een unieke esthetiek die de moderne jeugdcultuur reflecteert.",
    highlightWords: ["streetwear", "jeugdcultuur"],
  },
  {
    id: "maud",
    name: "Maud",
    image: "graduation-expo/Maud.jpg",
    description:
      "Een experimentele collectie die duurzaamheid en innovatie combineert. Door het hergebruiken van vintage materialen en het toepassen van zero-waste technieken ontstaat mode met een bewuste boodschap.",
    highlightWords: ["duurzaamheid", "bewuste boodschap"],
  },
  {
    id: "mirac",
    name: "Mirac",
    image: "graduation-expo/Mirac.jfif",
    description:
      "Deze collectie omarmt culturele diversiteit en traditionele ambachten. Door het integreren van verschillende textieltraditieën ontstaat een rijke tapestry die verhalen van verschillende culturen vertelt.",
    highlightWords: ["culturele diversiteit", "verschillende culturen"],
  },
  {
    id: "nina",
    name: "Nina",
    image: "graduation-expo/Nina.jpg",
    description:
      "Een minimalistische collectie die de essentie van vorm en functie verkent. Strakke lijnen en doordachte details creëren tijdloze stukken die elegantie en prakticaliteit perfect combineren.",
    highlightWords: ["minimalistische", "tijdloze stukken"],
  },
  {
    id: "quinty",
    name: "Quinty",
    image: "graduation-expo/Quinty.jfif",
    description:
      "Deze collectie onderzoekt de relatie tussen technologie en mode. Door het integreren van smart textiles en wearable technology ontstaat kleding die reageert op de omgeving en de drager.",
    highlightWords: ["smart textiles", "wearable technology"],
  },
  {
    id: "sydney",
    name: "Sydney",
    image: "graduation-expo/Sydney.jfif",
    description:
      "Een collectie geïnspireerd door de kracht van transformatie en persoonlijke groei. Adaptieve ontwerpen en veelzijdige styling opties creëren kledingstukken die meegroeien met de drager.",
    highlightWords: ["transformatie", "persoonlijke groei"],
  },
  {
    id: "zoe",
    name: "Zoe",
    image: "graduation-expo/Zoe.jpg",
    description:
      "Deze collectie viert de schoonheid van imperfectie en authenticiteit. Door het omarmen van natuurlijke texturen en organische vormen ontstaat een eerlijke benadering van hedendaagse mode.",
    highlightWords: ["imperfectie", "authenticiteit"],
  },
  {
    id: "boudy",
    name: "Boudy",
    image: "graduation-expo/Boudy.jfif",
    description:
      "Een collectie die de grenzen van genderexpressie verkent. Door het doorbreken van traditionele kledingcodes ontstaat mode die iedereen de vrijheid geeft om zichzelf authentiek uit te drukken.",
    highlightWords: ["genderexpressie", "authentiek uit te drukken"],
  },
  {
    id: "isabella",
    name: "Isabella",
    image: "graduation-expo/Isabella.jfif",
    description:
      "Deze collectie onderzoekt de kracht van storytelling door middel van mode. Elk ontwerp vertelt een persoonlijk verhaal door symboliek, kleur en textuur, waardoor kleding wordt getransformeerd tot kunst.",
    highlightWords: ["storytelling", "getransformeerd tot kunst"],
  },
]

const StudentSection = ({ student, index }: { student: any; index: number }) => (
  <div className="bg-[#1a1a1a] px-6 py-8 text-center">
    <h2 className="text-white text-2xl font-bold mb-6">{student.name}</h2>
    <div className="flex justify-center mb-6">
      <div
        className="overflow-hidden shadow-lg"
        style={{ width: "302px", height: "202px", borderRadius: "32px 0 32px 0" }}
      >
        <img
          src={student.image || "/placeholder.svg"}
          alt={student.name}
          className="w-full h-full object-cover grayscale contrast-125 brightness-90"
          style={{
            filter: "grayscale(100%) contrast(1.2) brightness(0.9)",
            objectPosition: "center top",
          }}
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

export default function GraduationExpoPage() {
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
            {/* Title Section */}
            <div className="bg-white px-6 py-8 text-center relative">
              <h1 className="text-2xl font-bold tracking-wide text-black">Graduation Expo</h1>
            </div>

            {/* Transition with decorative crosses - only at the top */}
            <div className="relative bg-white pb-4">
              {/* Decorative crosses for transition */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-4 z-10"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#1a1a1a"
                />
              </svg>

              <svg
                width="20"
                height="20"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 right-4 z-10"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#1a1a1a"
                />
              </svg>
            </div>

            {/* Student Sections */}
            {graduationExpoStudents.map((student, index) => (
              <StudentSection key={student.id} student={student} index={index} />
            ))}

            {/* Vote Button Section */}
            <div className="bg-[#1a1a1a] px-6 py-8 text-center">
              <button className="border-2 border-white text-white px-8 py-3 text-lg font-bold tracking-wider hover:bg-white hover:text-black transition-colors rounded-lg">
                STEMMEN
              </button>
            </div>

            {/* SVG Transition Border */}
            <div className="w-full h-11 bg-[#1a1a1a] relative">
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
                  fill="#9480AB"
                />
                <path
                  d="M160.08 14.5208V0.000238189H145.56V14.5208H131.039V29.0413H145.56V43.5618H160.08V29.0413H174.604V14.5208H160.08Z"
                  fill="#9480AB"
                />
                <path d="M14.5205 0.000238189H0V14.5208H14.5205V0.000238189Z" fill="#9480AB" />
                <path d="M43.5615 0.000238189H29.041V14.5208H43.5615V0.000238189Z" fill="#9480AB" />
                <path d="M14.5205 29.0414H0V43.562H14.5205V29.0414Z" fill="#9480AB" />
                <path d="M43.5615 29.0414H29.041V43.562H43.5615V29.0414Z" fill="#9480AB" />
                <path d="M101.88 0.000238189H87.3596V14.5208H101.88V0.000238189Z" fill="#9480AB" />
                <path d="M130.921 0.000238189H116.401V14.5208H130.921V0.000238189Z" fill="#9480AB" />
                <path d="M101.88 29.0414H87.3596V43.562H101.88V29.0414Z" fill="#9480AB" />
                <path d="M130.921 29.0414H116.401V43.562H130.921V29.0414Z" fill="#9480AB" />
                <path
                  d="M247.44 14.5208V0.000238189H232.92V14.5208H218.399V29.0413H232.92V43.5618H247.44V29.0413H261.963V14.5208H247.44Z"
                  fill="#9480AB"
                />
                <path
                  d="M334.8 14.5208V0.000238189H320.279V14.5208H305.759V29.0413H320.279V43.5618H334.8V29.0413H349.323V14.5208H334.8Z"
                  fill="#9480AB"
                />
                <path d="M189.24 0.000238189H174.719V14.5208H189.24V0.000238189Z" fill="#9480AB" />
                <path d="M218.281 0H203.76V14.5205H218.281V0Z" fill="#9480AB" />
                <path d="M189.24 29.0412H174.719V43.5617H189.24V29.0412Z" fill="#9480AB" />
                <path d="M218.281 29.0412H203.76V43.5617H218.281V29.0412Z" fill="#9480AB" />
                <path d="M276.599 0.000238189H262.079V14.5208H276.599V0.000238189Z" fill="#9480AB" />
                <path d="M305.64 0H291.12V14.5205H305.64V0Z" fill="#9480AB" />
                <path d="M276.599 29.0412H262.079V43.5617H276.599V29.0412Z" fill="#9480AB" />
                <path d="M305.64 29.0412H291.12V43.5617H305.64V29.0412Z" fill="#9480AB" />
                <path d="M363.959 0.000238189H349.438V14.5208H363.959V0.000238189Z" fill="#9480AB" />
                <path d="M393 0H378.479V14.5205H393V0Z" fill="#9480AB" />
                <path d="M363.959 29.0412H349.438V43.5617H363.959V29.0412Z" fill="#9480AB" />
                <path d="M393 29.0412H378.479V43.5617H393V29.0412Z" fill="#9480AB" />
              </svg>
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
