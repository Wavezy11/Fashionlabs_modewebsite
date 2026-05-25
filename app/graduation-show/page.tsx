"use client"

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
      '"To the future and past"\n De collectie "To the future and Past" is gebaseerd op traditionele/culturele kleding van China met een fusion van moderne EGL/Lolita kledingstyle van Japan. In mijn collectie laat ik een ander en ander beeld zien van de Chinese cultuur dat mensen weinig of geen van afweten. Deze kledingstukken worden geïnspireerd van de Chinese Hanfu en Qipao met erbij de lolita jurken.\n\n- By May-zaan Tang',
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
      "Mijn collectie heet 5 stages of grief, \nik geef vorm in mijn collectie de emoties die veel mensen ervaren als ze door een periode van rauw gaan. Als ze iemand verliezen die dierbaar voor ze zijn. De emoties die je gaat zien zijn: boosheid, verdriet, angst, schok & ongeloof en acceptatie.",
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
      'Het concept van mijn collectie is \n"Bloom in your own way, every flower had its own."\n\nDaarmee wil ik vertellen dat je net zoals bloemen op verschillende manier bloeit, afhankelijk van de soort omgeving, omstandigheden en ontwikkeling.\nNet als een bloem groei je naar een unieke pad in het leven.',
  },
  {
    id: "maud",
    name: "Maud",
    image: "fashionshow/Maud.jpg",
    instagram: ["chickie_nuggets2"],
    description:
      "Mijn idee voor mijn collectie is om surrealisme naar boven te halen in de kleding, maar ook het ook vrouwelijk te houden. Ik houd zelf van het idee dat dingen net iets te ver gaan voor sommige mensen dus net buiten de lijntjes te kleuren.\n\n Dit is ook te zien in mijn concept bord. Voor vormen en silhouetten ben ik gegaan voor aan sluitende kleding om de vormen van het lichaam te accentueren en ook heb ik er voor gekozen om het skelet weer naar boven te laten komen, omdat dit mij altijd aanspreekt en toch een beetje buiten de lijntjes te gaan.",
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
      "Deze collectie is een artistieke en rebelse verkenning van mentale gezondheid en de maatschappelijke misvattingen die daar vaak mee gepaard gaan. \n\nElk kledingstuk draagt de sporen van innerlijke strijd en chaos maar ook van kracht, intelligentie en creativiteit. In plaats van de duistere kant te verbergen, wordt deze omarmd als een essentieel onderdeel van het mens-zijn.",
  },
  {
    id: "senna",
    name: "Senna",
    image: "fashionshow/Senna.jpg",
    instagram: ["Senna_rugbondingsing"],
    description:
      "Ik ben Senna 21 jaar, en ik ben trots om mijn Shape Collectie met jullie te delen. Deze collectie draait volledig om bodypositivity – het vieren van elk lichaam, in elke vorm, maat en kleur. \n\nDoor het gebruik van fijn kant wil ik laten zien dat álle lichamen er mogen zijn. Ieder detail is ontworpen met liefde en respect voor diversiteit, zodat jij je gezien en krachtig voelt, precies zoals je bent.",
  },
  {
    id: "lise",
    name: "Lise",
    image: "fashionshow/lise.jfif",
    instagram: ["lisette_gelata"],
    description:
      'Vintage dollhouse is de naam van mijn collectie. \n"Bij deze collectie ben ik gegaan voor een elegante vintage look, geïnspireerd door porseleinen poppen en hun tijdloze charme."',
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

export default function GraduationShowPage() {
  return (
    <main className="w-full flex-1 bg-black">
      {/* Title Section */}
      <div className="bg-gradient-to-b from-white to-gray-100 py-16 md:py-24 text-center relative z-10 shadow-md">
        <h1 className="text-black text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest drop-shadow-sm">
          Graduation Show
          <div className="w-32 h-1.5 bg-[#9480AB] mx-auto mt-8 rounded-full"></div>
        </h1>
      </div>

      {/* Purple Section with Text */}
      <div className="bg-[#B8A5D1] px-6 py-16 text-center relative z-20 shadow-inner">
        <p className="text-white text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-medium tracking-wide drop-shadow-md">
          Zij hebben zich laten inspireren door de rijke kleuren en patronen van Afrikaanse stoffen. Ze hebben
          deze invloeden prachtig verwerkt in hun ontwerpen, waardoor unieke blouses zijn ontstaan die zowel
          modern als traditioneel aanvoelen. Met aandacht voor detail en respect voor de culturele betekenis van
          de stoffen, hebben ze mode gecreëerd die verhalen vertelt.
        </p>
      </div>

      {/* Student Sections (Black background) */}
      <div className="bg-[#0f0f0f] py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
          {graduationStudents.map((student) => (
            <StudentSection key={student.id} student={student} />
          ))}
        </div>
      </div>

      {/* Vote Button Section */}
      <div className="bg-[#0f0f0f] px-6 pb-24 text-center">
        <a href="https://www.menti.com/almyi42oep2a" target="_blank" rel="noopener noreferrer"
           className="inline-block group relative overflow-hidden bg-white text-black px-16 py-6 text-xl font-black text-center min-w-[300px] uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-500"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">STEMMEN</span>
          <div className="absolute inset-0 h-full w-0 bg-[#9480AB] group-hover:w-full transition-all duration-500 ease-out z-0"></div>
        </a>
      </div>
    </main>
  )
}
