"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

type PendingPhoto = {
  id: number
  title: string
  description: string
  image_url: string
  user_name: string
  email: string
  created_at: string
  status: "pending" | "approved" | "rejected"
}

export default function PendingPhotosPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fadingPhotos, setFadingPhotos] = useState<Set<number>>(new Set())

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

  useEffect(() => {
    async function fetchPendingPhotos() {
      try {
        const response = await fetch("/api/pending-photos")
        if (response.ok) {
          const result = await response.json()
          setPendingPhotos(result.data || []) // Fix: extract the data array
        }
      } catch (error) {
        console.error("Error fetching pending photos:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPendingPhotos()
  }, [])

  const approvePhoto = async (id: number) => {
    try {
      const response = await fetch(`/api/pending-photos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      })

      if (response.ok) {
        setPendingPhotos((prev) => prev.map((photo) => (photo.id === id ? { ...photo, status: "approved" } : photo)))

        setFadingPhotos((prev) => new Set(prev).add(id))
        setTimeout(() => {
          setPendingPhotos((prev) => prev.filter((photo) => photo.id !== id))
          setFadingPhotos((prev) => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
          })
        }, 2000)
      }
    } catch (error) {
      console.error("Error approving photo:", error)
    }
  }

  const rejectPhoto = async (id: number) => {
    try {
      const response = await fetch(`/api/pending-photos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected" }),
      })

      if (response.ok) {
        setPendingPhotos((prev) => prev.map((photo) => (photo.id === id ? { ...photo, status: "rejected" } : photo)))

        setFadingPhotos((prev) => new Set(prev).add(id))
        setTimeout(() => {
          setPendingPhotos((prev) => prev.filter((photo) => photo.id !== id))
          setFadingPhotos((prev) => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
          })
        }, 2000)
      }
    } catch (error) {
      console.error("Error rejecting photo:", error)
    }
  }

  const deletePhoto = async (id: number) => {
    if (confirm("Weet je zeker dat je deze foto wilt verwijderen?")) {
      try {
        const response = await fetch(`/api/pending-photos/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setPendingPhotos((prev) => prev.filter((photo) => photo.id !== id))
        }
      } catch (error) {
        console.error("Error deleting photo:", error)
      }
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
                  { name: "GRADUATION-EXPO", path: "/graduation-expo" },
                  { name: "GRADUATION-SHOW", path: "/graduation-show" },
                  { name: "FASHION-SHOW", path: "/fashion-show" },
                  { name: "TICKETS", path: "/tickets" },
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
              <div className="flex items-center">
                <Link href="/dashboard" className="text-[#9480AB] mr-2">
                  ←
                </Link>
                <h1 className="text-2xl font-bold tracking-wide text-black">Foto Goedkeuring</h1>
              </div>
            </div>

            {/* Pending Photos */}
            <div className="bg-white px-6 py-6">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-[#9480AB] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingPhotos.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">Geen foto's in afwachting van goedkeuring</p>
                  ) : (
                    pendingPhotos.map((photo) => {
                      const isFading = fadingPhotos.has(photo.id)
                      const isRejected = photo.status === "rejected"

                      return (
                        <div
                          key={photo.id}
                          className={`border border-gray-200 rounded-md overflow-hidden transition-all duration-1000 ${
                            isFading ? (isRejected ? "opacity-30 grayscale" : "opacity-60 scale-95") : ""
                          }`}
                        >
                          <div className="aspect-square bg-gray-100 relative">
                            <img
                              src={photo.image_url || "/placeholder.svg"}
                              alt={photo.title}
                              className={`w-full h-full object-cover transition-all duration-1000 ${
                                isFading && isRejected ? "grayscale" : ""
                              }`}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg?height=200&width=200"
                              }}
                            />
                            <div
                              className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded transition-all duration-500 ${
                                photo.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : photo.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {photo.status === "pending"
                                ? "In afwachting"
                                : photo.status === "approved"
                                  ? "✅ Goedgekeurd"
                                  : "❌ Afgekeurd"}
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-bold">{photo.title}</h3>
                            <p className="text-sm text-gray-600 mb-1">{photo.description}</p>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Door: {photo.user_name}</span>
                              <span>{photo.email}</span>
                            </div>
                            <div className="flex justify-between mt-3">
                              <div className="space-x-2">
                                {photo.status === "pending" && !isFading && (
                                  <>
                                    <button
                                      onClick={() => approvePhoto(photo.id)}
                                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                                    >
                                      ✅ Goedkeuren
                                    </button>
                                    <button
                                      onClick={() => rejectPhoto(photo.id)}
                                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                                    >
                                      ❌ Afkeuren
                                    </button>
                                  </>
                                )}
                                {photo.status === "approved" && isFading && (
                                  <span className="text-green-600 text-sm font-medium">Toegevoegd aan foto's! 🎉</span>
                                )}
                                {photo.status === "rejected" && isFading && (
                                  <span className="text-red-600 text-sm font-medium">Foto afgekeurd</span>
                                )}
                              </div>
                              {!isFading && (
                                <button
                                  onClick={() => deletePhoto(photo.id)}
                                  className="text-red-600 text-sm hover:text-red-800"
                                >
                                  Verwijderen
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </div>

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
