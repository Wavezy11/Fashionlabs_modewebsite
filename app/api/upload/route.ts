import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

// Helper function voor retry logica
async function uploadWithRetry(
  bucket: string,
  filename: string,
  buffer: Uint8Array,
  contentType: string,
  maxRetries = 3,
) {
  let lastError: any

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Upload attempt ${attempt}/${maxRetries} for ${filename}`)

      const { data, error } = await supabase.storage.from(bucket).upload(filename, buffer, {
        contentType,
        upsert: false,
      })

      if (error) {
        lastError = error
        console.error(`Upload attempt ${attempt} failed:`, error)

        // Als het een netwerk fout is, probeer opnieuw
        if (
          attempt < maxRetries &&
          (error.message?.includes("fetch failed") ||
            error.message?.includes("socket") ||
            error.message?.includes("network") ||
            error.message?.includes("timeout"))
        ) {
          // Wacht even voor volgende poging
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
          continue
        }

        // Voor andere fouten, stop direct
        throw error
      }

      // Success!
      console.log(`Upload successful on attempt ${attempt}`)
      return { data, error: null }
    } catch (err) {
      lastError = err
      console.error(`Upload attempt ${attempt} error:`, err)

      // Als het een netwerk fout is en we hebben nog pogingen over
      if (
        attempt < maxRetries &&
        (err.message?.includes("fetch failed") ||
          err.message?.includes("socket") ||
          err.message?.includes("network") ||
          err.message?.includes("timeout") ||
          err.code === "UND_ERR_SOCKET")
      ) {
        console.log(`Retrying in ${1000 * attempt}ms...`)
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
        continue
      }

      // Voor andere fouten of geen pogingen meer
      break
    }
  }

  // Alle pogingen gefaald
  throw lastError
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ error: "Geen bestand geüpload" }, { status: 400 })
    }

    console.log(`Processing upload: ${file.name}, size: ${file.size}, type: ${file.type}`)

    // Validate file type - alle gangbare foto formaten toegestaan
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/heic", // iPhone foto's
      "image/heif", // iPhone foto's
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Alleen foto bestanden toegestaan",
          tip: "Upload een foto bestand (JPEG, PNG, WebP, GIF, etc.)",
          uploadedType: file.type,
        },
        { status: 400 },
      )
    }

    // 6MB limiet voor alle foto formaten
    const maxSize = 6 * 1024 * 1024 // 6MB max
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: "Bestand te groot. Maximum 6MB toegestaan.",
          tip: "Comprimeer je foto of maak een kleinere versie.",
          currentSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        },
        { status: 400 },
      )
    }

    // Check total storage usage first
    try {
      const { data: existingFiles, error: listError } = await supabase.storage.from("uploads").list()

      if (listError) {
        console.error("Storage list error:", listError)
        // Continue anyway - don't block upload for list errors
      } else if (existingFiles) {
        const totalFiles = existingFiles.length
        const maxFiles = 350 // Max aantal foto's

        if (totalFiles >= maxFiles) {
          return NextResponse.json(
            {
              error: "Upload limiet bereikt",
              details: `Maximum ${maxFiles} foto's toegestaan voor dit evenement`,
            },
            { status: 507 },
          )
        }
      }
    } catch (listErr) {
      console.error("Storage list check failed:", listErr)
      // Continue anyway - don't block upload
    }

    // Create unique filename - behoud originele extensie
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const originalExtension = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const filename = `${timestamp}-${randomString}.${originalExtension}`

    console.log(`Generated filename: ${filename}`)

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = new Uint8Array(bytes)

    console.log(`File converted to buffer, size: ${buffer.length} bytes`)

    // Upload to Supabase Storage with retry
    try {
      const { data: uploadData, error: uploadError } = await uploadWithRetry(
        "uploads",
        filename,
        buffer,
        file.type,
        3, // 3 pogingen
      )

      if (uploadError) {
        throw uploadError
      }

      console.log(`Upload successful: ${filename}`)

      // Get public URL
      const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(filename)

      return NextResponse.json({
        success: true,
        url: urlData.publicUrl,
        path: uploadData.path,
        filename: filename,
        size: file.size,
        type: file.type,
        sizeFormatted: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        message: "Foto succesvol geüpload!",
      })
    } catch (uploadError) {
      console.error("Final upload error:", uploadError)

      // Specifieke error handling
      if (
        uploadError.message?.includes("quota") ||
        uploadError.message?.includes("limit") ||
        uploadError.message?.includes("storage")
      ) {
        return NextResponse.json(
          {
            error: "Opslag vol! Geen nieuwe foto's mogelijk.",
            details: "Het evenement heeft de opslaglimiet bereikt.",
          },
          { status: 507 },
        )
      }

      if (uploadError.message?.includes("Bucket not found")) {
        return NextResponse.json(
          {
            error: "Opslag niet gevonden. Neem contact op met de organisatie.",
          },
          { status: 500 },
        )
      }

      // Netwerk fouten
      if (
        uploadError.message?.includes("fetch failed") ||
        uploadError.message?.includes("socket") ||
        uploadError.message?.includes("network") ||
        uploadError.code === "UND_ERR_SOCKET"
      ) {
        return NextResponse.json(
          {
            error: "Netwerkfout tijdens upload.",
            tip: "Controleer je internetverbinding en probeer opnieuw.",
            details: "De verbinding werd onderbroken tijdens het uploaden.",
          },
          { status: 503 },
        )
      }

      // Algemene fout
      return NextResponse.json(
        {
          error: "Upload mislukt. Probeer het opnieuw.",
          tip: "Als het probleem blijft bestaan, neem contact op met de organisatie.",
          details: uploadError.message,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("General upload error:", error)

    // Check voor specifieke error types
    if (
      error.message?.includes("fetch failed") ||
      error.message?.includes("socket") ||
      error.code === "UND_ERR_SOCKET"
    ) {
      return NextResponse.json(
        {
          error: "Netwerkfout tijdens upload.",
          tip: "Controleer je internetverbinding en probeer opnieuw.",
          details: "De verbinding werd onderbroken.",
        },
        { status: 503 },
      )
    }

    return NextResponse.json(
      {
        error: "Er ging iets mis tijdens het uploaden.",
        tip: "Probeer het opnieuw. Als het probleem blijft bestaan, neem contact op.",
        details: error.message || "Onbekende fout",
      },
      { status: 500 },
    )
  }
}
