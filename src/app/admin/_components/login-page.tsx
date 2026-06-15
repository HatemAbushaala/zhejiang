"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import Image from "next/image"

function getAuthError(code: string): string {
  const map: Record<string, string> = {
    "auth/invalid-credential": "Invalid email or password",
    "auth/user-not-found": "No account with that email",
    "auth/wrong-password": "Incorrect password",
    "auth/invalid-email": "Invalid email address",
    "auth/too-many-requests": "Too many attempts, try later",
    "auth/network-request-failed": "Network error",
  }
  return map[code] ?? "Unexpected error"
}

export function LoginPage() {
  const { loginWithEmail } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await loginWithEmail(email, password)
    } catch (err: unknown) {
      setError(getAuthError((err as { code?: string })?.code ?? ""))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Image
            src="https://api.verdev.app/uploads/Gemini_Generated_Image_gcahaqgcahaqgcah_39baea28db.png"
            alt="Zhejiang Jiemai"
            width={64}
            height={64}
            className="object-contain"
          />
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500">Zhejiang Jiemai</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full mt-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
