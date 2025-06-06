"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
// Verwijder deze regel:
// import supabaseClient from "@/lib/supabase"

export default function NewEvent() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
  })
  const [error, setError] = useState("")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Combineer datum en tijd voor de database
      const dateTimeString = `${formData.event_date} ${formData.event_time}:00`

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          event_date: dateTimeString,
          location: formData.location,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create event")
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Er is een fout opgetreden bij het toevoegen van het evenement.")
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
              <h1 className="text-xl font-bold tracking-wider">NIEUW EVENEMENT</h1>
            </div>

            {/* Form */}
            <div className="px-8 py-4">
              {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Titel*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Beschrijving
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  />
                </div>

                <div>
                  <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-1">
                    Datum*
                  </label>
                  <input
                    type="date"
                    id="event_date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  />
                </div>

                <div>
                  <label htmlFor="event_time" className="block text-sm font-medium text-gray-700 mb-1">
                    Tijd*
                  </label>
                  <input
                    type="time"
                    id="event_time"
                    name="event_time"
                    value={formData.event_time}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Locatie*
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-12 py-4 text-lg font-bold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Evenement toevoegen..." : "Evenement toevoegen"}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
