"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
// Verwijder deze regel:
// import supabaseClient from "@/lib/supabase"

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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-[390px] h-[844px] bg-white rounded-[60px] shadow-2xl overflow-hidden">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[210px] h-[30px] bg-black rounded-b-[15px] z-20 flex items-center justify-between px-4">
          <span className="text-white text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-[2px]">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-2 bg-white rounded-sm m-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-full pt-[30px] overflow-y-auto overflow-x-hidden">
          {/* Header */}
          <header className="h-[145px] bg-[#242424] relative flex items-center justify-between px-4 sticky top-0 z-10">
            {/* Menu Icon */}
            <div className="w-8 h-8 cursor-pointer relative z-20" onClick={toggleMenu}>
              <div
                className={`absolute w-full h-[3px] bg-[#9480AB] rounded transition-all duration-300 ${isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-2"}`}
              ></div>
              <div
                className={`absolute w-full h-[3px] bg-[#9480AB] rounded transition-all duration-300 ${isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-2"}`}
              ></div>
            </div>

            {/* Fashion Labs Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#9480AB] rounded-sm mb-1 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
                </div>
                <div className="text-white text-xs font-bold">
                  <div>FASHION</div>
                  <div>LABS</div>
                </div>
              </div>
            </div>

            {/* Yonder Text */}
            <div className="text-white text-lg font-light tracking-wider">yonder</div>
          </header>

          {/* Navigation Menu Overlay */}
          <div
            className={`fixed inset-0 bg-black z-30 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <div className="flex flex-col justify-between h-full pt-32 pb-12 px-8">
              <nav className="text-center">
                <ul className="space-y-8">
                  <li>
                    <Link
                      href="/"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      MEELOOPDAG
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="text-[#9480AB] text-xl font-bold tracking-wide">
                      DASHBOARD
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex justify-center items-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#9480AB] rounded-sm mb-2 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white rounded-sm"></div>
                  </div>
                  <div className="text-white text-sm font-bold">
                    <div>FASHION</div>
                    <div>LABS</div>
                  </div>
                </div>
                <div className="text-white text-lg font-light tracking-wider">yonder</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-white">
            {/* Title */}
            <div className="flex items-center px-4 py-5">
              <Link href="/dashboard" className="text-[#9480AB] mr-2">
                &larr;
              </Link>
              <h1 className="text-xl font-bold tracking-wider">NIEUWE AANMELDING</h1>
            </div>

            {/* Form */}
            <div className="px-8 py-4">
              {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Voornaam*
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Achternaam*
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  >
                    <option value="pending">In afwachting</option>
                    <option value="confirmed">Bevestigd</option>
                    <option value="cancelled">Geannuleerd</option>
                  </select>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-12 py-4 text-lg font-bold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "BEZIG..." : "OPSLAAN"}
                  </button>
                </div>
              </form>
            </div>

            {/* Checkered Pattern */}
            <div
              className="w-full h-10 mt-8"
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
            <footer className="bg-[#1a1a1a] text-white px-8 py-8">
              <div className="space-y-6">
                <div className="flex justify-center items-center gap-8 py-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-[#9480AB] rounded-sm mb-2 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white rounded-sm"></div>
                    </div>
                    <div className="text-white text-sm font-bold">
                      <div>FASHION</div>
                      <div>LABS</div>
                    </div>
                  </div>
                  <div className="text-white text-lg font-light tracking-wider">yonder</div>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
