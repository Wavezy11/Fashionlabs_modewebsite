"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const fashionShowItems = [
  {
    id: "the-white-screen",
    name: "The White Screen",
    image: "fashion-items/the-white-screen.jpg",
    description:
      "Deze collectie is een artistieke en rebelse verkenning van mentale gezondheid en de maatschappelijke misvattingen die daar vaak mee gepaard gaan. Elk kledingstuk draagt de sporen van innerlijke strijd en chaos maar ook van kracht, intelligentie en creativiteit. In plaats van de duistere kant te verbergen, wordt deze omarmd als een essentieel onderdeel van het mens-zijn.",
  },
  {
    id: "jeans-it-up",
    name: "Jeans it up",
    image: "fashion-items/jeans-it-up.jpg",
    description:
      "Een moderne interpretatie van klassieke denim. Deze collectie combineert traditionele jeans technieken met innovatieve designs en duurzame materialen. Elke piece vertelt een verhaal van comfort, stijl en tijdloze elegantie.",
  },
  {
    id: "fashion-meets-gambia",
    name: "Fashion_Meets_Gambia",
    image: "fashion-items/fashion-meets-gambia.jpg",
    description:
      "Een culturele fusie die de rijke tradities van Gambia combineert met moderne mode-elementen. Levendige kleuren, traditionele patronen en hedendaagse silhouetten komen samen in deze unieke collectie.",
  },
  {
    id: "excellent-hair-dressers",
    name: "Excellent hair dressers",
    image: "fashion-items/excellent-hair-dressers.jpg",
    description:
      "Mode en haar styling gaan hand in hand. Deze collectie verkent de relatie tussen kledingdesign en haarstyling, waarbij accessoires en kledingstukken speciaal ontworpen zijn om het haar te complementeren.",
  },
  {
    id: "ai-makes-business",
    name: "AI makes you're business",
    image: "fashion-items/ai-makes-business.jpg",
    description:
      "De toekomst van mode ligt in technologie. Deze collectie integreert AI-gegenereerde patronen en smart textiles om kleding te creëren die reageert op de omgeving en de drager.",
  },
  {
    id: "stunning-red",
    name: "Stunning red",
    image: "fashion-items/stunning-red.jpg",
    description:
      "Rood als statement kleur. Deze collectie draait volledig om de kracht en passie van rood in al zijn tinten. Van diep bordeaux tot fel karmijn, elke nuance vertelt een eigen verhaal.",
  },
  {
    id: "laser-layers",
    name: "Laser Layers",
    image: "fashion-items/laser-layers.jpg",
    description:
      "Precisie en technologie ontmoeten mode. Door laser-cutting technieken ontstaan complexe gelaagde designs die spelen met transparantie, textuur en geometrische vormen.",
  },
  {
    id: "whats-your-statement",
    name: "What's your statement?",
    image: "fashion-items/whats-your-statement.jpg",
    description:
      "Mode als persoonlijke expressie. Deze collectie daagt je uit om je eigen statement te maken door middel van gedurfde prints, onverwachte combinaties en persoonlijke styling keuzes.",
  },
]

const ItemSection = ({ item, index }: { item: any; index: number }) => (
  <div className="bg-[#B8A5D1] px-6 py-12 text-center">
    <h2
      className="text-white mb-6"
      style={{
        fontFamily: "Axia",
        fontWeight: 900,
        fontSize: "32px",
        lineHeight: "28px",
        letterSpacing: "0px",
        textAlign: "center",
      }}
    >
      {item.name}
    </h2>
    <div className="flex justify-center mb-8">
      <div
        className="overflow-hidden shadow-lg"
        style={{ width: "302px", height: "280px", borderRadius: "32px 0 32px 0" }}
      >
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center center",
          }}
        />
      </div>
    </div>
    <div className="text-white text-sm leading-relaxed max-w-sm mx-auto mb-4 whitespace-pre-line">
      {item.description}
    </div>
  </div>
)

export default function FashionShowItemsPage() {
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
              <h1
                className="text-black"
                style={{
                  fontFamily: "Axia",
                  fontWeight: 900,
                  fontSize: "32px",
                  lineHeight: "28px",
                  letterSpacing: "0px",
                  textAlign: "center",
                }}
              >
                Fashion Show
              </h1>
            </div>

            {/* Fashion Items Sections (Purple background) */}
            {fashionShowItems.map((item, index) => (
              <ItemSection key={item.id} item={item} index={index} />
            ))}

            {/* SVG Transition Border - Purple to Black */}
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
                  fill="black"
                />
                <path
                  d="M160.08 14.5208V0.000238189H145.56V14.5208H131.039V29.0413H145.56V43.5618H160.08V29.0413H174.604V14.5208H160.08Z"
                  fill="black"
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

            {/* Vote Button Section - Black background */}
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
