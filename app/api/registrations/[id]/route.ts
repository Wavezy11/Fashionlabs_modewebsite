import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: registration, error } = await supabase.from("registrations").select("*").eq("id", params.id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Registration not found" }, { status: 404 })
      }
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch registration" }, { status: 500 })
    }

    return NextResponse.json(registration)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch registration" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { first_name, last_name, email, phone, status } = body

    const { error } = await supabase
      .from("registrations")
      .update({
        first_name,
        last_name,
        email,
        phone,
        status,
      })
      .eq("id", params.id)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to update registration" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from("registrations").delete().eq("id", params.id)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 })
  }
}
