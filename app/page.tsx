"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"

interface Photo {
  id: number
  image_url: string
  title: string
  likes: number
  user_name?: string
}

export default function FashionLabsApp() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [fullscreenPhoto, setFullscreenPhoto] = useState<Photo | null>(null)

  const slideshowRef = useRef<HTMLDivElement>(null)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch("/api/photos")
        if (response.ok) {
          const data = await response.json()
          const validPhotos = (data as any[]).filter(
            (photo: any) =>
              photo.image_url &&
              !photo.image_url.includes("/1.png") &&
              !photo.image_url.includes("/2.png") &&
              !photo.image_url.includes("/3.png") &&
              !photo.image_url.includes("/4.png") &&
              !photo.image_url.includes("/5.png"),
          )

          const topPhotos: Photo[] = validPhotos
            .map((photo: any) => ({
              id: Number(photo.id),
              image_url: photo.image_url,
              title: photo.title || "",
              likes: Number(photo.likes) || 0,
              user_name: photo.user_name || "",
            }))
            .sort((a: Photo, b: Photo) => b.likes - a.likes)
            .slice(0, 5)

          setPhotos(topPhotos)
        }
      } catch (error) {
        console.error("Error fetching photos:", error)
      } finally {
        setIsLoadingPhotos(false)
      }
    }
    fetchPhotos()
  }, [])

  const slides = photos.length > 0 ? photos.map((photo) => photo.image_url || "/placeholder.svg") : []

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

  const expandedContent: Record<
    string,
    {
      description: string
      image?: string
      imageAlt?: string
      buttonText?: string
      buttonLink?: string
    }
  > = {
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

  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current)
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 2000)
  }

  const pauseAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current)
      autoSlideRef.current = null
    }
  }

  useEffect(() => {
    if (slides.length > 0) startAutoSlide()
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current)
    }
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const openFullscreen = (photo: Photo) => {
    setFullscreenPhoto(photo)
    setIsFullscreenOpen(true)
    pauseAutoSlide()
  }

  const closeFullscreen = () => {
    setIsFullscreenOpen(false)
    setFullscreenPhoto(null)
    startAutoSlide()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoSlide()
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    setTouchEnd(touchEndX)
    handleSwipe(touchStart, touchEndX)
    startAutoSlide()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    pauseAutoSlide()
    setIsDragging(true)
    setTouchStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    const touchEndX = e.clientX
    setTouchEnd(touchEndX)
    handleSwipe(touchStart, touchEndX)
    startAutoSlide()
  }

  const handleSwipe = (start: number, end: number) => {
    const swipeThreshold = 50
    const swipeDistance = start - end

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      }
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  const toggleProgram = (programId: string) => {
    setExpandedProgram(expandedProgram === programId ? null : programId)
  }

  const renderSlideshow = (isDesktopLayout: boolean) => (
    <div
      className={`relative overflow-hidden ${
        isDesktopLayout
          ? "h-[50vh] md:h-[60vh] w-full max-w-[500px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-white/5 backdrop-blur-xl"
          : "h-[250px] w-full max-w-[350px] md:h-[400px] md:max-w-[600px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-white/5 backdrop-blur-xl"
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={(e: any) => {
        handleMouseUp(e);
        startAutoSlide();
      }}
    >
      {isLoadingPhotos ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-10 h-10 border-4 border-[#9480AB] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : slides.length > 0 ? (
        <>
          <div
            ref={slideshowRef}
            className="flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => {
              const photo = photos[index]
              return (
                <div key={index} className="min-w-full h-full relative bg-black/20">
                  <Image
                    src={slide || "/placeholder.svg"}
                    alt={photo?.title || `Fashion Labs Slide ${index + 1}`}
                    fill
                    className="object-contain drop-shadow-lg"
                  />

                  {photo && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openFullscreen(photo)
                      }}
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-200 z-10"
                      aria-label="View fullscreen"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                    </button>
                  )}

                  {photo && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 md:p-6">
                      <p className="text-white text-lg md:text-xl font-bold truncate">{photo.title}</p>
                      <p className="text-white/80 text-sm md:text-base mt-1">❤️ {photo.likes}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition-colors duration-300 ${
                  index === currentSlide ? "bg-[rgb(46,212,207)]" : "bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-full bg-black/10">
          <p className="text-white/70 text-center text-lg">
            Geen foto&apos;s beschikbaar.
            <br />
            Upload foto&apos;s in de MOMENTS sectie!
          </p>
        </div>
      )}
    </div>
  )

  return (
    <main className="w-full flex-1">
      {/* Hero Section */}
      <section className="relative w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden min-h-[50vh] lg:min-h-[85vh]">
        {/* Blurred Background to fill any gaps */}
        <div className="absolute inset-0">
          <Image
            src="/fashionlabs-hero.png"
            alt="Background blur"
            fill
            className="object-cover opacity-20 blur-3xl scale-125"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative w-full max-w-[1600px] mx-auto z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-0 md:px-8 lg:px-12 h-[75vh] md:h-[85vh] lg:h-auto gap-8 py-8">
          
          {/* Main Image: Scales naturally, no cropping, max height constrained */}
          <div className="relative w-full lg:w-1/2 flex items-center justify-center h-full lg:h-[75vh]">
            <Image
              src="/fashionlabs-hero.png"
              alt="Fashion Labs Hero"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Popular Moments - DESKTOP ONLY (Shown next to the hero) */}
          <div className="hidden lg:flex w-full lg:w-1/2 flex-col items-center justify-center h-full">
            <h2 className="text-3xl xl:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e0d4f0] to-[#b8a5d1] tracking-widest uppercase mb-8 drop-shadow-md text-center">
              POPULAIRE MOMENTS
            </h2>
            {renderSlideshow(true)}
            
            {/* Button directly below moments on desktop */}
            <div className="mt-12 flex justify-center w-full">
              <button
                onClick={() => {
                  const programSection = document.getElementById("programma")
                  if (programSection) {
                    programSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 text-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-500 rounded-full"
              >
                <span className="relative z-10">BEKIJK PROGRAMMA</span>
                <div className="absolute inset-0 h-full w-0 bg-white group-hover:w-full transition-all duration-500 ease-out z-0"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Gradient for the button visibility on Mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none lg:hidden" />
        
        {/* Programma Button Positioned at the Bottom - MOBILE ONLY */}
        <div className="absolute bottom-6 md:bottom-10 z-20 flex flex-col items-center px-4 w-full lg:hidden">
          <button
            onClick={() => {
              const programSection = document.getElementById("programma")
              if (programSection) {
                programSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 md:px-12 md:py-4 text-base md:text-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-500 rounded-full"
          >
            <span className="relative z-10">BEKIJK PROGRAMMA</span>
            <div className="absolute inset-0 h-full w-0 bg-white group-hover:w-full transition-all duration-500 ease-out z-0"></div>
          </button>
        </div>
      </section>


      {/* News Section - MOBILE ONLY */}
      <section className="w-full bg-[#0a0a0a] py-16 lg:hidden px-4 relative overflow-hidden">
        {/* Blurred Background to match hero */}
        <div className="absolute inset-0">
          <Image
            src="/fashionlabs-hero.png"
            alt="Background blur"
            fill
            className="object-cover opacity-20 blur-3xl scale-125"
          />
        </div>
        <div className="max-w-screen-xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl text-center mb-10 font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e0d4f0] to-[#b8a5d1] tracking-widest uppercase drop-shadow-md">
            POPULAIRE MOMENTS
          </h2>

          <div className="flex justify-center">
            {renderSlideshow(false)}
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="programma" className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#2d2438] py-20 px-4 relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-screen-xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl text-center mb-16 font-black text-white tracking-widest uppercase">
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
                {(() => {
                  if (expandedProgram !== item.id || !item.isExpandable) return null
                  const content = expandedContent[item.title]
                  if (!content) return null
                  return (
                    <div className="p-6 border-t border-white/10 bg-black/60 flex-grow animate-in slide-in-from-top-4 duration-500">
                      {content.image && (
                        <div className="mb-6 relative w-full h-48 rounded-xl overflow-hidden shadow-2xl">
                          <Image
                            src={content.image || "/placeholder.svg"}
                            alt={content.imageAlt || ""}
                            fill
                            className="object-cover transform hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      )}

                      <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">
                        {content.description}
                      </p>

                      {content.buttonText && content.buttonLink && (
                        <div className="mt-auto pt-2">
                          <a
                            href={content.buttonLink}
                            className="block w-full bg-[#9480AB] hover:bg-[#b8a5d1] text-white px-6 py-4 font-bold text-center rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#9480AB]/50 tracking-wider"
                          >
                            {content.buttonText}
                          </a>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            ))}
          </div>

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

      {/* Fullscreen Modal */}
      {isFullscreenOpen && fullscreenPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <div className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center">
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all z-10"
              aria-label="Close fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="relative w-full h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={fullscreenPhoto.image_url || "/placeholder.svg"}
                alt={fullscreenPhoto.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="absolute bottom-8 left-0 right-0 px-8">
              <div className="max-w-4xl mx-auto flex justify-between items-center bg-black/50 p-4 md:p-6 rounded-xl backdrop-blur-md">
                <div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold">{fullscreenPhoto.title}</h3>
                  <p className="text-white/70 text-base md:text-lg mt-1">by {fullscreenPhoto.user_name || "Anonymous"}</p>
                </div>
                <div className="flex items-center gap-3 bg-white/20 px-5 py-2 rounded-full">
                  <span className="text-red-500 text-2xl">❤️</span>
                  <span className="text-white font-bold text-xl">{fullscreenPhoto.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
