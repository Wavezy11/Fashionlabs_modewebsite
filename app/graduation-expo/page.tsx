"use client"

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
      "Out of Sight, Censored, Unveiled.\n Mijn collectie geeft het proces van groei, bewustwording en zelfontwikkeling bij een vrouw weer. Waarin zij zich verbergt, blootstelt en haarzelf volledig omarmt en durft te laten zien. Mijn collectie is een visuele weergave van deze reis, geïnspireerd op natuur en dier om dit proces te weergeven",
  },
  {
    id: "isabella",
    name: "Isabella",
    image: "graduation-expo/Isabella.jfif",
    imagePosition: "50% 20%",
    instagram: ["Isabellamilada"],
    description:
      'Hoi! Ik ben Isabella Medel Espinoza, 20 jaar oud, en ik ontwerp momenteel mijn collectie "Futuristic Elegance". Als student design/mode ontwerper wil ik technologie en luxe couture combineren, geïnspireerd door Pierpaolo Piccioli, die romantische elegantie mengt met moderne elementen. \n\n Mijn Ontwerpconcept: "Futuristic Elegance" Mijn collectie combineert luxe couture met technologische innovaties, zoals LED-verlichting en kleurveranderende stoffen die reageren op beweging. Ik gebruik duurzame en innovatieve materialen om een balans te creëren tussen esthetiek en interactiviteit. \n\n Mijn ontwerpen, zoals de Tech-Infused Fishtail Dress en de Sustainable Luxury A-Line Gown, weerspiegelen mijn visie op mode: technologie, duurzaamheid en luxe. Hoewel de ontwerpen nog in ontwikkeling zijn, ben ik enthousiast om ze verder uit te werken en te presenteren op de expositie. \n\nIk kijk erg uit naar de voortgang van dit project en de uiteindelijke expositie!',
  },
  {
    id: "mirac",
    name: "Mirac",
    image: "graduation-expo/Mirac.jfif",
    imagePosition: "50% 44%",
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
      "Hi, my name is Nina Rugbonding Sing. \nI'm 22 years old and currently studying Fashion Design.\n I'd like to tell you about the collection I made for my final exam. \n\nThe collection is called 'Fashion of the Unknown' and is based on the mysteries of the atmosphere. What lives there? What do they look like? And of course, what would they wear? The clothes are otherworldly, not normal, and therefore designed for the unknown. \n The collection is inspired by the one and only Iris van Herpen.",
  },
  {
    id: "jomar",
    name: "Jomar",
    image: "graduation-expo/Jomar.jfif",
    instagram: ["user064071531", "rcnsnt"],
    description:
      "Voor dit project haal ik inspiratie uit de visionaire ontwerper Ying Gao, die technologie, interactiviteit en mode naadloos combineert. Haar avant-garde benadering daagt conventionele kledingconstructie uit en sluit perfect aan bij de drie modetrends die ik heb gekozen: \n\nReal Authentic: Ying Gao's ontwerpen belichamen authenticiteit door een conceptuele en innovatieve aanpak. Ik wil dit weerspiegelen door vakmanschap te combineren met moderne technologie. \n\nForm: Haar experimenten met vorm en structuur inspireren mij om onconventionele silhouetten te verkennen en de relatie tussen kleding en het lichaam opnieuw te definiëren.\n\nWorker: Veel van haar ontwerpen hebben een functionele en utilitaire esthetiek. Ik omarm werkwear-elementen zoals duurzaamheid en aanpasbaarheid, zodat mode zowel een statement maakt als functioneel is. \nDoor deze trends te integreren, streef ik naar een collectie die innovatie, authenticiteit en modern vakmanschap uitstraalt—net zoals Ying Gao de toekomst van mode blijft herdefiniëren.",
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

const StudentSection = ({ student }: { student: any }) => (
  <div className="group flex flex-col items-center bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/5 p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20 hover:-translate-y-2 h-full">
    <h2 className="text-white text-3xl font-bold mb-8 uppercase tracking-widest relative">
      {student.name}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#9480AB] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </h2>
    <div className="flex justify-center mb-10 w-full relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#9480AB]/20 to-transparent blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div
        className="relative overflow-hidden w-[260px] h-[340px] md:w-[300px] md:h-[400px] z-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(148,128,171,0.3)]"
      >
        <Image
          src={`/${student.image}`}
          alt={student.name}
          fill
          className="object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
          style={{
            objectPosition: student.imagePosition || "center center",
          }}
        />
      </div>
    </div>
    <div className="text-white/70 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-10 whitespace-pre-line flex-grow text-center group-hover:text-white/90 transition-colors duration-500">
      {student.description}
    </div>

    {/* Instagram links */}
    <div className="flex flex-wrap justify-center items-center gap-4 mt-auto">
      {student.instagram.map((handle: string, index: number) => (
        <a
          key={index}
          href={`https://instagram.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#9480AB] hover:text-white transition-colors duration-200 text-sm font-medium bg-black/50 border border-white/10 px-5 py-2.5 rounded-full hover:bg-[#9480AB]/20"
        >
          <Instagram className="w-4 h-4" />@{handle}
        </a>
      ))}
    </div>
  </div>
)

export default function GraduationExpoPage() {
  return (
    <main className="w-full flex-1 bg-black">
      {/* Title Section */}
      <div className="bg-gradient-to-b from-white to-gray-100 py-16 md:py-24 text-center relative z-10 shadow-md">
        <h1 className="text-black text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest drop-shadow-sm">
          Graduation Expo
          <div className="w-32 h-1.5 bg-[#9480AB] mx-auto mt-8 rounded-full"></div>
        </h1>
      </div>

      {/* Transition with decorative crosses */}
      <div className="relative bg-gray-100 h-16 w-full flex justify-between items-center px-4 lg:px-12">
        <svg width="32" height="32" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
          <path d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z" fill="#1a1a1a"/>
        </svg>
        <svg width="32" height="32" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
          <path d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z" fill="#1a1a1a"/>
        </svg>
      </div>

      {/* Student Sections - Responsive Grid */}
      <div className="bg-[#0f0f0f] py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
          {graduationExpoStudents.map((student) => (
            <StudentSection key={student.id} student={student} />
          ))}
        </div>
      </div>

      {/* SVG Transition Border (Footer transition) */}
      <div className="w-full h-11 bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center">
        {/* We can use a repeating background for the purple blocks instead of a fixed width SVG to make it truly responsive */}
        <div className="absolute inset-0 opacity-50" 
             style={{ 
               backgroundImage: 'linear-gradient(45deg, #9480AB 25%, transparent 25%, transparent 75%, #9480AB 75%, #9480AB), linear-gradient(45deg, #9480AB 25%, transparent 25%, transparent 75%, #9480AB 75%, #9480AB)',
               backgroundSize: '40px 40px',
               backgroundPosition: '0 0, 20px 20px'
             }}>
        </div>
      </div>
    </main>
  )
}
