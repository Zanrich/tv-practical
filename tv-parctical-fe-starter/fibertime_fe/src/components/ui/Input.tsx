// src/components/ui/Input.tsx
"use client"

import React from "react"

interface InputProps {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  error?: string
  maxLength?: number
  required?: boolean
  name?: string
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  maxLength,
  required = false,
  name,
}: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
        maxLength={maxLength}
        required={required}
        name={name}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}