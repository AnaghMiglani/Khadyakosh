"use client"

import { useState } from "react"
import Compost from "@/components/Compost"
import Vermicompost from "@/components/Vermicompost"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [selected, setSelected] = useState<"compost" | "vermicompost">("compost")

  return (
    <div className="flex justify-center w-full h-dvh">

    
      <div className="p-6 flex justify-center items-center flex-col">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

        <div className="flex space-x-4 mb-6">
          <Button
            variant={selected === "compost" ? "default" : "outline"}
            onClick={() => setSelected("compost")}
            >
            Compost
          </Button>
          <Button
            variant={selected === "vermicompost" ? "default" : "outline"}
            onClick={() => setSelected("vermicompost")}
            >
            Vermicompost
          </Button>
        </div>

        <div className="h-full">

        {selected === "compost" ? <Compost /> : <Vermicompost />}
        </div>
      </div>
            </div>
  )
}
