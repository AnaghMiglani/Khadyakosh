"use client";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/db";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import Card from "./Cards";
import LineChartComponent from "./LineChart";


type SensorEntry = {
  timestamp: number;
  currTime: number;
  gas: number;
  humidity: number;
  temperature: number;
};

const Compost = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const [history, setHistory] = useState<SensorEntry[]>([]);

  useEffect(() => {
    console.log(user);
    const dataRef = ref(db, `/users/${user?.uid}`);

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const value = snapshot.val();

          const entry: SensorEntry = {
            timestamp:value.timeStamp,
            currTime: Date.now(),
            gas: value.gas,
            humidity: value.humidity,
            temperature: value.temperature,
          };

          setHistory((prev) => [...prev.slice(-10), entry]);
        } else {
          setHistory([])
          console.log("No data available at this path.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching real-time data:", err);
        setError(err || "Custom Unknow Error");
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user]); 

  if (loading) {
    return <div>Loading real-time data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!history.length) {
    return <div>No data found.</div>;
  }


  const latest = history[history.length - 1];


  const getStatusColor = (type: "gas" | "humidity" | "temperature", value: number) => {
    if (type === "gas") {
      if (value <= 100) return "#22c55e"; // green
      if (value <= 200) return "#eab308"; // yellow
      return "#ef4444"; // red
    }
  
    if (type === "humidity") {
      if (value < 40) return "#eab308"; // low = yellow
      if (value <= 60) return "#22c55e"; // good = green
      return "#ef4444"; // high = red
    }
  
    if (type === "temperature") {
      if (value < 35) return "#3b82f6"; // cool = blue
      if (value <= 50) return "#22c55e"; // good = green
      return "#ef4444"; // hot = red
    }
  
    return "#6b7280"; // default gray
  };
  

  return (
    <div className="min-h-screen w-full">
      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Real-time Sensor Data</h1>
        <div className="bg-neutral-300 px-5 py-2 border rounded-2xl">
       <span className="font-medium text-sm">

            Last updated at : <span>
              {latest.timestamp}
            </span>
       </span>
          
        </div>
  
       
      </div>
  
      {/* Cards Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
  title="Gas Level"
  value={latest?.gas ?? "N/A"}
  statusColor={getStatusColor("gas", latest?.gas ?? 0)}
  suggestions={["Increase aeration", "Check for odor", "Turn compost pile"]}
>
  <div className="w-full h-48"> {/* fixed height container */}
    <LineChartComponent data={history} dataKey="gas" label="Gas Level" stroke="#2260c5" />
  </div>
</Card>


  <Card
    title="Humidity"
    value={latest?.humidity ?? "N/A"}
    statusColor={getStatusColor("humidity", latest?.humidity ?? 0)}
    suggestions={["Add dry material", "Check water content", "Cover compost bin"]}
  >
   <LineChartComponent data={history} dataKey="humidity" label="Humidity" stroke="#3b82f6" />
  </Card>

  <Card
    title="Temperature"
    value={latest?.temperature ?? "N/A"}
    statusColor={getStatusColor("temperature", latest?.temperature ?? 0)}
    suggestions={["Insulate bin", "Turn pile more often", "Monitor daily"]}
  >
    <LineChartComponent data={history} dataKey="temperature" label="Temperature" stroke="#ef4444" />
  </Card>
</div>

    </div>
  );
  
};

export default Compost;
