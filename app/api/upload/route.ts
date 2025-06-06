import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Genereer een unieke bestandsnaam
    const fileExtension = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`
    const filePath = path.join(process.cwd(), "public", "uploads", fileName)

    // Schrijf het bestand naar de public/uploads folder
    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
