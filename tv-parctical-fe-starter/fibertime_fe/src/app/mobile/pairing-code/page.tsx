// src/app/mobile/pairing-code/page.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDevice } from "../../../context/DeviceContext"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"

export default function MobilePairingCode() {
  const router = useRouter()
  const { verifyDeviceCode } = useDevice()

  const [code, setCode] = useState(["", "", "", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs[0].current) {
      inputRefs[0].current.focus()
    }
  }, [])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      setError("")

      // Auto-focus next input if current input is filled
      if (value && index < 3 && inputRefs[index + 1].current) {
        inputRefs[index + 1].current?.focus()
      }

      // Check if all inputs are filled
      if (newCode.every((c) => c) && newCode.join("").length === 4) {
        handleSubmit(newCode.join(""))
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs[index - 1].current) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = async (submittedCode: string) => {
    setIsLoading(true)
    setError("")

    try {
      const deviceId = await verifyDeviceCode(submittedCode)

      if (deviceId) {
        router.push("/mobile/connecting")
      } else {
        setError("Invalid pairing code. Please try again.")
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
          <h2 className="text-xl font-bold mb-4">Enter the four digit code on the TV or device screen</h2>
        </div>

        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {code.map((char, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={char}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 bg-[#FFE14D] rounded text-center text-2xl font-bold outline-none"
                autoComplete="off"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>

        <div className="text-center mb-8">
          <button className="text-gray-600 underline">
            Help, I can't find my code
          </button>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => router.push("/mobile/login")}
            className="w-full border border-gray-300 py-3 rounded font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}