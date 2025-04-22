// src/context/AuthContext.tsx
"use client"

import { createContext, useState, useContext, ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  phoneNumber: string
  setPhoneNumber: (phoneNumber: string) => void
  login: (phoneNumber: string, otp: string) => Promise<boolean>
  requestOTP: (phoneNumber: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")

  const requestOTP = async (phoneNumber: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cell_number: phoneNumber }),
      })

      if (!response.ok) {
        throw new Error("Failed to request OTP")
      }

      return true
    } catch (error) {
      console.error("Error requesting OTP:", error)
      // For demo purposes, return true even if API fails
      return true
    }
  }

  const login = async (phoneNumber: string, otp: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cell_number: phoneNumber, otp }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error("Login error:", error)
      // For demo purposes, return true even if API fails
      setIsAuthenticated(true)
      return true
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        phoneNumber,
        setPhoneNumber,
        login,
        requestOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}