"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function FavorietenPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [likedPhotos, setLikedPhotos] = useState(new Set())

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch("/api/photos")
        if (response.ok) {
          const data = await response.json()
          // Ensure likes are numbers and sort by likes in descending order
          const sortedData = data
            .map((photo) => ({
              ...photo,
              likes: Number(photo.likes) || 0,
              id: Number(photo.id),
            }))
            .sort((a, b) => b.likes - a.likes)
          setPhotos(sortedData)
        }
      } catch (error) {
        console.error("Error fetching photos:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPhotos()
  }, [])

  useEffect(() => {
    // Load liked photos from localStorage
    const savedLikes = localStorage.getItem("likedPhotos")
    if (savedLikes) {
      setLikedPhotos(new Set(JSON.parse(savedLikes)))
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLike = async (photoId) => {
    // Check if photo is already liked
    if (likedPhotos.has(photoId)) {
      alert("Je hebt deze foto al geliked!")
      return
    }

    try {
      const response = await fetch(`/api/photos/${photoId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const updatedPhoto = await response.json()
        console.log("Like updated successfully:", updatedPhoto)

        // Update the photos array with the new likes count
        setPhotos((prevPhotos) => {
          const newPhotos = prevPhotos.map((photo) => {
            if (photo.id === photoId) {
              return { ...photo, likes: Number(updatedPhoto.likes) }
            }
            return photo
          })

          // Sort by likes in descending order
          return newPhotos.sort((a, b) => Number(b.likes) - Number(a.likes))
        })

        // If we're in fullscreen mode, update the fullscreen photo too
        if (fullscreenPhoto && fullscreenPhoto.id === photoId) {
          setFullscreenPhoto((prevPhoto) => ({
            ...prevPhoto,
            likes: Number(updatedPhoto.likes),
          }))
        }

        // Add to liked photos and save to localStorage
        const newLikedPhotos = new Set(likedPhotos)
        newLikedPhotos.add(photoId)
        setLikedPhotos(newLikedPhotos)
        localStorage.setItem("likedPhotos", JSON.stringify([...newLikedPhotos]))
      } else {
        const errorData = await response.json()
        console.error("Error liking photo:", errorData)
      }
    } catch (error) {
      console.error("Error liking photo:", error)
    }
  }

  const openFullscreen = (photo) => {
    setFullscreenPhoto(photo)
    setIsFullscreenOpen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreenOpen(false)
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
                  { name: "PROGRAMMA", path: "/programma" },
                  { name: "FASHIONSHOW", path: "/modeshow" },
                  { name: "TAILORSHOW", path: "/TAILERSHOW" },
                  { name: "NIEUWS", path: "/nieuws" },
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
            {/* Title */}
            <h1 className="text-xl font-bold text-center py-5 tracking-wider">FAVORIETEN</h1>

            {/* Favorites Info */}
            <div className="px-8 pb-6">
              <p className="text-center mb-8 bg-[#9480AB] p-4 text-white">
                Bij Favorieten vind je de mooiste foto&apos;s van onze bezoekers! Upload je eigen foto, verzamel likes
                en maak kans op €100. De winnaar wordt een maand na de show bekendgemaakt op onze socials!
              </p>

              <h2 className="font-bold text-lg mb-4">FOTO&apos;S VAN FASHIONLABS 2024</h2>

              {/* Photo Grid - Single Column Layout */}
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-[#9480AB] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-8 mb-8">
                  {photos.map((photo, index) => (
                    <div key={photo.id} className="relative mx-auto max-w-[320px]">
                      {/* Photo Container */}
                      <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={photo.image_url || "/placeholder.svg"}
                          alt={photo.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=300&width=400"
                          }}
                        />

                        {/* Fullscreen Button */}
                        <button
                          onClick={() => openFullscreen(photo)}
                          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-200"
                          aria-label="View fullscreen"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                          </svg>
                        </button>

                        {/* Overlay with title and like button */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-white font-bold text-lg mb-1">{photo.title}</p>
                              <p className="text-white/80 text-sm">by {photo.user_name || "Anonymous"}</p>
                            </div>

                            {/* Like Button and Count */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleLike(photo.id)}
                                disabled={likedPhotos.has(photo.id)}
                                className={`flex items-center gap-1 backdrop-blur-sm rounded-full px-3 py-2 transition-all duration-200 active:scale-95 ${
                                  likedPhotos.has(photo.id)
                                    ? "bg-green-500/30 cursor-not-allowed"
                                    : "bg-white/20 hover:bg-white/30"
                                }`}
                              >
                                <span className="text-red-500 text-lg">❤️</span>
                                <span className="text-white font-bold">{photo.likes}</span>
                                {likedPhotos.has(photo.id) && <span className="text-green-400 text-sm ml-1">✓</span>}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Ranking Badge for top 3 */}
                        {index < 3 && (
                          <div className="absolute top-3 left-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"
                              }`}
                            >
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              <div className="flex justify-center">
                <Link
                  href="/dashboard/photos/new"
                  className="bg-black text-white px-12 py-4 text-lg font-bold tracking-wide hover:bg-gray-800 transition-colors"
                >
                  UPLOAD
                </Link>
              </div>
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
                        <Link href={item.path} className="text-white no-underline text-base hover:underline">
                          {item.name}
                        </Link>
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

              {/* Back to top button - full width at bottom */}
              <div className="w-full">
                <button
                  onClick={scrollToTop}
                  className="bg-white text-[#1a1a1a] border-none p-4 w-full text-center text-base cursor-pointer transition-colors hover:bg-[#f0f0f0] font-medium rounded-t-lg"
                >
                  Terug naar boven
                </button>
              </div>
            </footer>
          </main>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreenOpen && fullscreenPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-hidden"
          onClick={closeFullscreen}
        >
          <div className="relative max-w-4xl w-full h-[80vh] flex flex-col">
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Close fullscreen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="flex-1 overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="min-h-full w-full flex items-center justify-center">
                <img
                  src={fullscreenPhoto.image_url || "/placeholder.svg"}
                  alt={fullscreenPhoto.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            <div className="bg-black/70 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white text-xl font-bold">{fullscreenPhoto.title}</h3>
                <p className="text-white/70">by {fullscreenPhoto.user_name || "Anonymous"}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleLike(fullscreenPhoto.id)
                }}
                disabled={likedPhotos.has(fullscreenPhoto.id)}
                className={`flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-200 ${
                  likedPhotos.has(fullscreenPhoto.id)
                    ? "bg-green-500/30 cursor-not-allowed"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                <span className="text-red-500 text-xl">❤️</span>
                <span className="text-white font-bold">{fullscreenPhoto.likes}</span>
                {likedPhotos.has(fullscreenPhoto.id) && <span className="text-green-400 text-xl ml-1">✓</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
