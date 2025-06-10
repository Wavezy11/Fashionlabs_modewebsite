"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Inloggen mislukt")
      }
    } catch (err) {
      setError("Er is een fout opgetreden")
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
          {/* Header - Fixed Position */}
          <header className="fixed top-[30px] left-0 right-0 h-[145px] bg-[#242424] flex items-center justify-between px-4 z-10 w-[390px] mx-auto">
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
                <img src="/placeholder.svg?height=32&width=32" alt="Fashion Labs Logo" className="w-8 h-8 mb-1" />
                <img src="/placeholder.svg?height=24&width=60" alt="Fashion Labs Text" className="h-6" />
              </div>
            </div>

            {/* Yonder Logo */}
            <img src="/placeholder.svg?height=18&width=60" alt="Yonder" className="h-[18px]" />
          </header>

          {/* Navigation Menu Overlay */}
          <div
            className={`fixed inset-0 bg-black z-30 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            onClick={toggleMenu}
          >
            <div className="flex flex-col justify-between h-full pt-32 pb-12 px-8" onClick={(e) => e.stopPropagation()}>
              <nav className="text-center">
                <ul className="space-y-8">
                  <li>
                    <Link
                      href="/"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      MEELOOPDAG
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tickets"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      MODESHOW
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/informatie"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      INFORMATIE
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/favorieten"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      FAVORIETEN
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                      onClick={toggleMenu}
                    >
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex justify-center items-center gap-8">
                <div className="flex flex-col items-center">
                  <img src="/placeholder.svg?height=48&width=48" alt="Fashion Labs Logo" className="w-12 h-12 mb-2" />
                  <img src="/placeholder.svg?height=32&width=80" alt="Fashion Labs Text" className="h-8" />
                </div>
                <img src="/placeholder.svg?height=18&width=60" alt="Yonder" className="h-[18px]" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-white pt-[145px]">
            {/* Login Form */}
            <div className="flex flex-col items-center justify-center px-8 py-20">
              <h1 className="text-3xl font-bold mb-8">INLOGGEN</h1>

              {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm w-full">{error}</div>}

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Gebruikersnaam*"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Wachtwoord*"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 border border-[#9480AB] text-base outline-none focus:border-[#7a6b8a]"
                  required
                />

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-12 py-4 text-lg font-bold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "BEZIG..." : "INLOGGEN"}
                  </button>
                </div>
              </form>

              <p className="mt-4 text-sm text-gray-600">Test inloggegevens: admin / admin123</p>
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
            <footer className="bg-[#1a1a1a] text-white px-8 py-8">
              <div className="space-y-6">
                <div className="flex justify-center items-center gap-8 py-4">
                  <div className="flex flex-col items-center">
                    <img src="/placeholder.svg?height=40&width=40" alt="Fashion Labs Logo" className="w-10 h-10 mb-2" />
                    <img src="/placeholder.svg?height=24&width=60" alt="Fashion Labs Text" className="h-6" />
                  </div>
                  <img src="/placeholder.svg?height=18&width=60" alt="Yonder" className="h-[18px]" />
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
