"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "../../hooks/useAuth"

// Types voor onze data
type Registration = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  created_at: string
  status: string
}

type Photo = {
  id: string
  title: string
  description: string
  image_url: string
  likes: number
  created_at: string
  user_name: string
}

type Event = {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  created_at: string
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"registrations" | "photos" | "events">("registrations")
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const deletePhoto = async (id: string) => {
    if (confirm("Weet je zeker dat je deze foto wilt verwijderen?")) {
      try {
        const response = await fetch(`/api/photos/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setPhotos(photos.filter((photo) => photo.id !== id))
        }
      } catch (error) {
        console.error("Error deleting photo:", error)
      }
    }
  }

  const deleteRegistration = async (id: string) => {
    if (confirm("Weet je zeker dat je deze aanmelding wilt verwijderen?")) {
      try {
        const response = await fetch(`/api/registrations/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setRegistrations(registrations.filter((reg) => reg.id !== id))
        }
      } catch (error) {
        console.error("Error deleting registration:", error)
      }
    }
  }

  const deleteEvent = async (id: string) => {
    if (confirm("Weet je zeker dat je dit evenement wilt verwijderen?")) {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setEvents(events.filter((event) => event.id !== id))
        }
      } catch (error) {
        console.error("Error deleting event:", error)
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        if (activeTab === "registrations") {
          const response = await fetch("/api/registrations")
          const data = await response.json()
          if (response.ok) {
            setRegistrations(data)
          }
        } else if (activeTab === "photos") {
          const response = await fetch("/api/photos")
          const data = await response.json()
          if (response.ok) {
            setPhotos(data)
          }
        } else if (activeTab === "events") {
          const response = await fetch("/api/events")
          const data = await response.json()
          if (response.ok) {
            setEvents(data)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [activeTab])

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
            <div className="w-full h-full flex flex-col justify-center items-center p-5 pt-[160px] pb-[60px]">
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
                  { name: "DASHBOARD", path: "/dashboard" },
                ].map((item) => (
                  <li key={item.name} className="mb-[16px]">
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`no-underline text-xl font-bold tracking-wide transition-colors duration-300 ${
                        item.name === "DASHBOARD" ? "text-[#9480AB]" : "text-white hover:text-[#9480AB]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {/* Logout Button */}
                <li className="mb-[20px] mt-8">
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="text-red-400 no-underline text-xl font-bold tracking-wide hover:text-red-300 transition-colors duration-300 bg-transparent border-none cursor-pointer"
                  >
                    UITLOGGEN
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-white relative">
            {/* White Title Section */}
            <div className="bg-white px-6 py-8 text-center relative z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold tracking-wide text-black">Dashboard</h1>
                  {user && <p className="text-sm text-gray-600">Welkom, {user.username}</p>}
                </div>
                <div className="flex gap-2">
                  <Link href="/dashboard/pending-photos" className="bg-[#9480AB] text-white px-3 py-1 rounded text-sm">
                    Foto Goedkeuring
                  </Link>
               
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Uitloggen
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white px-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-3 text-center font-medium ${activeTab === "registrations" ? "text-[#9480AB] border-b-2 border-[#9480AB]" : "text-gray-500"}`}
                  onClick={() => setActiveTab("registrations")}
                >
                  Aanmeldingen
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium ${activeTab === "photos" ? "text-[#9480AB] border-b-2 border-[#9480AB]" : "text-gray-500"}`}
                  onClick={() => setActiveTab("photos")}
                >
                  Foto's
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium ${activeTab === "events" ? "text-[#9480AB] border-b-2 border-[#9480AB]" : "text-gray-500"}`}
                  onClick={() => setActiveTab("events")}
                >
                  Evenementen
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white px-6 py-6">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-[#9480AB] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {/* Registrations Tab */}
                  {activeTab === "registrations" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Meeloopdag Aanmeldingen</h2>
                        <Link
                          href="/dashboard/registrations/new"
                          className="bg-[#9480AB] text-white px-3 py-1 rounded text-sm"
                        >
                          + Nieuw
                        </Link>
                      </div>

                      <div className="space-y-3">
                        {registrations.map((reg) => (
                          <div key={reg.id} className="border border-gray-200 p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-bold">
                                  {reg.first_name} {reg.last_name}
                                </p>
                                <p className="text-sm text-gray-600">{reg.email}</p>
                                {reg.phone && <p className="text-sm text-gray-600">{reg.phone}</p>}
                              </div>
                              <div>
                                <span
                                  className={`text-xs px-2 py-1 rounded ${
                                    reg.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : reg.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {reg.status === "confirmed"
                                    ? "Bevestigd"
                                    : reg.status === "pending"
                                      ? "In afwachting"
                                      : "Geannuleerd"}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>Aangemeld op: {new Date(reg.created_at).toLocaleDateString("nl-NL")}</span>
                              <div className="flex gap-2">
                                <Link href={`/dashboard/registrations/${reg.id}`} className="text-[#9480AB]">
                                  Bewerken
                                </Link>
                                <button onClick={() => deleteRegistration(reg.id)} className="text-red-600">
                                  Verwijderen
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {registrations.length === 0 && (
                          <p className="text-center py-8 text-gray-500">Geen aanmeldingen gevonden</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Photos Tab */}
                  {activeTab === "photos" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Foto's</h2>
                        <Link
                          href="/dashboard/photos/new"
                          className="bg-[#9480AB] text-white px-3 py-1 rounded text-sm"
                        >
                          + Upload
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {photos.map((photo) => (
                          <div key={photo.id} className="border border-gray-200 rounded-md overflow-hidden">
                            <div className="aspect-square bg-gray-100 relative">
                              <img
                                src={photo.image_url || "/placeholder.svg"}
                                alt={photo.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=200&width=200"
                                }}
                              />
                              <div className="absolute bottom-0 right-0 bg-white px-2 py-1 text-sm">
                                {photo.likes} ❤️
                              </div>
                            </div>
                            <div className="p-2">
                              <p className="font-bold text-sm truncate">{photo.title}</p>
                              <p className="text-xs text-gray-600">Door: {photo.user_name}</p>
                              <div className="flex justify-between mt-1">
                                <Link href={`/dashboard/photos/${photo.id}`} className="text-xs text-[#9480AB]">
                                  Bewerken
                                </Link>
                                <button onClick={() => deletePhoto(photo.id)} className="text-xs text-red-600">
                                  Verwijderen
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {photos.length === 0 && (
                        <p className="text-center py-8 text-gray-500 col-span-2">Geen foto's gevonden</p>
                      )}
                    </div>
                  )}

                  {/* Events Tab */}
                  {activeTab === "events" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Evenementen</h2>
                        <Link
                          href="/dashboard/events/new"
                          className="bg-[#9480AB] text-white px-3 py-1 rounded text-sm"
                        >
                          + Nieuw
                        </Link>
                      </div>

                      <div className="space-y-3">
                        {events.map((event) => (
                          <div key={event.id} className="border border-gray-200 p-3 rounded-md">
                            <div>
                              <p className="font-bold">{event.title}</p>
                              <p className="text-sm text-gray-600 line-clamp-1">{event.description}</p>
                              <div className="flex justify-between mt-2">
                                <p className="text-xs text-gray-500">
                                  {new Date(event.event_date).toLocaleDateString("nl-NL")} |{" "}
                                  {formatTime(event.event_date)}
                                </p>
                                <p className="text-xs text-gray-500">{event.location}</p>
                              </div>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                              <Link href={`/dashboard/events/${event.id}`} className="text-xs text-[#9480AB]">
                                Bewerken
                              </Link>
                              <button onClick={() => deleteEvent(event.id)} className="text-xs text-red-600">
                                Verwijderen
                              </button>
                            </div>
                          </div>
                        ))}

                        {events.length === 0 && (
                          <p className="text-center py-8 text-gray-500">Geen evenementen gevonden</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
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
                backgroundColor: "white",
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

