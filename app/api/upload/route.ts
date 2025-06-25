import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Parse FormData instead of JSON
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ error: "Geen bestand ontvangen" }, { status: 400 })
    }

    console.log("Uploading file:", file.name, "Size:", file.size)

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Bestand is te groot. Maximum 5MB toegestaan." }, { status: 400 })
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Alleen afbeeldingen zijn toegestaan." }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = new Uint8Array(bytes)

    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    console.log("Starting upload to Supabase...")

    // Upload to Supabase Storage with timeout handling
    const { data: uploadData, error: uploadError } = await supabase.storage.from("uploads").upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    })

    if (uploadError) {
      console.error("Supabase upload error:", uploadError)
      return NextResponse.json({ error: "Fout bij uploaden naar storage: " + uploadError.message }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(fileName)

    console.log("Upload successful:", urlData.publicUrl)

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      fileName: fileName,
    })
  } catch (error) {
    console.error("Upload error:", error)

    // Handle specific timeout errors
    if (error.code === "UND_ERR_SOCKET" || error.message.includes("fetch failed")) {
      return NextResponse.json(
        {
          error: "Upload timeout - probeer een kleinere afbeelding of probeer opnieuw",
        },
        { status: 408 },
      )
    }

    return NextResponse.json(
      {
        error: "Er ging iets mis tijdens het uploaden: " + error.message,
      },
      { status: 500 },
    )
  }
}
