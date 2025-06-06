import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../../lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [rows] = await pool.execute("SELECT * FROM registrations WHERE id = ?", [params.id])

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch registration" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { first_name, last_name, email, phone, status } = body

    await pool.execute(
      "UPDATE registrations SET first_name = ?, last_name = ?, email = ?, phone = ?, status = ? WHERE id = ?",
      [first_name, last_name, email, phone, status, params.id],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await pool.execute("DELETE FROM registrations WHERE id = ?", [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 })
  }
}
