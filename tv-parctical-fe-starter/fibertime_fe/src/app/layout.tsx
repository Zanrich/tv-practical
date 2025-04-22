// src/app/layout.tsx
import { AuthProvider } from "../context/AuthContext"
import { DeviceProvider } from "../context/DeviceContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <AuthProvider>
          <DeviceProvider>
            {children}
          </DeviceProvider>
        </AuthProvider>
      </body>
    </html>
  )
}