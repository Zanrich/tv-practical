// src/app/mobile/connecting/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDevice } from "../../../context/DeviceContext"

export default function MobileConnecting() {
  const router = useRouter()
  const { deviceId, connectDevice } = useDevice()

  const [error, setError] = useState("")
  const [connectionAttempts, setConnectionAttempts] = useState(0)
  const maxAttempts = 5

  useEffect(() => {
    if (!deviceId) {
      router.push("/mobile/pairing-code")
      return
    }

    const attemptConnection = async () => {
      try {
        const connected = await connectDevice(deviceId)

        if (connected) {
          router.push("/mobile/connected")
        } else {
          // If not connected yet, try again after a delay
          if (connectionAttempts < maxAttempts) {
            setConnectionAttempts((prev) => prev + 1)
            setTimeout(attemptConnection, 2000)
          } else {
            setError("Connection timed out. Please try again.")
          }
        }
      } catch (err) {
        setError("An error occurred while connecting. Please try again.")
        console.error(err)
      }
    }

    attemptConnection()
  }, [deviceId, connectDevice, router, connectionAttempts])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Browser-like header */}
      <div className="bg-gray-100 p-2 border-b flex items-center">
        <div className="flex-1 flex items-center">
          <div className="w-6 h-6 mr-2">🏠</div>
          <div className="bg-gray-200 rounded-full px-3 py-1 flex-1 flex items-center">
            <span className="text-gray-600 text-sm">🔒 fibertime.tv</span>
          </div>
        </div>
        <div className="w-6 h-6 ml-2">⋮</div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold mb-6">Connecting...</h2>
          
          {/* Icons row */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="w-8 h-8">📺</div>
            <div className="w-8 h-8">⋯</div>
            <div className="w-8 h-8">📶</div>
            <div className="w-8 h-8">⋯</div>
            <div className="w-8 h-8">🌐</div>
          </div>
          
          {/* Yellow info box */}
          <div className="bg-[#FFE14D] p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 mr-2">📶</div>
              <div className="flex items-center">
                <div className="w-6 h-6 mr-1">💬</div>
                <span className="font-bold">30 Days</span>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-lg flex items-center">
              <div className="w-6 h-6 mr-2">📺</div>
              <div>
                <span className="text-sm">Device</span>
                <div className="text-xs text-gray-500">[00-00-00-00-00-00]</div>
              </div>
            </div>
          </div>
          
          <p className="text-center">
            Busy connecting your TV... make sure it is switched on and connected to @fibertime
          </p>
        </div>
      </div>
    </div>
  )
}