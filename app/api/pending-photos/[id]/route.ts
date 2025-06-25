import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    console.log("Updating photo status:", id, "to", status)

    // Validatie
    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Ongeldige status" }, { status: 400 })
    }

    // First get the pending photo
    const { data: pendingPhoto, error: fetchError } = await supabase
      .from("pending_photos")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json({ error: "Photo not found" }, { status: 404 })
      }
      console.error("Supabase fetch error:", fetchError)
      return NextResponse.json({ error: "Failed to fetch photo" }, { status: 500 })
    }

    // Update the status in pending_photos
    const { error: updateError } = await supabase
      .from("pending_photos")
      .update({
        status,
      })
      .eq("id", id)

    if (updateError) {
      console.error("Supabase update error:", updateError)
      return NextResponse.json({ error: "Failed to update photo status" }, { status: 500 })
    }

    // If approved, copy to main photos table (WITHOUT email)
    if (status === "approved") {
      const { error: insertError } = await supabase.from("photos").insert([
        {
          title: pendingPhoto.title,
          description: pendingPhoto.description,
          image_url: pendingPhoto.image_url,
          user_name: pendingPhoto.user_name,
          likes: 0,
          // NO email field - stays only in pending_photos for admin use
        },
      ])

      if (insertError) {
        console.error("Supabase insert error:", insertError)
        return NextResponse.json(
          { error: "Failed to copy photo to main gallery: " + insertError.message },
          { status: 500 },
        )
      }

      console.log("Successfully copied approved photo to main gallery (without email)")
    }

    console.log("Successfully updated photo status")
    return NextResponse.json({
      success: true,
      message: `Photo ${status} successfully`,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update photo" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { data: pendingPhoto, error } = await supabase.from("pending_photos").select("*").eq("id", id).single()

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

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { error } = await supabase.from("pending_photos").delete().eq("id", id)

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
