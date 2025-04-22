// src/components/ui/Button.tsx
"use client"

import React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "outline"
  fullWidth?: boolean
  type?: "button" | "submit" | "reset"
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  type = "button",
}: ButtonProps) {
  // Define styles based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-orange-500 text-white hover:bg-orange-600"
      case "secondary":
        return "bg-blue-500 text-white hover:bg-blue-600"
      case "outline":
        return "bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50"
      default:
        return "bg-orange-500 text-white hover:bg-orange-600"
    }
  }

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${getVariantClasses()} ${
        fullWidth ? "w-full" : ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}