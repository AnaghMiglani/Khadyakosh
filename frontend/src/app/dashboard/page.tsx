"use client";

import { useState } from "react";
import Compost from "@/components/Compost";
import Vermicompost from "@/components/Vermicompost";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [selected, setSelected] = useState<"compost" | "vermicompost">(
    "compost"
  );

  const router = useRouter();

  const logout = async () => {
    try {
      const res = await signOut(auth);
      console.log(res);

      router.push("/");
    } catch (error) {
      alert("Problem in Logout");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-dvh overflow-x-hidden bg-gray-50 relative">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Dashboard</h1>

        <div className="flex justify-center space-x-4 mb-6">
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

        <div className="w-full">
          {selected === "compost" ? <Compost /> : <Vermicompost />}
        </div>
      </div>

      <Button
        className="absolute top-5 right-16 cursor-pointer "
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}
