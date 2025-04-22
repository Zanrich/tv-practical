// src/components/ui/LoadingSpinner.tsx
import React from "react"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
}

export default function LoadingSpinner({ size = "medium" }: LoadingSpinnerProps) {
  const sizeClass = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  }

  return (
    <div className="flex justify-center">
      <div
        className={`${sizeClass[size]} rounded-full border-t-orange-500 border-r-orange-500 border-b-orange-200 border-l-orange-200 animate-spin`}
      ></div>
    </div>
  )
}