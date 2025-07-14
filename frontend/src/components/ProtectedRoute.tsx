"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])


  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-dvh w-full">
        <Loader2 className="animate-spin text-gray-500" size={40} />
      </div>
    );
  }

  return <>{children}</>
}
