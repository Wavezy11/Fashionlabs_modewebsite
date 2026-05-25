"use client"

import { useState } from "react"
import Image from "next/image"

export default function FashionShowTickets() {
  const [standingTickets, setStandingTickets] = useState(0)
  const [wheelchairTickets, setWheelchairTickets] = useState(0)

  const incrementTickets = (type: "standing" | "wheelchair") => {
    if (type === "standing") {
      setStandingTickets(standingTickets + 1)
    } else {
      setWheelchairTickets(wheelchairTickets + 1)
    }
  }

  const decrementTickets = (type: "standing" | "wheelchair") => {
    if (type === "standing" && standingTickets > 0) {
      setStandingTickets(standingTickets - 1)
    } else if (type === "wheelchair" && wheelchairTickets > 0) {
      setWheelchairTickets(wheelchairTickets - 1)
    }
  }

  return (
    <main className="w-full flex-1 bg-white flex flex-col">
      {/* Title Section - White Background */}
      <div className="px-6 py-10 md:py-16 text-center bg-white">
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase">DIGITAL FASHION</h1>
        <h2 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mt-2 text-[#9480AB]">MODESHOW</h2>
      </div>

      <div className="max-w-screen-md mx-auto w-full flex-1 flex flex-col shadow-2xl rounded-t-3xl md:rounded-3xl overflow-hidden mb-12">
        {/* Purple Section with Hero Image */}
        <div className="bg-[#B8A5D1] relative px-6 md:px-12 py-10">
          {/* Hero Image */}
          <div className="relative w-full h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-xl border-4 border-white/20">
            <Image src="/fashion-show-hero.png" alt="Fashion Show Models" fill className="object-cover" />
          </div>

          {/* Decorative Cross SVGs around the image */}
          <svg width="24" height="24" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-4 left-4 z-20">
            <path d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z" fill="#9480AB" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 right-6 z-20">
            <path d="M30.6648 15.616V0.282715H15.3324V15.616H0V30.9494H15.3324V46.2827H30.6648V30.9494H46V15.616H30.6648Z" fill="#9480AB" />
          </svg>
        </div>

        {/* White Section with Ticket Selection */}
        <div className="bg-white px-8 md:px-16 py-12 flex-1">
          {/* Standing Tickets */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-8 border-b border-gray-100 gap-4">
            <div className="flex flex-col">
              <p className="font-bold text-xl text-black">Staanplaatsen</p>
              <p className="text-gray-500 text-sm mt-1">€ 10,- per stuk</p>
            </div>
            
            <div className="flex items-center self-start sm:self-center bg-gray-50 rounded-lg p-2 border border-gray-200">
              <button
                onClick={() => decrementTickets("standing")}
                className="w-10 h-10 bg-white text-black font-bold text-xl flex items-center justify-center rounded shadow-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                disabled={standingTickets === 0}
              >
                -
              </button>
              <div className="w-16 h-10 flex items-center justify-center font-bold text-xl">
                {standingTickets}
              </div>
              <button
                onClick={() => incrementTickets("standing")}
                className="w-10 h-10 bg-black text-white font-bold text-xl flex items-center justify-center rounded shadow-sm hover:bg-gray-800 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Wheelchair Tickets */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-8 border-b border-gray-100 gap-4">
            <div className="flex flex-col">
              <p className="font-bold text-xl text-black">Rolstoelplaatsen</p>
              <p className="text-gray-500 text-sm mt-1">€ 10,- per stuk</p>
            </div>
            
            <div className="flex items-center self-start sm:self-center bg-gray-50 rounded-lg p-2 border border-gray-200">
              <button
                onClick={() => decrementTickets("wheelchair")}
                className="w-10 h-10 bg-white text-black font-bold text-xl flex items-center justify-center rounded shadow-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                disabled={wheelchairTickets === 0}
              >
                -
              </button>
              <div className="w-16 h-10 flex items-center justify-center font-bold text-xl">
                {wheelchairTickets}
              </div>
              <button
                onClick={() => incrementTickets("wheelchair")}
                className="w-10 h-10 bg-black text-white font-bold text-xl flex items-center justify-center rounded shadow-sm hover:bg-gray-800 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Info */}
          <div className="text-sm text-gray-500 mb-8 leading-relaxed">
            <p className="mb-2">Prijzen inclusief € 3,10 servicekosten.</p>
            <p>
              Afhankelijk van de gekozen betaalmethode kunnen er per bestelling betaalkosten van toepassing zijn.
            </p>
          </div>
        </div>

        {/* Purple Section with Continue Button */}
        <div className="bg-[#B8A5D1] px-8 md:px-16 py-10 flex flex-col items-center">
          <button className="bg-black text-white px-12 py-5 text-xl font-bold tracking-widest hover:bg-gray-900 hover:scale-105 transition-all w-full max-w-[350px] rounded-lg shadow-xl uppercase">
            DOORGAAN
          </button>
        </div>

        {/* Checkered Pattern */}
        <div className="h-16 relative w-full">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), 
                               linear-gradient(-45deg, #000 25%, transparent 25%), 
                               linear-gradient(45deg, transparent 75%, #000 75%), 
                               linear-gradient(-45deg, transparent 75%, #000 75%)`,
              backgroundSize: "32px 32px",
              backgroundPosition: "0 0, 0 16px, 16px -16px, -16px 0px",
            }}
          ></div>
        </div>
      </div>
    </main>
  )
}
