"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

const graduationStudents = [
  {
    id: "may-zaan",
    name: "May-Zaan",
    image: "fashionshow/May-Zaan.jpg",
   
    instagram: ["mayie_05_"],
    description:
      '"To the future and past" De collectie "To the future and Past" is gebaseerd op traditionele/culturele kleding van China met een fusion van moderne EGL/Lolita kledingstyle van Japan. In mijn collectie laat ik een ander en ander beeld zien van de Chinese cultuur dat mensen weinig of geen van afweten. Deze kledingstukken worden geïnspireerd van de Chinese Hanfu en Qipao met erbij de lolita jurken.\n\n- By May-zaan Tang',
  },
  {
    id: "luna",
    name: "Luna",
    image: "fashionshow/Luna.jpg",
    instagram: ["lunascova"],
    description:
      "Deze collectie draait om de balans tussen licht en donker, sterk en zacht. Wit staat voor rust en hoop, zwart voor diepte en kracht. Door contrasten in stoffen, vormen en structuren ontstaat een harmonie tussen tegenstellingen.",
  },
  {
    id: "izis",
    name: "Izis",
    image: "fashionshow/Izis.jpg",
    instagram: ["_izis__kips"],
    description:
      '"Once we\'ll escape from the reality"\n\nEen fase in een menselijk leven, waarbij ontsnapping uit het dagelijkse leven even nodig is om jezelf te herontdekken.\nDoor een tijdje in een magische wereld te stappen waar je jezelf kan zijn en de volledige rust kan pakken, krijg je de kans om de juiste keuzes te maken voor de toekomst.',
  },
  {
    id: "sarah",
    name: "Sarah",
    image: "fashionshow/Sarah.jpg",
    imagePosition: "50% 30%",
    instagram: ["sarahsmans"],
    description:
      "Mijn collectie heet shapes of time, ik wil de kenmerken van vroeger in een modern jasje gaan steken. Met mijn collectie wil ik de vormen van vroeger laten terug komen in mijn kledingstukken en dat mijn kleding een klassiek en sierlijk gevoel uitstraalt.",
  },
  {
    id: "vera",
    name: "Vera",
    image: "fashionshow/Vera.jpg",
    instagram: ["veravandenthillart", "portfolio_veravandenthillart"],
    description:
      "Mijn collectie heet 5 stages of grief, ik geef vorm in mijn collectie de emoties die veel mensen ervaren als ze door een periode van rauw gaan. Als ze iemand verliezen die dierbaar voor ze zijn. De emoties die je gaat zien zijn: boosheid, verdriet, angst, schok & ongeloof en acceptatie.",
  },
  {
    id: "nisa",
    name: "Nisa",
    image: "fashionshow/Nisa.jpg",
        imagePosition: "50% 35%",
    instagram: ["studiona_bi"],
    description:
      "Met een wereld vol overproductie en textielafval brengt deze collectie een bewuste benadering van mode, waar tijdloze ontwerpen en duurzame stoffen centraal staan.\nDoor minimalisme en doordachte materialen te combineren, laat deze collectie zien dat stijl en verantwoordelijkheid hand in hand kunnen gaan.",
  },
  {
    id: "vy",
    name: "Vy",
    image: "fashionshow/Vy.jpg",
    instagram: ["vylocxfashion", "Vyloc_"],
    description:
      'Het concept van mijn collectie is \n"Bloom in your own way, every flower had its own."\nDaarmee wil ik vertellen dat je net zoals bloemen op verschillende manier bloeit, afhankelijk van de soort omgeving, omstandigheden en ontwikkeling.\nNet als een bloem groei je naar een unieke pad in het leven.',
  },
  {
    id: "maud",
    name: "Maud",
    image: "fashionshow/Maud.jpg",
    instagram: ["chickie_nuggets2"],
    description:
      "Mijn idee voor mijn collectie is om surrealisme naar boven te halen in de kleding, maar ook het ook vrouwelijk te houden. Ik houd zelf van het idee dat dingen net iets te ver gaan voor sommige mensen dus net buiten de lijntjes te kleuren. Dit is ook te zien in mijn concept bord. Voor vormen en silhouetten ben ik gegaan voor aan sluitende kleding om de vormen van het lichaam te accentueren en ook heb ik er voor gekozen om het skelet weer naar boven te laten komen, omdat dit mij altijd aanspreekt en toch een beetje buiten de lijntjes te gaan.",
  },
  {
    id: "olivier",
    name: "Olivier",
    image: "fashionshow/Olivier.jpg",
    instagram: ["_oliviervanhoof_"],
    description:
      "Ik heb mijn collectie gebaseerd op het nostalgische gevoel dat ik kreeg van mijn gekozen modehuis. Het gevoel kwam vooral door het gebruik van de kleuren, motiefjes en het model van zijn kledingstukken. Vandaar heb ik oude foto's gebruikt en ben er zelf voor gegaan om stoffen te gebruiken die een oud gevoel geven.",
  },
  {
    id: "sanne",
    name: "Sanne",
    image: "fashionshow/Sanne.jpg",
    instagram: ["sanne_sdk"],
    description:
      "Street with a touch of weirdness\n\nIk heb mijn collectie deze naam gegeven omdat het voornamelijk streetwear/urban kleding is en omdat er meer ongebruikelijke prints en fournituren zijn gebruikt zoals teddyberen op een jas en graffiti op kleding.\nIk wil met mijn collectie laten zien dat je uit je comfort zone mag gaan en dat je daar door een inspiratie kan zijn voor de mensen om jou heen.\nBen de inspiratie en laat inspireren!",
  },
  {
    id: "brandon",
    name: "Brandon",
    image: "fashionshow/Brandon.jpg",
    imagePosition: "50% 30%",
    instagram: ["Https.brandon013"],
    description:
      "Deze collectie is een artistieke en rebelse verkenning van mentale gezondheid en de maatschappelijke misvattingen die daar vaak mee gepaard gaan. Elk kledingstuk draagt de sporen van innerlijke strijd en chaos maar ook van kracht, intelligentie en creativiteit. In plaats van de duistere kant te verbergen, wordt deze omarmd als een essentieel onderdeel van het mens-zijn.",
  },
  {
    id: "senna",
    name: "Senna",
    image: "fashionshow/Senna.jpg",
    instagram: ["Senna_rugbondingsing"],
    description:
      "Ik ben Senna 21 jaar, en ik ben trots om mijn Shape Collectie met jullie te delen. Deze collectie draait volledig om bodypositivity – het vieren van elk lichaam, in elke vorm, maat en kleur. Door het gebruik van fijn kant wil ik laten zien dat álle lichamen er mogen zijn. Ieder detail is ontworpen met liefde en respect voor diversiteit, zodat jij je gezien en krachtig voelt, precies zoals je bent.",
  },
  {
    id: "lise",
    name: "Lise",
    image: "fashionshow/lise.jfif",
    instagram: ["lisette_gelata"],
    description:
      'Vintage dollhouse is de naam van mijn collectie. "Bij deze collectie ben ik gegaan voor een elegante vintage look, geïnspireerd door porseleinen poppen en hun tijdloze charme."',
  },
]

