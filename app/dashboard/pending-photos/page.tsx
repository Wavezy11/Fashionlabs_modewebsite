"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

type PendingPhoto = {
  id: string
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
  const [fadingPhotos, setFadingPhotos] = useState<Set<string>>(new Set())

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    async function fetchPendingPhotos() {
      try {
        const response = await fetch("/api/pending-photos")
        if (response.ok) {
          const data = await response.json()
          setPendingPhotos(data)
        }
      } catch (error) {
        console.error("Error fetching pending photos:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPendingPhotos()
  }, [])

  const approvePhoto = async (id: string) => {
    try {
      const response = await fetch(`/api/pending-photos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      })

      if (response.ok) {
        setPendingPhotos((prev) => prev.map((photo) => (photo.id === id ? { ...photo, status: "approved" } : photo)))

        // Voeg toe aan fading set en verwijder na 2 seconden
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

  const rejectPhoto = async (id: string) => {
    try {
      const response = await fetch(`/api/pending-photos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected" }),
      })

      if (response.ok) {
        setPendingPhotos((prev) => prev.map((photo) => (photo.id === id ? { ...photo, status: "rejected" } : photo)))

        // Voeg toe aan fading set en verwijder na 2 seconden
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

  const deletePhoto = async (id: string) => {
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

  // Rest van de component blijft hetzelfde tot de foto mapping...
  // In de foto mapping sectie, vervang de bestaande map functie met:

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
                      href="/dashboard"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      DASHBOARD
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/pending-photos" className="text-[#9480AB] text-xl font-bold tracking-wide">
                      FOTO GOEDKEURING
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
                ←
              </Link>
              <h1 className="text-xl font-bold tracking-wider">FOTO GOEDKEURING</h1>
            </div>

            {/* Pending Photos */}
            <div className="px-4 pb-6">
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
                                e.target.src = "/placeholder.svg?height=200&width=200"
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
          </main>
        </div>
      </div>
    </div>
  )
}
