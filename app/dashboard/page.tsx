"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"registrations" | "photos" | "events">("registrations")
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const deletePhoto = async (id) => {
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

  const deleteRegistration = async (id) => {
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

  const deleteEvent = async (id) => {
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
                    <Link
                      href="/tickets"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      MODESHOW
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/informatie"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      INFORMATIE
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/favorieten"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      FAVORIETEN
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-white text-xl font-bold tracking-wide hover:text-[#9480AB] transition-colors"
                    >
                      CONTACT
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
            <div className="flex justify-between items-center px-4 py-2">
              <h1 className="text-xl font-bold tracking-wider">DASHBOARD</h1>
              <Link href="/dashboard/pending-photos" className="bg-[#9480AB] text-white px-3 py-1 rounded text-sm">
                Foto Goedkeuring
              </Link>
            </div>

            {/* Tabs */}
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

            {/* Tab Content */}
            <div className="p-4">
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
                                  e.target.src = "/placeholder.svg?height=200&width=200"
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
                            <div className="flex justify-end mt-2">
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
                <nav>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <span className="text-[#9480AB] text-xl font-bold mr-3">+</span>
                      <Link href="#" className="text-base hover:underline">
                        Voor studenten
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#9480AB] text-xl font-bold mr-3">+</span>
                      <Link href="#" className="text-base hover:underline">
                        Voor volwassenen
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#9480AB] text-xl font-bold mr-3">+</span>
                      <Link href="#" className="text-base hover:underline">
                        Voor bedrijven
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#9480AB] text-xl font-bold mr-3">+</span>
                      <Link href="#" className="text-base hover:underline">
                        Over FashionLabs
                      </Link>
                    </li>
                  </ul>
                </nav>

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

                <div className="text-center">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="bg-white text-black px-8 py-3 w-full max-w-xs text-base font-medium hover:bg-gray-100 transition-colors"
                  >
                    Terug naar boven
                  </button>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
