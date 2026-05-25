"use client"

import Link from "next/link"
import Image from "next/image"

const fashionShowItems = [
  {
    id: "the-white-screen",
    name: "The White Screen",
    image: "fashion-items/The-White-screen.png",
    imagePosition: "center top",
    description:
      "Deze collectie is een artistieke en rebelse verkenning van mentale gezondheid en de maatschappelijke misvattingen die daar vaak mee gepaard gaan. Elk kledingstuk draagt de sporen van innerlijke strijd en chaos maar ook van kracht, intelligentie en creativiteit. In plaats van de duistere kant te verbergen, wordt deze omarmd als een essentieel onderdeel van het mens-zijn.",
  },
  {
    id: "jeans-it-up",
    name: "Jeans it up",
    image: "fashion-items/Jeans-It-Up.png",
    imagePosition: "center left",
    description:
      "Het produceren van één paar jeans verbuikt maar liefst 7000 liter water, schokkend! Onze 2e jaars Tailor Fashion studenten hebben na moeten denken over de impact van de mode-industrie op onze planeet. \nZij hebben deze uitdaging omarmd en prachtige items gecreëerd van gebruikte jeans. Door oude materialen een nieuw leven te geven, tonen zij aan dat mode niet alleen mooi kan zijn, maar ook verantwoord.\n Duurzaamheid is de toekomst, en wij zijn trots om deze boodschap te delen met jullie!",
  },
  {
    id: "fashion-meets-gambia",
    name: "Fashion_Meets_Gambia",
    image: "gambia.avif",
    imagePosition: "center left",
    description:
      "In dit showonderdeel nemen we je mee op reis naar Gambia, waar 10 mode studenten zich twee weken lang hebben ingezet voor uiteenlopende projecten.\n Eën van de project was een samenwerking met een lokale kleermaker, waarmee ze een outfit hebben ontworpen en gemaakt.",
  },
  {
    id: "excellent-hair-dressers",
    name: "Excellent hair dressers",
    image: "fashion-items/Excellent-Hairdressers.png",
    imagePosition: "center top",
    description:
      "Onze excellentieklas startte het jaar met een traject vol inspirerende, wekelijkse thema's ter voorbereiding op het eindproduct. De kappers kozen als overkoepelend thema 'film' en vertaalden hun gekozen film naar kapsel, make-up en kleding. We zijn enorm trots op onze klas en de creatieve meesterwerken die zij hebben neergezet, en nemen jullie graag mee op deze filmische reis.",
  },
  {
    id: "ai-makes-business",
    name: "AI makes you're business",
    image: "fashion-items/AI-Makes-Your-Business.png",
    imagePosition: "center bottom",
    description:
      "You're first impression counts! \nDe 2e en 3ejaars Fashion Tailor studenten hebben met veel passie en vakmanschap een stijlvolle blouse en bijpassende broek gecreëerd, die niet alleen de perfecte balans tussen professionaliteit en flair uitstralen, maar ook de unieke persoonlijkheid van elke student weerspiegelen. Met deze prachtige ensembles zijn onze studenten klaar om de wereld van de mode en het bedrijfsleven te veroveren!",
  },
  {
    id: "stunning-red",
    name: "Stunning red",
    image: "fashion-items/Stunning-Red.png",
    imagePosition: "center center",
    description:
      "In een tijdperk waarin artificiële technologie steeds meer invloed heeft op de mode-industrie, hebben onze 2e en 3ejaars Fashion Tailor studenten de uitdaging aangegaan om deze technologie te combineren met traditionele ambacht. Tijdens hun ontwerpproces hebben ze zich afgevraagd: 'Denkt de computer echt net als ik, of is er nog steeds menselijke creativiteit en intuïtie nodig?' Laten we genieten van hun prachtige creaties en de innovatieve geest die hen heeft geïnspireerd!",
  },
  {
    id: "laser-layers",
    name: "Laser Layers",
    image: "fashion-items/Laser-Layers.png",
    imagePosition: "center top",
    description:
      "We zijn verheugd om de creaties van onze getalenteerde 1ejaars basismedewerkers fashion studenten te presenteren. Deze studenten hebben op een innovatieve manier met een laser cutter hun ontwerp op hun design laten laseren. Hun creativiteit en technische vaardigheden komen prachtig samen in deze unieke collectie!",
  },
  {
    id: "whats-your-statement",
    name: "What's your statement?",
    image: "fashion-items/Whats-Your-Statement.png",
    imagePosition: "center bottom",
    description:
      "De 3jaars tailor studenten showen hun unieke creaties, geïnspireerd door hun visie op de toekomst. Elk van deze outfits is niet alleen een mode-item, maar ook een verhaal dat de dromen, innovaties en duurzaamheid van morgen weerspiegelt. Laat je inspireren door de toekomst die onze studenten voor ogen hebben en geniet van deze bijzondere creaties vol talent en verbeeldingskracht!",
  },
]

const ItemSection = ({ item }: { item: any }) => (
  <div className="group flex flex-col items-center bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:border-white/50 hover:-translate-y-2 h-full">
    <h2
      className="text-white mb-8 uppercase tracking-widest relative text-center"
      style={{
        fontFamily: "Axia",
        fontWeight: 900,
        fontSize: "24px",
      }}
    >
      {item.name}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </h2>
    <div className="flex justify-center mb-10 w-full relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div
        className="relative overflow-hidden w-[260px] h-[340px] md:w-[300px] md:h-[400px] z-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)]"
      >
        <Image
          src={`/${item.image}`}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          style={{
            objectPosition: item.imagePosition || "center center",
          }}
        />
      </div>
    </div>
    <div className="text-white/90 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-4 whitespace-pre-line font-medium flex-grow text-center group-hover:text-white transition-colors duration-500">
      {item.description}
    </div>
  </div>
)

export default function FashionShowItemsPage() {
  return (
    <main className="w-full flex-1 bg-[#B8A5D1]">
      {/* Title Section */}
      <div className="bg-gradient-to-b from-white to-[#f8f5fb] py-16 md:py-24 text-center relative z-10 shadow-md">
        <h1
          className="text-[#9480AB] uppercase tracking-widest drop-shadow-sm text-5xl md:text-6xl lg:text-7xl"
          style={{
            fontFamily: "Axia",
            fontWeight: 900,
          }}
        >
          Fashion Show
          <div className="w-32 h-1.5 bg-[#9480AB] mx-auto mt-8 rounded-full"></div>
        </h1>
      </div>

      {/* Fashion Items Sections - Grid Layout */}
      <div className="bg-[#B8A5D1] py-20 px-4 md:px-8 lg:px-12 relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 relative z-10">
          {fashionShowItems.map((item) => (
            <ItemSection key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Vote Button Section */}
      <div className="bg-[#B8A5D1] px-6 pb-24 text-center relative z-10">
        <a href="https://www.menti.com/alaqeqbw738s" target="_blank" rel="noopener noreferrer"
           className="inline-block group relative overflow-hidden bg-white text-[#B8A5D1] px-16 py-6 text-xl font-black text-center min-w-[300px] uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.6)] hover:scale-105 transition-all duration-500"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">STEMMEN</span>
          <div className="absolute inset-0 h-full w-0 bg-[#9480AB] group-hover:w-full transition-all duration-500 ease-out z-0"></div>
        </a>
      </div>
    </main>
  )
}
