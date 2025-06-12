import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../lib/database"

export async function GET() {
  try {
    // Sort by likes DESC for the favorites page, then by created_at DESC as secondary sort
    const [rows] = await pool.execute("SELECT * FROM photos ORDER BY likes DESC, created_at DESC")

    // Ensure consistent data types
    const photos = Array.isArray(rows)
      ? rows.map((photo) => ({
          id: Number(photo.id),
          title: photo.title,
          description: photo.description,
          image_url: photo.image_url,
          likes: Number(photo.likes) || 0,
          user_name: photo.user_name,
          created_at: photo.created_at,
        }))
      : []

    return NextResponse.json(photos)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image_url, user_name } = body

    const [result] = await pool.execute(
      "INSERT INTO photos (title, description, image_url, user_name, likes) VALUES (?, ?, ?, ?, 0)",
      [title, description, image_url, user_name],
    )

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create photo" }, { status: 500 })
  }
}
