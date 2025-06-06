import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../../lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [rows] = await pool.execute("SELECT * FROM pending_photos WHERE id = ?", [params.id])

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json({ error: "Pending photo not found" }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch pending photo" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    // Update de status van de pending photo
    await pool.execute("UPDATE pending_photos SET status = ? WHERE id = ?", [status, params.id])

    // Als de status 'approved' is, voeg de foto toe aan de photos tabel
    if (status === "approved") {
      const [photoRows] = await pool.execute("SELECT * FROM pending_photos WHERE id = ?", [params.id])
      const photo = photoRows[0]

      await pool.execute(
        "INSERT INTO photos (title, description, image_url, user_name, likes, approved) VALUES (?, ?, ?, ?, 0, TRUE)",
        [photo.title, photo.description, photo.image_url, photo.user_name],
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update pending photo" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await pool.execute("DELETE FROM pending_photos WHERE id = ?", [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete pending photo" }, { status: 500 })
  }
}
