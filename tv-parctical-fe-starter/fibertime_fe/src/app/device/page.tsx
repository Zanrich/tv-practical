// src/app/device/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useDevice } from "../../context/DeviceContext"
import LoadingSpinner from "../../components/ui/LoadingSpinner"

export default function TVScreen() {
  const { createDeviceCode } = useDevice()
  const [pairingCode, setPairingCode] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const generatePairingCode = async () => {
      try {
        // In a real app, you would get the MAC address from the device
        // For this demo, we'll use a placeholder
        const macAddress = "AA:BB:CC:DD:EE:FF"
        const code = await createDeviceCode(macAddress)

        if (code) {
          setPairingCode(code)
        } else {
          setError("Failed to generate pairing code")
        }
      } catch (err) {
        setError("An error occurred while generating the pairing code")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    generatePairingCode()
  }, [createDeviceCode])

  return (
    <div className="min-h-screen w-full bg-[#5D5670] flex items-center justify-center">
      {isLoading ? (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Generating pairing code...
          </p>
        </div>
      ) : error ? (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
          <p className="text-red-500 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {error}
          </p>
        </div>
      ) : (
        <div className="w-full h-full">
          {/* Striped background container */}
          <div className="relative w-full h-screen overflow-hidden">
            {/* Stripes container */}
            <div className="flex h-full">
              <div className="w-[14.29%] bg-[#00D2EA]"></div>
              <div className="w-[14.28%] bg-[#FFE14D]"></div>
              <div className="w-[14.29%] bg-[#00D2EA]"></div>
              <div className="w-[14.28%] bg-[#FFE14D]"></div>
              <div className="w-[14.29%] bg-[#00D2EA]"></div>
              <div className="w-[14.28%] bg-[#FFE14D]"></div>
              <div className="w-[14.29%] bg-[#00D2EA]"></div>
            </div>
            
            {/* Content overlay - positioned higher on the screen */}
            <div className="absolute inset-0 flex flex-col items-center pt-[5vh] sm:pt-[8vh] md:pt-[10vh]">
              {/* Logo */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8">
                fibertime™
              </h1>
              
              {/* White card with pairing code - made larger */}
              <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-md w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] max-w-5xl">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 md:mb-4">
                    On your phone go to <span className="font-bold">fibertime.tv</span>
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6 md:mb-8">
                    and enter this code
                  </p>
                  
                  {/* Pairing code display - larger boxes with more space between */}
                  <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                    {pairingCode.split("").map((char, index) => (
                      <div
                        key={index}
                        className="w-14 sm:w-16 md:w-20 lg:w-28 xl:w-36 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 bg-[#FFE14D] rounded-md flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                  
                  {/* WhatsApp help */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600">
                    For help WhatsApp <span className="font-medium">078 886 1090</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}