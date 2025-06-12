import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../../../lib/database"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const photoId = Number.parseInt(params.id, 10)

    if (isNaN(photoId)) {
      return NextResponse.json({ error: "Invalid photo ID" }, { status: 400 })
    }

    // First get the current photo to get its likes
    const [rows] = await pool.execute("SELECT * FROM photos WHERE id = ?", [photoId])

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 })
    }

    const photo = rows[0]
    const currentLikes = Number(photo.likes) || 0
    const newLikes = currentLikes + 1

    // Update the likes count
    await pool.execute("UPDATE photos SET likes = ? WHERE id = ?", [newLikes, photoId])

    // Return the updated photo with the new likes count
    return NextResponse.json({
      id: Number(photo.id),
      title: photo.title,
      description: photo.description,
      image_url: photo.image_url,
      likes: newLikes,
      user_name: photo.user_name,
      created_at: photo.created_at,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update likes" }, { status: 500 })
  }
}
