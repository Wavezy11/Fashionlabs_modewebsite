"use client"

export default function ContactPage() {
  return (
    <main className="w-full flex-1 bg-white">
      <div className="max-w-screen-md mx-auto py-12 lg:py-20 px-4">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-wider">CONTACT</h1>

        {/* Contact Info */}
        <div className="px-4 pb-8">
          <p className="text-center text-lg text-gray-700">
            Heb je een vraag of wil je met ons samenwerken? Laat hier je e-mail en bericht achter, en we reageren zo
            snel mogelijk!
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Voornaam*"
                className="w-full p-4 border-2 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] rounded"
                required
              />
              <input
                type="text"
                placeholder="Achternaam*"
                className="w-full p-4 border-2 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] rounded"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="email"
                placeholder="Email*"
                className="w-full p-4 border-2 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] rounded"
                required
              />
              <input
                type="tel"
                placeholder="Mobiele Telefoonnummer"
                className="w-full p-4 border-2 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] rounded"
              />
            </div>

            <textarea
              placeholder="Bericht*"
              className="w-full p-4 border-2 border-[#9480AB] text-base outline-none focus:border-[#7a6b8a] min-h-[200px] rounded"
              required
            ></textarea>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="bg-black text-white px-16 py-4 text-xl font-bold tracking-wider hover:bg-gray-800 transition-colors uppercase shadow-lg hover:shadow-xl rounded"
              >
                VERSTUUR
              </button>
            </div>
          </form>
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
    </main>
  )
}
