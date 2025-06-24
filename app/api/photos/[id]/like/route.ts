import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../../../lib/supabase"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const photoId = Number.parseInt(params.id, 10)

    if (isNaN(photoId)) {
      return NextResponse.json({ error: "Invalid photo ID" }, { status: 400 })
    }

    // First get the current photo to get its likes
    const { data: photo, error: fetchError } = await supabase.from("photos").select("*").eq("id", photoId).single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json({ error: "Photo not found" }, { status: 404 })
      }
      console.error("Supabase fetch error:", fetchError)
      return NextResponse.json({ error: "Failed to fetch photo" }, { status: 500 })
    }

    const currentLikes = Number(photo.likes) || 0
    const newLikes = currentLikes + 1

    // Update the likes count
    const { error: updateError } = await supabase.from("photos").update({ likes: newLikes }).eq("id", photoId)

    if (updateError) {
      console.error("Supabase update error:", updateError)
      return NextResponse.json({ error: "Failed to update likes" }, { status: 500 })
    }

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
