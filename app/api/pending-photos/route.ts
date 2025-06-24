import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

export async function GET() {
  try {
    const { data: pendingPhotos, error } = await supabase
      .from("pending_photos")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch pending photos" }, { status: 500 })
    }

    return NextResponse.json(pendingPhotos || [])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch pending photos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image_url, user_name, email } = body

    const { data, error } = await supabase
      .from("pending_photos")
      .insert([
        {
          title,
          description,
          image_url,
          user_name,
          email,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to create pending photo" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      id: data[0]?.id,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create pending photo" }, { status: 500 })
  }
}
