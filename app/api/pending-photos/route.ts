import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../lib/database"

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM pending_photos ORDER BY created_at DESC")

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch pending photos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image_url, user_name, email } = body

    const [result] = await pool.execute(
      "INSERT INTO pending_photos (title, description, image_url, user_name, email, status) VALUES (?, ?, ?, ?, ?, 'pending')",
      [title, description, image_url, user_name, email],
    )

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create pending photo" }, { status: 500 })
  }
}
