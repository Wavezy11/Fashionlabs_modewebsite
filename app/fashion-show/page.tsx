"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const fashionShowItems = [
  {
    id: "the-white-screen",
    name: "The White Screen",
    image: "fashion-items/The-White-screen.png",
    imagePosition: "center top", // Voeg deze toe
    description:
      "Deze collectie is een artistieke en rebelse verkenning van mentale gezondheid en de maatschappelijke misvattingen die daar vaak mee gepaard gaan. Elk kledingstuk draagt de sporen van innerlijke strijd en chaos maar ook van kracht, intelligentie en creativiteit. In plaats van de duistere kant te verbergen, wordt deze omarmd als een essentieel onderdeel van het mens-zijn.",
  },
  {
    id: "jeans-it-up",
    name: "Jeans it up",
    image: "fashion-items/Jeans-It-Up.png",
    imagePosition: "center left", // Voeg deze toe
    description:
      "Het produceren van één paar jeans verbuikt maar liefst 7000 liter water, schokkend! Onze 2e jaars Tailor Fashion studenten hebben na moeten denken over de impact van de mode-industrie op onze planeet. \nZij hebben deze uitdaging omarmd en prachtige items gecreëerd van gebruikte jeans. Door oude materialen een nieuw leven te geven, tonen zij aan dat mode niet alleen mooi kan zijn, maar ook verantwoord.\n Duurzaamheid is de toekomst, en wij zijn trots om deze boodschap te delen met jullie!",
  },
  {
    id: "fashion-meets-gambia",
    name: "Fashion_Meets_Gambia",
    image: "gambia.avifff",
    imagePosition: "center left", // Voeg deze toe (al bestaand)
    description:
      "In dit showonderdeel nemen we je mee op reis naar Gambia, waar 10 mode studenten zich twee weken lang hebben ingezet voor uiteenlopende projecten.\n Eën van de project was een samenwerking met een lokale kleermaker, waarmee ze een outfit hebben ontworpen en gemaakt.",
  },
  {
    id: "excellent-hair-dressers",
    name: "Excellent hair dressers",
    image: "fashion-items/Excellent-Hairdressers.png",
    imagePosition: "center top", // Voeg deze toe
    description:
      "Onze excellentieklas startte het jaar met een traject vol inspirerende, wekelijkse thema's ter voorbereiding op het eindproduct. De kappers kozen als overkoepelend thema 'film' en vertaalden hun gekozen film naar kapsel, make-up en kleding. We zijn enorm trots op onze klas en de creatieve meesterwerken die zij hebben neergezet, en nemen jullie graag mee op deze filmische reis.",
  },
  {
    id: "ai-makes-business",
    name: "AI makes you're business",
    image: "fashion-items/AI-Makes-Your-Business.png",
    imagePosition: "center bottom", // Voeg deze toe
    description:
      "You're first impression counts! \nDe 2e en 3ejaars Fashion Tailor studenten hebben met veel passie en vakmanschap een stijlvolle blouse en bijpassende broek gecreëerd, die niet alleen de perfecte balans tussen professionaliteit en flair uitstralen, maar ook de unieke persoonlijkheid van elke student weerspiegelen. Met deze prachtige ensembles zijn onze studenten klaar om de wereld van de mode en het bedrijfsleven te veroveren!",
  },
  {
    id: "stunning-red",
    name: "Stunning red",
    image: "fashion-items/Stunning-Red.png",
    imagePosition: "center center", // Voeg deze toe
    description:
      "In een tijdperk waarin artificiële technologie steeds meer invloed heeft op de mode-industrie, hebben onze 2e en 3ejaars Fashion Tailor studenten de uitdaging aangegaan om deze technologie te combineren met traditionele ambacht. Tijdens hun ontwerpproces hebben ze zich afgevraagd: 'Denkt de computer echt net als ik, of is er nog steeds menselijke creativiteit en intuïtie nodig?' Laten we genieten van hun prachtige creaties en de innovatieve geest die hen heeft geïnspireerd!",
  },
  {
    id: "laser-layers",
    name: "Laser Layers",
    image: "fashion-items/Laser-Layers.png",
    imagePosition: "center top", // Voeg deze toe
    description:
      "We zijn verheugd om de creaties van onze getalenteerde 1ejaars basismedewerkers fashion studenten te presenteren. Deze studenten hebben op een innovatieve manier met een laser cutter hun ontwerp op hun design laten laseren. Hun creativiteit en technische vaardigheden komen prachtig samen in deze unieke collectie!",
  },
  {
    id: "whats-your-statement",
    name: "What's your statement?",
    image: "fashion-items/Whats-Your-Statement.png",
    imagePosition: "center bottom", // Voeg deze toe
    description:
      "De 3jaars tailor studenten showen hun unieke creaties, geïnspireerd door hun visie op de toekomst. Elk van deze outfits is niet alleen een mode-item, maar ook een verhaal dat de dromen, innovaties en duurzaamheid van morgen weerspiegelt. Laat je inspireren door de toekomst die onze studenten voor ogen hebben en geniet van deze bijzondere creaties vol talent en verbeeldingskracht!",
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
            objectPosition: item.imagePosition || "center center",
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
                  { name: "HOME", path: "/", external: false },
                  { name: "PROGRAMMA", path: "/informatie", external: false },
                  { name: "GRADUATION-EXPO", path: "/graduation-expo", external: false },
                  { name: "GRADUATION-SHOW", path: "/graduation-show", external: false },
                  { name: "FASHION-SHOW", path: "/fashion-show", external: false },
                  {
                    name: "TICKETS",
                    path: "https://www.eventbrite.nl/e/tickets-fashionlabs-1381853935319?fbclid=PAQ0xDSwKwKUNleHRuA2FlbQIxMQABp4ocJPBgfjIqi1ua-_JlHSGOyiXEDBmXJzG4kF8ZTOrgPbzjyxd7IKqXzUGY_aem_K8Ypz8ffKNjdWUrYXamk-g",
                    external: true,
                  },
                  { name: "MOMENTS", path: "/favorieten", external: false },
                  { name: "INFORMATIE", path: "/informatie", external: false },
                  { name: "CONTACT", path: "/contact", external: false },
                ].map((item) => (
                  <li key={item.name} className="mb-[20px]">
                    {item.external ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white no-underline text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors duration-300"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white no-underline text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    )}
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

            {/* Vote Button Section - Purple background */}
            <div className="bg-[#B8A5D1] px-6 py-8 text-center">
              <a href="https://www.menti.com/alaqeqbw738s" target="_blank" rel="noopener noreferrer">
                <button className="border-2 border-white text-white px-8 py-3 text-lg font-bold tracking-wider hover:bg-white hover:text-[#B8A5D1] transition-colors rounded-lg">
                  STEMMEN
                </button>
              </a>
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
                  <a href="https://www.yonder.nl/" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center justify-center">
                      <Image
                        src="/Yonder-paars-White.png?height=40&width=120&text=Yonder"
                        alt="Yonder Logo"
                        width={102.5}
                        height={40}
                        className="max-h-10 max-w-[120px]"
                      />
                    </div>
                  </a>
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
