import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../../lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [rows] = await pool.execute("SELECT * FROM events WHERE id = ?", [params.id])

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, description, event_date, location } = body

    await pool.execute("UPDATE events SET title = ?, description = ?, event_date = ?, location = ? WHERE id = ?", [
      title,
      description,
      event_date,
      location,
      params.id,
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await pool.execute("DELETE FROM events WHERE id = ?", [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
