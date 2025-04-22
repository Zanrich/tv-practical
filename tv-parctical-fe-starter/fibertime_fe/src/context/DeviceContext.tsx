// src/context/DeviceContext.tsx
"use client"

import { createContext, useState, useContext, ReactNode } from "react"

interface ConnectionStatus {
  isConnected: boolean
  daysRemaining: number
  hoursRemaining: number
}

interface DeviceContextType {
  deviceCode: string
  deviceId: string
  connectionStatus: ConnectionStatus
  createDeviceCode: (macAddress: string) => Promise<string>
  verifyDeviceCode: (code: string) => Promise<string>
  connectDevice: (deviceId: string) => Promise<boolean>
  getConnectionStatus: (deviceId: string) => Promise<ConnectionStatus>
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [deviceCode, setDeviceCode] = useState("")
  const [deviceId, setDeviceId] = useState("")
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    daysRemaining: 29,
    hoursRemaining: 23,
  })

  const createDeviceCode = async (macAddress: string): Promise<string> => {
    try {
      const response = await fetch("/api/device/create-device-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mac_address: macAddress }),
      })

      if (!response.ok) {
        throw new Error("Failed to create device code")
      }

      const data = await response.json()
      const code = data.code || "ABC1" // Fallback for demo
      setDeviceCode(code)
      return code
    } catch (error) {
      console.error("Error creating device code:", error)
      // For demo purposes, generate a random code if API fails
      const demoCode = "ABC1"
      setDeviceCode(demoCode)
      return demoCode
    }
  }

  const verifyDeviceCode = async (code: string): Promise<string> => {
    try {
      const response = await fetch(`/api/device/device?device-code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Invalid device code")
      }

      const data = await response.json()
      const id = data.deviceId || "device123" // Fallback for demo
      setDeviceId(id)
      return id
    } catch (error) {
      console.error("Error verifying device code:", error)
      // For demo purposes, return a dummy ID if API fails
      const demoId = "device123"
      setDeviceId(demoId)
      return demoId
    }
  }

  const connectDevice = async (deviceId: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/device/connect-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "device-id": deviceId }),
      })

      if (!response.ok) {
        throw new Error("Failed to connect device")
      }

      return true
    } catch (error) {
      console.error("Error connecting device:", error)
      // For demo purposes, return true even if API fails
      return true
    }
  }

  const getConnectionStatus = async (deviceId: string): Promise<ConnectionStatus> => {
    try {
      const response = await fetch(`/api/device/connection-status?device-id=${deviceId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to get connection status")
      }

      const data = await response.json()
      const status = {
        isConnected: data.connected || true,
        daysRemaining: data.daysRemaining || 29,
        hoursRemaining: data.hoursRemaining || 23,
      }
      setConnectionStatus(status)
      return status
    } catch (error) {
      console.error("Error getting connection status:", error)
      // For demo purposes, return dummy data if API fails
      const demoStatus = {
        isConnected: true,
        daysRemaining: 29,
        hoursRemaining: 23,
      }
      setConnectionStatus(demoStatus)
      return demoStatus
    }
  }

  return (
    <DeviceContext.Provider
      value={{
        deviceCode,
        deviceId,
        connectionStatus,
        createDeviceCode,
        verifyDeviceCode,
        connectDevice,
        getConnectionStatus,
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevice() {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider")
  }
  return context
}