"use client"

import { AuthProvider, useAuth } from "@/lib/auth"
import { LoginPage } from "./login-page"

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    )
  }

  if (!user) return <LoginPage />

  return <>{children}</>
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  )
}
