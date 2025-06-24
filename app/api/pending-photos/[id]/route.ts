import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: pendingPhoto, error } = await supabase.from("pending_photos").select("*").eq("id", params.id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Photo not found" }, { status: 404 })
      }
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch photo" }, { status: 500 })
    }

    return NextResponse.json(pendingPhoto)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch photo" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    // First get the pending photo
    const { data: pendingPhoto, error: fetchError } = await supabase
      .from("pending_photos")
      .select("*")
      .eq("id", params.id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json({ error: "Photo not found" }, { status: 404 })
      }
      console.error("Supabase fetch error:", fetchError)
      return NextResponse.json({ error: "Failed to fetch photo" }, { status: 500 })
    }

    // Update the status in pending_photos
    const { error: updateError } = await supabase.from("pending_photos").update({ status }).eq("id", params.id)

    if (updateError) {
      console.error("Supabase update error:", updateError)
      return NextResponse.json({ error: "Failed to update photo status" }, { status: 500 })
    }

    // If approved, copy to main photos table
    if (status === "approved") {
      const { error: insertError } = await supabase.from("photos").insert([
        {
          title: pendingPhoto.title,
          description: pendingPhoto.description,
          image_url: pendingPhoto.image_url,
          user_name: pendingPhoto.user_name,
          likes: 0,
        },
      ])

      if (insertError) {
        console.error("Supabase insert error:", insertError)
        return NextResponse.json({ error: "Failed to approve photo" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update photo" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from("pending_photos").delete().eq("id", params.id)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 })
  }
}
