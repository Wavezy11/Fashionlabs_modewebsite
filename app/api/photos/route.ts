import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

export async function GET() {
  try {
    // Sort by likes DESC for the favorites page, then by created_at DESC as secondary sort
    const { data: photos, error } = await supabase
      .from("photos")
      .select("*")
      .order("likes", { ascending: false })
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 })
    }

    // Ensure consistent data types
    const formattedPhotos =
      photos?.map((photo) => ({
        id: Number(photo.id),
        title: photo.title,
        description: photo.description,
        image_url: photo.image_url,
        likes: Number(photo.likes) || 0,
        user_name: photo.user_name,
        created_at: photo.created_at,
      })) || []

    return NextResponse.json(formattedPhotos)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image_url, user_name } = body

    const { data, error } = await supabase
      .from("photos")
      .insert([
        {
          title,
          description,
          image_url,
          user_name,
          likes: 0,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to create photo" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      id: data[0]?.id,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create photo" }, { status: 500 })
  }
}
