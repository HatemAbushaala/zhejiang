"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth"
import { auth } from "@/lib/firebase-config"

interface AuthCtx {
  user: User | null
  isLoading: boolean
  loginWithEmail: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const Ctx = createContext<AuthCtx | null>(null)

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useAuth must be inside AuthProvider")
  return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setIsLoading(false)
    })
    return unsub
  }, [])

  async function loginWithEmail(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    await signOut(auth)
  }

  return <Ctx.Provider value={{ user, isLoading, loginWithEmail, logout }}>{children}</Ctx.Provider>
}
