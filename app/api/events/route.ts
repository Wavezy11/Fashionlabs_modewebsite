import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../lib/database"

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM events ORDER BY event_date ASC")

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, event_date, location } = body

    const [result] = await pool.execute(
      "INSERT INTO events (title, description, event_date, location) VALUES (?, ?, ?, ?)",
      [title, description, event_date, location],
    )

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
