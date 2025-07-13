"use client"

import { LoginForm } from "@/components/Login"
import { signIn } from "@/firebase/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()


  const handleLogin = async () => {
    try {
        console.log(email)
        console.log(password)
      const result = await signIn(email, password)
      console.log("Logged in user:", result.user)
      router.push('/dashboard')

    } catch (error) {
      if (error instanceof Error) {
        console.error("Login error:", error.message)
      } else {
        console.error("Login error:", error)
      }
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onLogin={handleLogin}
        />
      </div>
    </div>
  )
}
