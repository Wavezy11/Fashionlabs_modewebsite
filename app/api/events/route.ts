import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

export async function GET() {
  try {
    const { data: events, error } = await supabase.from("events").select("*").order("event_date", { ascending: true })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
    }

    return NextResponse.json(events || [])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, event_date, location } = body

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          event_date,
          location,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      id: data[0]?.id,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
