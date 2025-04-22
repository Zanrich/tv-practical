// src/app/mobile/login/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../context/AuthContext"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import Image from "next/image"

export default function MobileLogin() {
  const router = useRouter()
  const { setPhoneNumber, requestOTP } = useAuth()

  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
    setError("")
  }

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phone) {
      setError("Please enter your phone number")
      return
    }

    setIsLoading(true)

    try {
      const success = await requestOTP(phone)

      if (success) {
        setPhoneNumber(phone)
        router.push("/mobile/pairing-code")
      } else {
        setError("Failed to send OTP. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

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
          <h1 className="text-2xl font-bold mb-6">fibertime™</h1>
          <h2 className="text-xl font-bold mb-4">Log in to connect to WiFi</h2>
          <p className="text-gray-700">Enter your phone number below:</p>
        </div>

        <form onSubmit={handleRequestOTP}>
          <div className="mb-6">
            <div className="flex border border-gray-300 rounded">
              <div className="flex items-center justify-center px-3 border-r border-gray-300">
                <div className="flex items-center">
                  <div className="w-6 h-4 bg-red-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full flex">
                      <div className="w-1/3 h-full bg-white"></div>
                      <div className="w-1/3 h-full bg-blue-500"></div>
                      <div className="w-1/3 h-full bg-green-500"></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="border-t-[10px] border-t-transparent border-l-[15px] border-l-black border-b-[10px] border-b-transparent"></div>
                    </div>
                  </div>
                  <span className="ml-1">▼</span>
                </div>
              </div>
              <input
                type="tel"
                placeholder="082 345 6789"
                value={phone}
                onChange={handlePhoneChange}
                className="flex-1 p-3 outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFE14D] py-3 rounded font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="small" />
                <span className="ml-2">Processing...</span>
              </div>
            ) : (
              "Next"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}