"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"

export default function FashionLabsProgram() {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const programItems = [
    {
      id: "texlab",
      time: "15:00",
      title: "TexLab expo",
      location: "'t Hart / Vide - 2e jaars mode",
      hasPlus: false,
      isExpandable: false,
    },
    {
      id: "Pitches",
      time: "15:30",
      title: "Pitches TexLab",
      location: "Vide",
      hasPlus: false,
      isExpandable: false,
    },
    {
      id: "Digital Alumni talk",
      time: "16:30",
      title: "Digital Alumni talk",
      location: "Forum / Alumni Student Wanida",
      hasPlus: true,
      isExpandable: true,
    },
    {
      id: "Fashionshow",
      time: "17:30",
      title: "Fashionshow",
      location: "`t Hart / mode en kappers",
      hasPlus: true,
      isExpandable: true,
    },
    {
      id: "Netwerk borrel",
      time: "18:30",
      title: "Netwerk borrel",
      location: "Horeca bar",
      hasPlus: false,
      isExpandable: false,
    },
    {
      id: "AI talk Elmo Mistiaen",
      time: "19:00",
      title: "AI talk Elmo Mistiaen",
      location: "Forum / Elmo Mistiaen",
      hasPlus: true,
      isExpandable: true,
    },
    {
      id: "Graduation Pitches",
      time: "19:30",
      title: "Graduation Pitches",
      location: "t Hart / vide *",
      hasPlus: true,
      isExpandable: true,
    },
    {
      id: "Graduation Talk",
      time: "20:00",
      title: "Graduation Talk",
      location: "Forum / Jim intervieuw",
      hasPlus: true,
      isExpandable: true,
    },
    {
      id: "Graduation show",
      time: "20:30",
      title: "Graduation show",
      location: "'t Hart / examenstudenten mode",
      hasPlus: true,
      isExpandable: true,
    },
  ]

  const expandedContent = {
    "Graduation Talk": {
      description:
        "Tijdens de graduation talk zal Jim Steward in gesprek gaan met verschillende afstudeer studenten. De vragen hoe zij tegen de veranderende wereld met AI aankijken en hoe zij SHAPE in hun eigen werk hebben vertaald zullen aan bod komen. Maar ook de vraag hoe hun kijk op de mode wereld is zal aan bod komen.",
    },
    "AI talk Elmo Mistiaen": {
      description:
        "Ik ben Graphic Designer en juwelen ontwerper, gebaseerd in Brussel, België. Mijn stijl is voornamelijk organische vormen en digitaal beelden transformeren in vreemde organismes en biomorphic vormen. \n Met inspiratie uit de microscopische wereld en coralen.",
      image: "/elmo.png?height=200&width=300&text=AI+Expert+Speaker",
      imageAlt: "AI Talk Speaker Elmo Mistiaen",
    },
    "Digital Alumni talk": {
      description:
        "Stel je voor dat je een game had, waar jij jezelf kan stylen met je kledingkast? \nTijdens mijn afstudeerproject ontwikkelde ik Wanida's Closet: een digitale kledingkast waarin je je eigen kleding kunt scannen, stylen en passen via jezelf als 3D-avatar. Mode wordt zo interactief, speels en persoonlijk. In de alumni talk vertel ik hoe dit project is ontstaan, en hoe het aansluit bij mijn huidige studie als multimedia designer en de visie op de toekomst van digitale mode.",
      image: "/wanida.jpg?height=200&width=300&text=Digital+Alumni+Speaker",
      imageAlt: "Digital Alumni Talk Speaker",
    },
    Fashionshow: {
      description:
        "Ervaar de nieuwste modetrends en ontwerpen van onze getalenteerde studenten. Een spectaculaire show vol creativiteit en innovatie.",
      buttonText: "BEKIJK FASHIONSHOW",
      buttonLink: "/fashion-show",
    },
    "Graduation Pitches": {
      description:
        "De design studenten hebben voor hun laatste project de opdracht gekregen om voor een een designer van de tentoonstelling SHAPE een collectie te ontwikkelen. Hierin hebben zij onderzoek gedaan naar trends, een marketingplan opgesteld, een eigen concept vormgeven en verschillende designs uitgwerkt en voorbereid voor de productie. ",
      buttonText: "BEKIJK EXPO",
      buttonLink: "/graduation-expo",
    },
    "Graduation show": {
      description:
        "De tailor studenten hebben hun eindcollectie laten inspireren op de tentoonstelling SHAPE, zij hebben allemaal een kunstenaar of designer gekozen daarvoor een collectie van 4 outfits ontworpen en vervaardigd. ",
      buttonText: "BEKIJK GRADUATION SHOW",
      buttonLink: "/graduation-show",
    },
  }

  const toggleProgram = (programId: string) => {
    setExpandedProgram(expandedProgram === programId ? null : programId)
  }

  return (
    <main className="w-full flex-1 bg-white">
      {/* Information Section with Timetable SVG */}
      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black text-black mb-12 text-center tracking-widest uppercase">
            Informatie
            <div className="w-24 h-1 bg-[#9480AB] mx-auto mt-6 rounded-full"></div>
          </h1>
          <div className="relative w-full max-w-4xl bg-white rounded-3xl p-4 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500">
            <Image
              src="/timetable.svg"
              alt="Fashion Labs Timetable"
              width={1000}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="programma" className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#2d2438] py-20 px-4 relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-screen-xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center tracking-widest uppercase">
            PROGRAMMA
            <div className="w-24 h-1 bg-[#9480AB] mx-auto mt-6 rounded-full"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programItems.map((item) => (
              <div key={item.id} className="group flex flex-col h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:border-white/20">
                <div className="flex items-stretch min-h-[70px]">
                  <div className="bg-[#9480AB] text-white px-5 py-4 font-black text-xl min-w-[100px] flex items-center justify-center">
                    {item.time}
                  </div>
                  <div className="flex-1 px-5 py-4 flex items-center justify-between bg-white/5">
                    <h3 className="font-bold text-white text-lg md:text-xl group-hover:text-[#e0d4f0] transition-colors">{item.title}</h3>
                    {item.hasPlus && (
                      <button onClick={() => toggleProgram(item.id)} className="flex-shrink-0 ml-3 focus:outline-none bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
                        {expandedProgram === item.id ? (
                          <Minus className="w-5 h-5 text-white" />
                        ) : (
                          <Plus className="w-5 h-5 text-white" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-black/40 px-5 py-3 text-sm font-medium text-white/70 flex items-center gap-2">
                  <span className="text-[#9480AB]">📍</span> {item.location}
                </div>

                {/* Expanded Content */}
                {expandedProgram === item.id && item.isExpandable && expandedContent[item.title] && (
                  <div className="p-6 border-t border-white/10 bg-black/60 flex-grow animate-in slide-in-from-top-4 duration-500">
                    {expandedContent[item.title].image && (
                      <div className="mb-6 relative w-full h-48 rounded-xl overflow-hidden shadow-2xl">
                        <Image
                          src={expandedContent[item.title].image || "/placeholder.svg"}
                          alt={expandedContent[item.title].imageAlt}
                          fill
                          className="object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}

                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">
                      {expandedContent[item.title].description}
                    </p>

                    {expandedContent[item.title].buttonText && expandedContent[item.title].buttonLink && (
                      <div className="mt-auto pt-2">
                        <a
                          href={expandedContent[item.title].buttonLink}
                          className="block w-full bg-[#9480AB] hover:bg-[#b8a5d1] text-white px-6 py-4 font-bold text-center rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#9480AB]/50 tracking-wider"
                        >
                          {expandedContent[item.title].buttonText}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tickets Section */}
          <div className="flex justify-center mt-20">
             <a
              href="https://www.eventbrite.nl/e/tickets-fashionlabs-1381853935319"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white text-black px-16 py-6 text-xl font-black text-center inline-block min-w-[300px] uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-500"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">TICKETS HALEN</span>
              <div className="absolute inset-0 h-full w-0 bg-[#9480AB] group-hover:w-full transition-all duration-500 ease-out z-0"></div>
            </a>
          </div>
        </div>
      </section>

      {/* Location and Map Section */}
      <section className="w-full bg-black py-16 px-4">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-white text-center md:text-left flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider uppercase mb-2">Locatie</h2>
            <div>
              <div className="font-bold text-2xl text-[#9480AB] mb-2">MindLabs</div>
              <div className="text-lg text-gray-300 mb-6">Locomotiefboulevard 101<br/>5041 SE Tilburg</div>
              <div className="font-bold text-2xl">15:00 - 21:30</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-center text-black uppercase tracking-wider">PLATTEGROND</h2>
            <div className="relative w-full h-[300px] md:h-[400px]">
              <Image
                src="/maps.png"
                alt="Plattegrond Tilburg"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="text-center text-sm font-medium text-gray-600 mt-4">
              Mindlabs - Locomotiefboulevard 101, 5041 SE Tilburg
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
