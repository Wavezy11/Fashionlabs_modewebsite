"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function NewRegistration() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    status: "pending",
  })
  const [error, setError] = useState("")

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create registration")
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Er is een fout opgetreden bij het toevoegen van de registratie.")
    } finally {
      setIsSubmitting(false)
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
            className={`absolute top-0 left-0 w-full h-full bg-[#242424] z-[45] flex justify-center items-center transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <div className="w-full h-full flex flex-col justify-center items-center p-5 pt-[180px] pb-[80px]">
              <ul className="list-none text-center">
                {[
                  { name: "HOME", path: "/" },
                  { name: "PROGRAMMA", path: "/informatie" },
                  { name: "FASHIONSHOW", path: "/modeshow" },
                  { name: "TAILORSHOW", path: "/TAILERSHOW" },
                  { name: "NIEUWS", path: "/" },
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
            {/* White Title Section */}
            <div className="bg-white px-6 py-8 text-center relative z-10">
              <div className="flex items-center justify-center mb-4">
                <Link href="/dashboard" className="text-[#9480AB] mr-4 text-2xl">
                  ←
                </Link>
                <h1 className="text-2xl font-bold tracking-wide text-black">Nieuwe Aanmelding</h1>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white px-6 py-4">
              {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Voornaam*
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border-4 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Achternaam*
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border-4 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border-4 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 border-4 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-4 border-4 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] rounded-lg"
                  >
                    <option value="pending">In afwachting</option>
                    <option value="confirmed">Bevestigd</option>
                    <option value="cancelled">Geannuleerd</option>
                  </select>
                </div>

                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-12 py-4 text-lg font-bold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 rounded-lg"
                  >
                    {isSubmitting ? "BEZIG..." : "OPSLAAN"}
                  </button>
                </div>
              </form>
            </div>

            {/* Decorative Pixel Border */}
            <div
              className="w-full h-12"
              style={{
                backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), 
                                 linear-gradient(-45deg, #000 25%, transparent 25%), 
                                 linear-gradient(45deg, transparent 75%, #000 75%), 
                                 linear-gradient(-45deg, transparent 75%, #000 75%)`,
                backgroundSize: "16px 16px",
                backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                backgroundColor: "#B8A5D1",
              }}
            ></div>

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
