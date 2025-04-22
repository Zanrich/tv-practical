// src/components/PairingCodeInput.tsx
"use client"

import React, { useState, useRef, useEffect } from "react"

interface PairingCodeInputProps {
  onComplete: (code: string) => void
}

export default function PairingCodeInput({ onComplete }: PairingCodeInputProps) {
  const [code, setCode] = useState(["", "", "", ""])
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

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value.toUpperCase()
      setCode(newCode)

      // Move to next input if current input is filled
      if (value && index < 3 && inputRefs[index + 1].current) {
        inputRefs[index + 1].current?.focus()
      }

      // Check if all inputs are filled
      if (newCode.every((c) => c) && newCode.join("").length === 4) {
        onComplete(newCode.join(""))
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs[index - 1].current) {
      inputRefs[index - 1].current?.focus()
    }
  }

  return (
    <div className="flex justify-center space-x-2 my-8">
      {code.map((char, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          value={char}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
          autoComplete="off"
        />
      ))}
    </div>
  )
}