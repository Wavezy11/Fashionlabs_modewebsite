"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"

export default function FashionLabsApp() {
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(2) // Start at slide 3 (index 2)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  // Slideshow refs and state
  const slideshowRef = useRef<HTMLDivElement>(null)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const slides = [
    "/1.png?height=200&width=275&text=Slide+1",
    "/2.png?height=200&width=275&text=Slide+2",
    "/3.png?height=200&width=275&text=Slide+3",
    "/4.png?height=200&width=275&text=Slide+4",
    "/5.png?height=200&width=275&text=Slide+5",
  ]

  const courses = [
    {
      id: "fashion-designer",
      title: "Fashion Designer BOL",
      description: "Tijdens het basisdeel van deze fashion designer opleiding breng je de modewereld in.",
    },
    {
      id: "fashion-tailor",
      title: "Fashion-Tailor",
      description: "Tijdens het basisdeel van deze Fashion Tailor opleiding breng je de modewereld in beeld en...",
    },
    {
      id: "basismedewerker",
      title: "Basismedewerker-BOL",
      description: "Kun jij netjes werken en heb je gevoel voor stijl? Dan zit de opleiding Basismedewerker...",
    },
  ]

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
    startAutoSlide()
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
      }
    }
  }, [])

  // Handle slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
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

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
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
            className={`absolute top-0 left-0 w-full h-full bg-[#242424] z-[45] flex justify-center items-center transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <div className="w-full h-full flex flex-col justify-center items-center p-5 pt-[180px] pb-[80px]">
              <ul className="list-none text-center">
                {[
                  { name: "HOME", path: "/" },
                  { name: "PROGRAMMA", path: "/informatie" },
                  { name: "GRADUATION-EXPO", path: "/graduation-expo" },
                  { name: "GRADUATION-SHOW", path: "/graduation-show" },
                  { name: "TAILORSHOW", path: "/tailor-show" },
                  { name: "NIEUWS", path: "/" },
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
              <div className="relative w-full h-[500px] -top-[220px]">
                <Image
                  src="/fashionlabs-hero.png?height=500&width=390&text=Hero+Image"
                  alt="Hero"
                  width={390}
                  height={500}
                  className="w-full h-full object-cover absolute left-0 top-[30vh]"
                />
                <a href="/informatie">
                  <button className="absolute -bottom-[175px] left-1/2 transform -translate-x-1/2 bg-black text-white px-[29px] py-[14px] text-lg border-none cursor-pointer z-[2] font-bold">
                    PROGRAMMA
                  </button>
                </a>
              </div>

              {/* News Section */}
              <div className="h-[300px] w-full bg-white">
                <br />
                <h2 className="text-2xl text-center mb-5 font-bold">NIEUWS</h2>

                {/* Slideshow */}
                <div
                  className="absolute h-[200px] w-[275px] left-1/2 transform -translate-x-1/2 overflow-hidden"
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
                  <div
                    ref={slideshowRef}
                    className="flex w-full h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {slides.map((slide, index) => (
                      <div key={index} className="min-w-full h-full">
                        <Image
                          src={slide || "/placeholder.svg"}
                          alt={`Fashion Labs Slide ${index + 1}`}
                          width={275}
                          height={200}
                          className="w-full h-full object-cover"
                        />
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
                </div>
              </div>

              {/* Education Section */}
              <div className="h-[600px] w-full bg-[#9480AB] relative">
                <br />
                <h2 className="text-[19px] text-center mb-5 font-bold text-white">OPLEIDINGEN</h2>

                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`relative left-0 bg-white h-[20%] w-[75%] mb-5 ${
                      index === 0 ? "top-[2%]" : index === 1 ? "top-[7%]" : "top-[12%]"
                    }`}
                  >
                    <h2 className="text-base text-left mb-5 font-bold text-[#9480AB] absolute top-[15%] left-[5%]">
                      {course.title}
                    </h2>

                    <p className="text-[13.5px] mb-5 font-light text-black absolute top-[35%] left-[5%] w-[200px]">
                      {course.description}
                    </p>

                    {/* Decorative blocks */}
                    <div className="absolute right-0 top-0 h-[10%] w-[5%] bg-[#9480AB]"></div>
                    <div className="absolute right-[10%] top-0 h-[10%] w-[5%] bg-[#9480AB]"></div>
                    <div className="absolute right-0 top-[20%] h-[10%] w-[5%] bg-[#9480AB]"></div>

                    {/* Plus icon */}
                    <Plus
                      className="absolute w-6 h-6 right-[15px] top-1/2 transform -translate-y-1/2 cursor-pointer text-[#9480AB]"
                      onClick={() => toggleCourse(course.id)}
                    />
                  </div>
                ))}
              </div>

              {/* Sign Up Section */}
              <div className="h-[600px] w-full bg-white">
                <div className="relative top-0 left-0 w-full h-[30%]"></div>

                <div className="h-[60vh] w-[75%] justify-center items-center relative -top-[30%] left-[12.5%] rounded-b-[45px]">
                  <Image
                    src="/meeloopdag-foto.png?height=400&width=300&text=Student+Photo"
                    alt="Aanmelden foto"
                    width={300}
                    height={400}
                    className="h-full w-full object-cover justify-center items-center z-[4] relative"
                  />
                  <a href="/meeloopdag">
                    <button className="absolute bottom-[3.5%] left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-black text-white px-[29px] py-[14px] text-lg border-none cursor-pointer z-[20] font-bold">
                      AANMELDEN
                    </button>
                  </a>
                </div>

                <div className="h-[600px] w-full flex -top-[491px] justify-center items-center bg-[#9480AB] relative z-0">
                  <h2 className="text-[23px] text-center mb-5 font-bold text-white absolute top-[55%]">MEELOOPDAG</h2>
                  <p className="text-sm mb-5 font-light text-white absolute top-[60%] text-center w-[235px]">
                    Wil jij ervaren hoe het is om bij ons te studeren? Loop een dag mee! Volg de lessen, ontmoet
                    studenten en ontdek of de opleiding bij je past.
                  </p>
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
    </div>
  )
}
