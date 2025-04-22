// src/app/mobile/connected/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useDevice } from "../../../context/DeviceContext"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"

export default function MobileConnected() {
  const { deviceId, getConnectionStatus, connectionStatus } = useDevice()

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchConnectionStatus = async () => {
      if (!deviceId) {
        setError("Device information not found")
        setIsLoading(false)
        return
      }

      try {
        await getConnectionStatus(deviceId)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to get connection status")
        setIsLoading(false)
        console.error(err)
      }
    }

    fetchConnectionStatus()
  }, [deviceId, getConnectionStatus])

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold mb-6">Connected!</h2>
          
          {/* Icons row with green check marks */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="w-8 h-8">📺</div>
            <div className="w-8 h-8 text-green-500">✓</div>
            <div className="w-8 h-8">📶</div>
            <div className="w-8 h-8 text-green-500">✓</div>
            <div className="w-8 h-8">🌐</div>
          </div>
          
          {isLoading ? (
            <div className="py-4">
              <LoadingSpinner size="medium" />
              <p className="mt-4 text-gray-600">Loading your bundle information...</p>
            </div>
          ) : error ? (
            <div className="py-4">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              {/* Yellow info box */}
              <div className="bg-[#FFE14D] p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 mr-2">📶</div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-1">💬</div>
                    <span className="font-bold">30 Days</span>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg flex items-center mb-3">
                  <div className="w-6 h-6 mr-2">📺</div>
                  <div>
                    <span className="text-sm">Device</span>
                    <div className="text-xs text-gray-500">[00-00-00-00-00-00]</div>
                  </div>
                </div>
                
                <div className="font-bold text-lg">
                  {connectionStatus.daysRemaining} days {connectionStatus.hoursRemaining} hours...
                </div>
                <div className="text-sm">
                  expires at 3:34pm DD/MM/YYYY
                </div>
              </div>
              
              <p className="text-center">
                Check your active bundles by WhatsApping us on<br />
                <span className="font-bold">000 000 0000</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}