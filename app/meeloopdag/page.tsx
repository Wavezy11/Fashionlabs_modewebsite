"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

export default function MeeloopDag() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        window.location.href = "/success"
      } else {
        alert("Er is een fout opgetreden. Probeer het opnieuw.")
      }
    } catch (error) {
      alert("Er is een fout opgetreden. Probeer het opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center md:p-4 p-0">
      <div className="relative w-full h-full md:w-[390px] md:h-[844px] bg-white md:rounded-[60px] md:shadow-2xl overflow-hidden">
        {/* Screen Content */}
        <div className="h-full pt-[0] overflow-y-auto overflow-x-hidden">
          {/* Header */}
          <header className={`h-[145px] w-full sticky top-0 bg-[#242424] z-50 flex ${isMenuOpen ? "relative" : ""}`}>
            {/* Logo */}
            <div className="absolute left-[38%] top-[22.5%] h-full flex">
              <Image
                src="/fashionlabs.png"
                alt="Fashion Labs Logo"
                width={150}
                height={150}
                className="max-h-[100px] max-w-[100px] object-contain mx-autoh"
              />
            </div>

            {/* Yonder */}
            <div className="absolute top-[37%] left-[5%] max-h-[68px] h-full flex items-center justify-center pr-5">
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
            <div className="absolute top-[52%] right-[5%] max-h-5 h-full flex items-center justify-center pr-5 z-[60]">
              <div className="relative w-[30px] h-[30px] cursor-pointer" onClick={toggleMenu}>
                <span
                  className={`absolute w-full h-[3px] bg-[#9480AB] rounded-sm top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
                ></span>
                <span
                  className={`absolute w-[3px] h-full bg-[#9480AB] rounded-sm left-1/2 top-0 transform -translate-x-1/2 transition-all duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
                ></span>
              </div>
            </div>
          </header>

          {/* Navigation Menu Overlay */}
          <div
            className={`absolute top-0 left-0 w-full h-full bg-black z-[45] flex justify-center items-center transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <div className="w-full h-full flex flex-col justify-between p-5 pt-[100px] pb-[50px]">
              <ul className="list-none text-center mt-[60px]">
                {[
                  { name: "HOME", path: "/" },
                  { name: "MEELOOPDAG", path: "/meeloopdag" },
                  { name: "PROGRAMMA", path: "/programma" },
                  { name: "MODESHOW", path: "/modeshow" },
                  { name: "NIEUWS", path: "/nieuws" },
                  { name: "FAVORIETEN", path: "/favorieten" },
                  { name: "CONTACT", path: "/contact" },
                ].map((item) => (
                  <li key={item.name} className="mb-[30px]">
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

              <div className="flex justify-center items-center gap-5 mb-10">
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
                    width={120}
                    height={40}
                    className="max-h-10 max-w-[120px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-white relative">
            {/* Title */}
            <h1 className="text-xl font-bold text-center py-5 tracking-wider">MEELOOPDAG</h1>

            {/* Hero Image Section with Decorative Elements */}
            <div className="w-full px-8 mb-0 relative">
              <div className="relative w-full h-[220px] rounded-lg overflow-hidden">
                <Image src="/meeloopdag-hero.png" alt="Fashion Labs studenten" fill className="object-cover" />
              </div>

              {/* Decorative Cross SVGs positioned around hero image */}
              {/* Left side crosses */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-4 left-4 z-10"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="12"
                height="12"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-12 left-2 z-10"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              {/* Right side crosses */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-6 right-6 z-10"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="10"
                height="10"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2 right-2 z-10"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              {/* Additional crosses extending into purple section */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-[-10px] left-12 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>

              <svg
                width="16"
                height="16"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-[-8px] right-16 z-20"
              >
                <path
                  d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z"
                  fill="#9480AB"
                />
              </svg>
            </div>

            {/* Info Section */}
            <div className="bg-[#9480AB] text-white px-8 py-12 text-center relative">
              <p className="text-base leading-relaxed">
                Wil jij ervaren hoe het is om bij ons te studeren? Loop een dag mee! Volg de lessen, ontmoet studenten
                en ontdek of de opleiding bij je past.
              </p>
            </div>

            {/* Registration Form */}
            <div className="px-8 py-6 bg-white">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="Voornaam*"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Achternaam*"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobiele Telefoonnummer"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                />

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-12 py-4 text-lg font-bold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "BEZIG..." : "REGISTREER"}
                  </button>
                </div>
              </form>
            </div>

            {/* Checkered Pattern */}
            <div
              className="w-full h-10"
              style={{
                backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), 
                                 linear-gradient(-45deg, #000 25%, transparent 25%), 
                                 linear-gradient(45deg, transparent 75%, #000 75%), 
                                 linear-gradient(-45deg, transparent 75%, #000 75%)`,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }}
            ></div>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white p-[30px_20px_20px] relative">
              <div className="flex justify-between max-w-[1200px] mx-auto pb-5">
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

              <div className="flex justify-center mt-2.5">
                <button
                  onClick={() => {
                    const screen =
                      document.querySelector(".h-full.pt-\\[0\\].overflow-y-auto.overflow-x-hidden") || window
                    if (screen && "scrollTo" in screen) {
                      screen.scrollTo({ top: 0, behavior: "smooth" })
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  }}
                  className="bg-white text-[#1a1a1a] border-none p-[12px_20px] w-full max-w-[300px] text-center text-base cursor-pointer transition-colors hover:bg-[#f0f0f0]"
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
