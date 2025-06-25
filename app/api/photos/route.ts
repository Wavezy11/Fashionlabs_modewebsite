import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase.from("photos").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, user_name, image_url, likes = 0 } = body

    // Validation
    if (!title || !user_name || !image_url) {
      return NextResponse.json({ error: "Title, user_name, and image_url are required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("photos")
      .insert([
        {
          title: title.trim(),
          description: description?.trim() || null,
          user_name: user_name.trim(),
          image_url,
          likes: Number(likes) || 0,
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create photo" }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
