import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Zoek gebruiker in Supabase database
    const { data: users, error } = await supabase.from("users").select("*").eq("username", username).limit(1)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Server error" }, { status: 500 })
    }

    if (users && users.length > 0) {
      const user = users[0]

      // Voor nu simpele wachtwoord check (in productie zou je bcrypt gebruiken)
      if (password === "admin123") {
        // Maak een simpele session token
        const token = Buffer.from(`${user.id}:${user.username}:${Date.now()}`).toString("base64")

        const response = NextResponse.json({
          success: true,
          user: { id: user.id, username: user.username, role: user.role },
        })

        // Set cookie
        response.cookies.set("auth-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24, // 24 hours
        })

        return response
      }
    }

    return NextResponse.json({ error: "Ongeldige inloggegevens" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
