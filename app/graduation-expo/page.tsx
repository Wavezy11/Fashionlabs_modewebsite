"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

const graduationExpoStudents = [
  {
    id: "boudy",
    name: "Boudy",
    image: "graduation-expo/Boudy.jfif",
    instagram: ["abdlrhmn_fr"],
    description:
      "Ik ben 20 jaar en heb een grote passie voor mode, vooral voor het technische gedeelte. Mijn collectie van Thom Browne is hier een goed voorbeeld van. Zijn stijl, strakke pasvormen, korte broeken en jasjes, en bijzondere details spreekt mij enorm aan. Maar ik draag het niet zomaar; ik verwerk zijn stijl op mijn eigen manier. Wat mij het meest fascineert, is hoe kleding wordt gemaakt. De manier waarop stoffen worden gebruikt, hoe een pak in elkaar zit, en welke technieken erachter zitten. In mijn collectie combineer ik Thom Browne's klassieke stijl met mijn eigen ideeën. Ik speel met pasvormen, materialen en details om iets unieks te creëren dat bij mij past. Thom Browne doorbreekt de regels van herenkleding, en dat inspireert mij om hetzelfde te doen. Zijn invloed is duidelijk aanwezig in mijn stijl, maar altijd met mijn eigen draai eraan.",
  },
  {
    id: "jadie-marie",
    name: "Jadie-Marie",
    image: "graduation-expo/Jadie-Marie.jpg",
    instagram: ["jadi.vd"],
    description:
      "Voor mijn collectie wil ik werken met organische vormen, omdat ze zachte, maar interessante silhouetten creëren. Ik wil kleding ontwerpen die zowel vrouwelijk als krachtig is en echt opvalt. Kleuren spelen daarbij een grote rol: ik kies voor roze en oranje omdat deze tinten energie, creativiteit en zelfvertrouwen uitstralen. Daarnaast wil ik experimenteren met verschillende texturen en materialen om mijn ontwerpen uniek te maken. Door een combinatie van technologie, kunst en innovatieve technieken te gebruiken, streef ik naar een moderne en vernieuwende collectie waarin traditie en innovatie samenkomen.",
  },
  {
    id: "sydney",
    name: "Sydney",
    image: "graduation-expo/Sydney.jfif",
    instagram: ["syd__ster____"],
    description:
    "CLOWNCHROMA \nClownchroma is fel, gedurfd en grensverleggend. Het verkent identiteit aan de hand van gekke, opvallende vormen, levendige primaire kleuren—geel, oranje, rood, blauw, groen en paars—en een explosie van speelse patronen zoals ruitjes en stippen.Geïnspireerd door de theatrale geest van Walter van Beirendonck, versmelt de collectie clown-esthetiek met persoonlijke expressie en genderfluïditeit. \nOntworpen voor alle lichamen en identiteiten is Clownchroma mode als performance, spel en trots.",
  },
  {
    id: "maud",
    name: "Maud",
    image: "graduation-expo/Maud.jpg",
    instagram: ["maudlaseroms"],
    description:
      "Out of Sight, Censored, Unveiled.\n Mijn collectie geeft het proces van groei, bewustwording en zelfontwikkeling bij een vrouw weer. Waarin zij zich verbergt, blootstelt en haarzelf volledig omarmt en durft te laten zien. Mijn collectie is een visuele weergave van deze reis, geïnspireerd op natuur en dier om dit proces te weergeven"
  },
  {
    id: "isabella",
    name: "Isabella",
    image: "graduation-expo/Isabella.jfif",
    instagram: ["Isabellamilada"],
    description:
      "Hoi! Ik ben Isabella Medel Espinoza, 20 jaar oud, en ik ontwerp momenteel mijn collectie “Futuristic Elegance”. Als student design/mode ontwerper wil ik technologie en luxe couture combineren, geïnspireerd door Pierpaolo Piccioli, die romantische elegantie mengt met moderne elementen. \n\n Mijn Ontwerpconcept: “Futuristic Elegance” Mijn collectie combineert luxe couture met technologische innovaties, zoals LED-verlichting en kleurveranderende stoffen die reageren op beweging. Ik gebruik duurzame en innovatieve materialen om een balans te creëren tussen esthetiek en interactiviteit. \n\n Mijn ontwerpen, zoals de Tech-Infused Fishtail Dress en de Sustainable Luxury A-Line Gown, weerspiegelen mijn visie op mode: technologie, duurzaamheid en luxe. Hoewel de ontwerpen nog in ontwikkeling zijn, ben ik enthousiast om ze verder uit te werken en te presenteren op de expositie. \n\nIk kijk erg uit naar de voortgang van dit project en de uiteindelijke expositie!",
  },
  {
    id: "mirac",
    name: "Mirac",
    image: "graduation-expo/Mirac.jfif",
    instagram: ["mirac_heritage"],
    description:
      "Deze collectie omarmt culturele diversiteit en traditionele ambachten. Door het integreren van verschillende textieltraditieën ontstaat een rijke tapestry die verhalen van verschillende culturen vertelt.",
  },
  {
    id: "zoe",
    name: "Zoë",
    image: "graduation-expo/Zoe.jpg",
    instagram: ["zoe_authentic"],
    description:
      "Met mijn collectie ben ik bezig om het nostalgische gevoel naar boven te brengen, ik wil graag dingen van het verleden gebruiken voor een prachtig design.",
  },
  {
    id: "nina",
    name: "Nina",
    image: "graduation-expo/Nina.jpg",
    instagram: ["ninarugbx"],
    description:
      "Hi, my name is Nina Rugbonding Sing. I'm 22 years old and currently studying Fashion Design. I'd like to tell you about the collection I made for my final exam. \nThe collection is called 'Fashion of the Unknown' and is based on the mysteries of the atmosphere. What lives there? What do they look like? And of course, what would they wear? The clothes are otherworldly, not normal, and therefore designed for the unknown. \n The collection is inspired by the one and only Iris van Herpen.",
  },
  {
    id: "jomar",
    name: "Jomar",
    image: "graduation-expo/Jomar.jfif",
    instagram: ["user064071531", "rcnsnt"],
    description:
      "Voor dit project haal ik inspiratie uit de visionaire ontwerper Ying Gao, die technologie, interactiviteit en mode naadloos combineert. Haar avant-garde benadering daagt conventionele kledingconstructie uit en sluit perfect aan bij de drie modetrends die ik heb gekozen: \n\nReal Authentic: Ying Gao’s ontwerpen belichamen authenticiteit door een conceptuele en innovatieve aanpak. Ik wil dit weerspiegelen door vakmanschap te combineren met moderne technologie. \n\nForm: Haar experimenten met vorm en structuur inspireren mij om onconventionele silhouetten te verkennen en de relatie tussen kleding en het lichaam opnieuw te definiëren.\n\nWorker: Veel van haar ontwerpen hebben een functionele en utilitaire esthetiek. Ik omarm werkwear-elementen zoals duurzaamheid en aanpasbaarheid, zodat mode zowel een statement maakt als functioneel is. \nDoor deze trends te integreren, streef ik naar een collectie die innovatie, authenticiteit en modern vakmanschap uitstraalt—net zoals Ying Gao de toekomst van mode blijft herdefiniëren.",
  },
  {
    id: "quinty",
    name: "Quinty",
    image: "graduation-expo/Quinty.jfif",
    instagram: ["quintyvanvught"],
    description:
      "hoi! Ik ben Quinty, Mijn collectie is gebaseerd op natuurlijke vormen, structuren en prints. Ik heb gekeken naar de prints en voormen die in de natuur voor komen, deze organsiche lijnen en texturen heb ik omgezet naar silhouetten, stoffen en natuurlijke kleuren.",
  },
  {
    id: "isabelle",
    name: "Isabelle",
    image: "graduation-expo/Isabelle.jpg",
    instagram: ["isabellevd.w"],
    description:
      "Mijn collectie is geïnspireerd op Malou Breuls, met haar speelse vormen en fantasierijke stijl. Daarnaast haal ik inspiratie uit de organische vormen van bloemen, die vrouwelijkheid en sierlijkheid uitstralen. Deze combinatie vertaalt zich in zachte silhouetten en elegante details",
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
            objectPosition: "center center",
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
                Graduation Expo
              </h1>
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
