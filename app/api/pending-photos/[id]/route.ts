import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../../lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [rows] = await pool.execute("SELECT * FROM pending_photos WHERE id = ?", [params.id])

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
    const { status } = body

    // First get the pending photo
    const [rows] = await pool.execute("SELECT * FROM pending_photos WHERE id = ?", [params.id])

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 })
    }

    const pendingPhoto = rows[0]

    // Update the status in pending_photos
    await pool.execute("UPDATE pending_photos SET status = ? WHERE id = ?", [status, params.id])

    // If approved, copy to main photos table
    if (status === "approved") {
      await pool.execute(
        "INSERT INTO photos (title, description, image_url, user_name, likes) VALUES (?, ?, ?, ?, 0)",
        [pendingPhoto.title, pendingPhoto.description, pendingPhoto.image_url, pendingPhoto.user_name],
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update photo" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await pool.execute("DELETE FROM pending_photos WHERE id = ?", [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 })
  }
}
