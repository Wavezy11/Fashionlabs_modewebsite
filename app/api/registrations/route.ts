import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../lib/database"

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM registrations ORDER BY created_at DESC")

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { first_name, last_name, email, phone, status = "pending" } = body

    const [result] = await pool.execute(
      "INSERT INTO registrations (first_name, last_name, email, phone, status) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, email, phone, status],
    )

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create registration" }, { status: 500 })
  }
}
