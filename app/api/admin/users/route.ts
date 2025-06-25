import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password, role = "admin" } = body

    // Validatie
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Alle velden zijn verplicht" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Wachtwoord moet minimaal 6 karakters zijn" }, { status: 400 })
    }

    // Check of gebruikersnaam al bestaat
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Supabase check error:", checkError)
      return NextResponse.json({ error: "Server error" }, { status: 500 })
    }

    if (existingUser) {
      return NextResponse.json({ error: "Gebruikersnaam bestaat al" }, { status: 400 })
    }

    // Check of email al bestaat (als email kolom bestaat)
    const { data: existingEmail, error: emailCheckError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single()

    if (emailCheckError && emailCheckError.code !== "PGRST116") {
      console.error("Supabase email check error:", emailCheckError)
      // Email kolom bestaat mogelijk niet, ga door
    }

    if (existingEmail) {
      return NextResponse.json({ error: "Email bestaat al" }, { status: 400 })
    }

    // Maak nieuwe gebruiker aan - aangepast voor bestaande tabel structuur
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username,
          email,
          password: password, // Gebruik 'password' in plaats van 'password_hash'
          role,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Kon gebruiker niet aanmaken" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data[0].id,
        username: data[0].username,
        email: data[0].email,
        role: data[0].role,
      },
    })
  } catch (error) {
    console.error("Admin user creation error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, username, email, role, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    return NextResponse.json(users || [])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
