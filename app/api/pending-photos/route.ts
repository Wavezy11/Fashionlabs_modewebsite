import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, user_name, image_url, email } = body

    console.log("Received data:", { title, description, user_name, image_url, email })

    // Validatie
    if (!title || !user_name || !image_url) {
      return NextResponse.json({ error: "Titel, naam en foto zijn verplicht" }, { status: 400 })
    }

    // Insert into pending_photos table - let SERIAL handle the ID
    const { data, error } = await supabase
      .from("pending_photos")
      .insert([
        {
          title: title.trim(),
          description: description?.trim() || null,
          user_name: user_name.trim(),
          image_url,
          email: email?.trim() || null,
          status: "pending",
          // Don't specify created_at, let the database default handle it
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Fout bij opslaan in database: " + error.message }, { status: 500 })
    }

    console.log("Successfully saved to database:", data[0])

    return NextResponse.json({
      success: true,
      message: "Foto succesvol geüpload en wacht op goedkeuring!",
      data: data[0],
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Er ging iets mis bij het verwerken van je aanvraag: " + error.message },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from("pending_photos").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Fout bij ophalen van foto's" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Er ging iets mis" }, { status: 500 })
  }
}
