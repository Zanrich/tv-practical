// src/components/PairingCodeDisplay.tsx
import React from "react"

interface PairingCodeDisplayProps {
  code: string
}

export default function PairingCodeDisplay({ code }: PairingCodeDisplayProps) {
  return (
    <div className="my-8">
      <div className="flex justify-center space-x-2">
        {code.split("").map((char, index) => (
          <div
            key={index}
            className="w-12 h-16 bg-gray-100 rounded-md flex items-center justify-center text-2xl font-bold"
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  )
}