const StudentSection = ({ student, index }: { student: any; index: number }) => (
  <div className="bg-[#1a1a1a] px-6 py-12 text-center">
    <h2 className="text-white text-2xl font-bold mb-6">{student.name}</h2>
    <div className="flex justify-center mb-8">
      <div
        className="overflow-hidden shadow-lg"
        style={{ width: "302px", height: "280px", borderRadius: "32px 0 32px 0" }}
      >
        <img
          src={student.image || "/placeholder.svg"}
          alt={student.name}
          className="w-full h-full object-cover grayscale contrast-125 brightness-90"
          style={{
            filter: "grayscale(100%) contrast(1.2) brightness(0.9)",
            objectPosition: student.imagePosition || "center center",
          }}
        />
      </div>
    </div>
    <div className="text-white text-sm leading-relaxed max-w-sm mx-auto mb-4 whitespace-pre-line">
      {student.description}
    </div>
    {/* Instagram links */}
    <div className="flex flex-wrap justify-center items-center gap-3">
      {student.instagram.map((handle, index) => (
        <a
          key={index}
          href={`https://instagram.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#9480AB] hover:text-white transition-colors duration-200 text-sm font-medium"
        >
          <Instagram className="w-4 h-4" />@{handle}
        </a>
      ))}
    </div>
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
                  { name: "PROGRAMMA", path: "/informatie" },
                  { name: "GRADUATION-EXPO", path: "/graduation-expo" },
                  { name: "GRADUATION-SHOW", path: "/graduation-show" },
                  { name: "FASHION-SHOW", path: "/fashion-show" },
                  { name: "TICKETS", path: "/tickets" },
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
                Graduation Show
              </h1>
            </div>

            {/* Purple Section with Text (moved up) */}
            <div className="bg-[#B8A5D1] px-6 py-8 text-center relative z-10">
              <p className="text-white text-sm leading-relaxed max-w-sm mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* SVG Transition Border */}
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

            {/* Student Sections (Black background like expo) */}
            {graduationStudents.map((student, index) => (
              <StudentSection key={student.id} student={student} index={index} />
            ))}

            {/* Vote Button Section */}
            <div className="bg-[#1a1a1a] px-6 py-8 text-center">
              <a href="https://www.menti.com/almyi42oep2a" target="_blank" rel="noopener noreferrer">
                <button className="border-2 border-white text-white px-8 py-3 text-lg font-bold tracking-wider hover:bg-white hover:text-black transition-colors rounded-lg">
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
