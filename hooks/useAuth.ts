"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check")
      const data = await response.json()

      if (response.ok && data.authenticated) {
        setAuthState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
        })
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return {
    ...authState,
    logout,
    checkAuth,
  }
}
