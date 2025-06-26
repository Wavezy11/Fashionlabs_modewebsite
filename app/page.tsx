"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"

export default function FashionLabsApp() {
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const [photos, setPhotos] = useState([])
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true)

  // Fullscreen state
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null)

  // Slideshow refs and state
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
          // Only use photos that have actual image URLs (not the old static ones)
          const validPhotos = data.filter(
            (photo) =>
              photo.image_url &&
              !photo.image_url.includes("/1.png") &&
              !photo.image_url.includes("/2.png") &&
              !photo.image_url.includes("/3.png") &&
              !photo.image_url.includes("/4.png") &&
              !photo.image_url.includes("/5.png"),
          )

          // Get top 5 photos sorted by likes for slideshow
          const topPhotos = validPhotos
            .map((photo) => ({
              ...photo,
              likes: Number(photo.likes) || 0,
              id: Number(photo.id),
            }))
            .sort((a, b) => b.likes - a.likes)
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

  // Auto slideshow functionality
  const startAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current)
    }
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

  // Initialize slideshow
  useEffect(() => {
    if (slides.length > 0) {
      startAutoSlide()
    }
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
      }
    }
  }, [slides.length])

  // Handle slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Fullscreen handlers
  const openFullscreen = (photo) => {
    setFullscreenPhoto(photo)
    setIsFullscreenOpen(true)
    pauseAutoSlide() // Pause slideshow when fullscreen opens
  }

  const closeFullscreen = () => {
    setIsFullscreenOpen(false)
    setFullscreenPhoto(null)
    startAutoSlide() // Resume slideshow when fullscreen closes
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoSlide()
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return
    const touchX = e.targetTouches[0].clientX
    const diff = touchStart - touchX
    // Visual feedback during drag could be added here
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    setTouchEnd(touchEndX)
    handleSwipe(touchStart, touchEndX)
    startAutoSlide()
  }

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    pauseAutoSlide()
    setIsDragging(true)
    setTouchStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    // Visual feedback during drag could be added here
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
        // Swipe left - next slide
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      } else {
        // Swipe right - previous slide
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      }
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProgram = (programId: string) => {
    setExpandedProgram(expandedProgram === programId ? null : programId)
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
        {/* Screen Content with hidden scrollbar */}
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
              </div>{" "}
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
                    <a
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white no-underline text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-white relative">
            {/* App Content */}
            <div className="relative w-full">
              {/* Hero Section */}
              <div className="relative w-full h-[500px] md:-top-[145px] -top-[220px]">
                <Image
                  src="/fashionlabs-hero.png?height=500&width=390&text=Hero+Image"
                  alt="Hero"
                  width={390}
                  height={500}
                  className="w-full h-full object-cover absolute left-0 md:top-[145px] top-[30vh]"
                />
                <button
                  onClick={() => {
                    const programSection = document.getElementById("programma")
                    if (programSection) {
                      programSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="absolute md:bottom-[0px] -bottom-[200px] left-1/2 transform -translate-x-1/2 bg-black text-white px-[29px] py-[14px] text-lg border-none cursor-pointer z-[2] font-bold"
                >
                  PROGRAMMA
                </button>
              </div>

              {/* News Section */}
              <div className="h-[300px] w-full bg-white md:mt-0 mt-0">
                <div className="pt-8">
                  <h2 className="text-2xl text-center mb-5 font-bold text-black">POPULAIRE MOMENTS</h2>
                </div>

                {/* Slideshow */}
                <div
                  className="relative h-[200px] w-[275px] left-1/2 transform -translate-x-1/2 overflow-hidden mt-4"
                  onMouseEnter={pauseAutoSlide}
                  onMouseLeave={startAutoSlide}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {isLoadingPhotos ? (
                    <div className="flex justify-center items-center w-full h-full">
                      <div className="w-8 h-8 border-4 border-[#9480AB] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : slides.length > 0 ? (
                    <>
                      <div
                        ref={slideshowRef}
                        className="flex w-full h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {slides.map((slide, index) => (
                          <div key={index} className="min-w-full h-full relative">
                            <Image
                              src={slide || "/placeholder.svg"}
                              alt={photos[index]?.title || `Fashion Labs Slide ${index + 1}`}
                              width={275}
                              height={200}
                              className="w-full h-full object-contain bg-gray-100"
                            />

                            {/* Fullscreen Button */}
                            {photos[index] && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openFullscreen(photos[index])
                                }}
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-200 z-10"
                                aria-label="View fullscreen"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
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

                            {photos[index] && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                <p className="text-white text-sm font-bold truncate">{photos[index].title}</p>
                                <p className="text-white/80 text-xs">❤️ {photos[index].likes}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Dots */}
                      <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-2">
                        {slides.map((_, index) => (
                          <span
                            key={index}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                              index === currentSlide ? "bg-[rgb(46,212,207)]" : "bg-[rgba(21,21,21,0.5)]"
                            }`}
                            onClick={() => goToSlide(index)}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center w-full h-full bg-gray-100">
                      <p className="text-gray-500 text-center">
                        Geen foto's beschikbaar.
                        <br />
                        Upload foto's in de MOMENTS sectie!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Program Section */}
              <div id="programma" className="w-full bg-[#9480AB] relative px-4 py-8">
                <h2 className="text-2xl text-center mb-8 font-bold text-white">PROGRAMMA</h2>

                <div className="space-y-4">
                  {programItems.map((item) => (
                    <div key={item.id} className="space-y-2">
                      {/* Program Item */}
                      <div className="flex items-center">
                        {/* Time Box */}
                        <div className="bg-black text-white px-4 py-3 font-bold text-base min-w-[80px] text-center">
                          {item.time}
                        </div>

                        {/* Content Box */}
                        <div className="bg-white flex-1 px-4 py-3 flex items-center justify-between">
                          <h3 className="font-bold text-[#9480AB] text-base">{item.title}</h3>
                          {item.hasPlus && (
                            <button onClick={() => toggleProgram(item.id)} className="flex-shrink-0">
                              {expandedProgram === item.id ? (
                                <Minus className="w-6 h-6 text-[#9480AB]" />
                              ) : (
                                <Plus className="w-6 h-6 text-[#9480AB]" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Location Text */}
                      <div className="text-white text-sm pl-4">{item.location}</div>

                      {/* Expanded Content */}
                      {expandedProgram === item.id && item.isExpandable && expandedContent[item.title] && (
                        <div className="bg-white mx-4 p-4 rounded-lg shadow-lg">
                          {/* Image for Digital Alumni talk and AI talk */}
                          {expandedContent[item.title].image && (
                            <div className="mb-4 flex justify-center">
                              <Image
                                src={expandedContent[item.title].image || "/placeholder.svg"}
                                alt={expandedContent[item.title].imageAlt}
                                width={250}
                                height={150}
                                className="rounded-lg object-cover shadow-md hover:opacity-90 transition-opacity duration-300"
                              />
                            </div>
                          )}

                          <p
                            className={`text-gray-800 text-sm leading-relaxed mb-4 ${expandedContent[item.title].image ? "text-center" : ""}`}
                          >
                            {expandedContent[item.title].description}
                          </p>

                          {/* Only show button if buttonText and buttonLink exist */}
                          {expandedContent[item.title].buttonText && expandedContent[item.title].buttonLink && (
                            <div className="flex justify-center">
                              <a
                                href={expandedContent[item.title].buttonLink}
                                className="bg-[#9480AB] text-white px-6 py-3 font-bold text-center inline-block rounded hover:bg-[#7a6b8a] transition-colors duration-300"
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

                {/* Tickets Button */}
                <div className="flex justify-center mt-8">
                  <a
                    href="https://www.eventbrite.nl/e/tickets-fashionlabs-1381853935319?fbclid=PAQ0xDSwKwKUNleHRuA2FlbQIxMQABp4ocJPBgfjIqi1ua-_JlHSGOyiXEDBmXJzG4kF8ZTOrgPbzjyxd7IKqXzUGY_aem_K8Ypz8ffKNjdWUrYXamk-g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-8 py-3 font-bold text-center inline-block min-w-[200px]"
                  >
                    TICKETS
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white p-[20px] relative">
              <div className="flex justify-between w-full pb-5">
                <div>
                  <ul className="list-none">
                    {[
                      { name: "Voor studenten", path: "/voor-studenten" },
                      { name: "Voor volwassenen", path: "/voor-volwassenen" },
                      { name: "Voor bedrijven", path: "/voor-bedrijven" },
                      { name: "Over FashionLabs", path: "/over-fashionlabs" },
                    ].map((item) => (
                      <li key={item.name} className="mb-[15px] flex items-center">
                        <span className="text-[#9480AB] mr-2.5 font-bold text-lg">+</span>
                        <a href={item.path} className="text-white no-underline text-base hover:underline">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
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

              {/* Button moved outside footer */}
            </footer>
            {/* Back to top button - full width at bottom */}
            <div className="w-full">
              <button
                onClick={scrollToTop}
                className="bg-white text-[#1a1a1a] border-none p-4 w-full text-center text-base cursor-pointer transition-colors hover:bg-[#f0f0f0] font-medium rounded-t-lg"
              >
                Terug naar boven
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreenOpen && fullscreenPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 overflow-hidden"
          onClick={closeFullscreen}
        >
          <div className="relative w-full h-full max-w-6xl flex flex-col">
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Close fullscreen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Image Container - Responsive sizing */}
            <div
              className="flex-1 flex items-center justify-center min-h-0 pb-20 md:pb-24"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullscreenPhoto.image_url || "/placeholder.svg"}
                alt={fullscreenPhoto.title}
                className="max-w-full max-h-full object-contain w-auto h-auto"
                style={{
                  maxHeight: "calc(100vh - 200px)", // Reserve space for title/controls
                  maxWidth: "calc(100vw - 32px)", // Account for padding
                }}
              />
            </div>

            {/* Title Section - Fixed at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
              <div className="flex justify-between items-center max-w-6xl mx-auto">
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-bold">{fullscreenPhoto.title}</h3>
                  <p className="text-white/70 text-sm md:text-base">by {fullscreenPhoto.user_name || "Anonymous"}</p>
                </div>

                <div className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 bg-white/20">
                  <span className="text-red-500 text-xl">❤️</span>
                  <span className="text-white font-bold text-lg">{fullscreenPhoto.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
