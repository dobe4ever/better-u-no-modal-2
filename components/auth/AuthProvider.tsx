// components/auth/AuthProvider.tsx
// This is a client-side component that manages authentication state for the application

"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { LoginSignup } from "./LoginSignup"

// Create an authentication context to share user data and signOut function throughout the app
// This context will be undefined until properly initialized by the provider
const AuthContext = createContext<{ user: any; signOut: () => Promise<void> } | undefined>(undefined)

// The AuthProvider component wraps the application and manages authentication state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State to store the current authenticated user (null means not authenticated)
  const [user, setUser] = useState<any>(null)
  // Get Next.js router instance for navigation
  const router = useRouter()

  // Set up a listener for authentication state changes when the component mounts
  useEffect(() => {
    // Subscribe to Supabase auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // If session exists, user is logged in
      if (session) {
        setUser(session.user)
      } else {
        // No session means user is logged out
        setUser(null)
      }
      // Refresh the page to update UI based on new auth state
      router.refresh()
    })

    // Clean up subscription when component unmounts to prevent memory leaks
    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  // Function to handle user sign out
  const signOut = async () => {
    // Call Supabase auth signOut method
    await supabase.auth.signOut()
    // Redirect user to home page after signing out
    router.push("/")
  }

  // If no user is authenticated, show the login/signup screen instead of the app content
  if (!user) {
    return <LoginSignup />
  }

  // If user is authenticated, provide the auth context to all child components
  // This makes user data and signOut function available through the useAuth hook
  return <AuthContext.Provider value={{ user, signOut }}>{children}</AuthContext.Provider>
}

// Custom hook to access the authentication context from any component
export const useAuth = () => {
  // Get the current auth context
  const context = useContext(AuthContext)
  // Throw an error if useAuth is used outside of an AuthProvider
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  // Return the context with user data and signOut function
  return context
}

// Default export for the AuthProvider component
export default AuthProvider