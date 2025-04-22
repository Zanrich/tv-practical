// src/app/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "../components/ui/LoadingSpinner"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if the current hostname indicates a TV device
    const isTVDevice = window.location.hostname.includes("device.fibertime.tv") || 
                       window.location.hostname.includes("device")

    // Redirect based on device type
    if (isTVDevice) {
      router.push("/device")
    } else {
      router.push("/mobile/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Loading fibertime™...</p>
      </div>
    </div>
  )
}