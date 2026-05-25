"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function FavorietenPage() {
  const [photos, setPhotos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fullscreenPhoto, setFullscreenPhoto] = useState<any>(null)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [likedPhotos, setLikedPhotos] = useState(new Set<number>())

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch("/api/photos")
        if (response.ok) {
          const data = await response.json()
          // Ensure likes are numbers and sort by likes in descending order
          const sortedData = data
            .map((photo: any) => ({
              ...photo,
              likes: Number(photo.likes) || 0,
              id: Number(photo.id),
            }))
            .sort((a: any, b: any) => b.likes - a.likes)
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

  const resetLikes = () => {
    if (confirm("Weet je zeker dat je alle likes wilt resetten?")) {
      setLikedPhotos(new Set())
      localStorage.removeItem("likedPhotos")
      alert("Likes gereset! Je kunt nu weer foto's liken.")
    }
  }

  const handleLike = async (photoId: number) => {
    const isCurrentlyLiked = likedPhotos.has(photoId)

    try {
      const response = await fetch(`/api/photos/${photoId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: isCurrentlyLiked ? "unlike" : "like",
        }),
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
          setFullscreenPhoto((prevPhoto: any) => ({
            ...prevPhoto,
            likes: Number(updatedPhoto.likes),
          }))
        }

        // Toggle liked status and save to localStorage
        const newLikedPhotos = new Set(likedPhotos)
        if (isCurrentlyLiked) {
          newLikedPhotos.delete(photoId)
        } else {
          newLikedPhotos.add(photoId)
        }
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

  const openFullscreen = (photo: any) => {
    setFullscreenPhoto(photo)
    setIsFullscreenOpen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreenOpen(false)
  }

  return (
    <main className="w-full flex-1 bg-white flex flex-col min-h-screen relative">
      {/* Title Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 text-center relative z-10 shadow-sm border-b border-gray-100">
        <h1 className="text-black text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest drop-shadow-sm">
          FAVORIETEN
          <div className="w-24 h-1 bg-[#9480AB] mx-auto mt-6 rounded-full"></div>
        </h1>
      </div>

      {/* Favorites Info */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 w-full flex-1 pb-20 pt-12">
        <p className="text-center mb-16 bg-[#9480AB]/10 backdrop-blur-md border border-[#9480AB]/20 p-8 md:p-10 text-black rounded-3xl shadow-[0_10px_40px_rgba(148,128,171,0.15)] max-w-4xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
          Bij Moments vind je de mooiste foto&apos;s van onze bezoekers! Upload je eigen foto, verzamel likes en wie
          weet word jij uitgelicht op onze socials. De meest gewaardeerde inzending krijgt na afloop van de show
          een speciale vermelding!
        </p>

        <h2 className="font-bold text-2xl md:text-3xl mb-8 uppercase tracking-wider text-center border-b-2 border-black inline-block pb-2 mx-auto">
          FOTO&apos;S VAN FASHIONLABS 2024
        </h2>

        {/* Photo Grid - Responsive Layout */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-8 border-[#9480AB] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {photos.map((photo, index) => (
              <div key={photo.id} className="relative group">
                {/* Photo Container */}
                <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <img
                    src={photo.image_url || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.target.src = "/placeholder.svg?height=300&width=400"
                    }}
                  />

                  {/* Fullscreen Button */}
                  <button
                    onClick={() => openFullscreen(photo)}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                    aria-label="View fullscreen"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                  </button>

                  {/* Overlay with title and like button */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                    <div className="flex items-end justify-between">
                      <div className="flex-1 pr-4">
                        <p className="text-white font-bold text-lg leading-tight mb-1 truncate">{photo.title}</p>
                        <p className="text-white/70 text-sm truncate">by {photo.user_name || "Anonymous"}</p>
                      </div>

                      {/* Like Button and Count */}
                      <div className="flex items-center">
                        <button
                          onClick={() => handleLike(photo.id)}
                          className={`flex items-center gap-1.5 backdrop-blur-md rounded-full px-3 py-2 transition-all duration-300 active:scale-95 ${
                            likedPhotos.has(photo.id) ? "bg-red-500/40 border border-red-500/50" : "bg-white/20 hover:bg-white/40 border border-white/20"
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
                    <div className="absolute top-4 left-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black shadow-lg border-2 border-white/20 ${
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
        <div className="flex justify-center mt-12 pb-12">
          <Link
            href="/dashboard/photos/new"
            className="group relative overflow-hidden bg-black text-white px-16 py-6 text-xl font-black tracking-widest text-center min-w-[300px] uppercase rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-500"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">UPLOAD FOTO</span>
            <div className="absolute inset-0 h-full w-0 bg-white group-hover:w-full transition-all duration-500 ease-out z-0"></div>
          </Link>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreenOpen && fullscreenPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeFullscreen}
        >
          <div className="relative w-full h-full max-w-[90vw] flex flex-col items-center justify-center">
            <button
              onClick={closeFullscreen}
              className="absolute top-0 right-0 bg-white/10 hover:bg-white/30 p-3 rounded-full transition-all duration-300 z-10"
              aria-label="Close fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Image Container */}
            <div
              className="flex-1 flex items-center justify-center w-full max-h-[80vh] my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullscreenPhoto.image_url || "/placeholder.svg"}
                alt={fullscreenPhoto.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Title and Like Section */}
            <div className="w-full max-w-4xl bg-black/50 p-6 rounded-2xl backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-6" onClick={(e) => e.stopPropagation()}>
              <div className="text-center md:text-left">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-1">{fullscreenPhoto.title}</h3>
                <p className="text-white/70 text-lg">by {fullscreenPhoto.user_name || "Anonymous"}</p>
              </div>

              <button
                onClick={() => handleLike(fullscreenPhoto.id)}
                className={`flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-300 text-xl ${
                  likedPhotos.has(fullscreenPhoto.id) ? "bg-red-500/40 border-2 border-red-500/50" : "bg-white/10 hover:bg-white/20 border-2 border-white/20"
                }`}
              >
                <span className="text-red-500 text-2xl">❤️</span>
                <span className="text-white font-bold">{fullscreenPhoto.likes}</span>
                {likedPhotos.has(fullscreenPhoto.id) && <span className="text-green-400 text-2xl ml-2">✓</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
