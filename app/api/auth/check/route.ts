import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Decode token (in productie zou je JWT gebruiken)
    const decoded = Buffer.from(token, "base64").toString()
    const [userId, username] = decoded.split(":")

    if (userId && username) {
      return NextResponse.json({
        authenticated: true,
        user: { id: userId, username },
      })
    }

    return NextResponse.json({ authenticated: false }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
