import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../../lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [rows] = await pool.execute("SELECT * FROM photos WHERE id = ?", [params.id])

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch photo" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, description, user_name, likes } = body

    await pool.execute("UPDATE photos SET title = ?, description = ?, user_name = ?, likes = ? WHERE id = ?", [
      title,
      description,
      user_name,
      likes,
      params.id,
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update photo" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await pool.execute("DELETE FROM photos WHERE id = ?", [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 })
  }
}
