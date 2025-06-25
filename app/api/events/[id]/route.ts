import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: event, error } = await supabase.from("events").select("*").eq("id", params.id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Event not found" }, { status: 404 })
      }
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, description, event_date, location } = body

    const { error } = await supabase
      .from("events")
      .update({
        title,
        description,
        event_date,
        location,
      })
      .eq("id", params.id)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from("events").delete().eq("id", params.id)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
  