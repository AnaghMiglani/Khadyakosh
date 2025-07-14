"use client";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/db";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import BarGraph from "./BarCharts";

type dbData = {
  gas?: number;
  humidity?: number;
  temperature?: number;
};
type SensorEntry = {
  timestamp: number;
  gas: number;
  humidity: number;
  temperature: number;
};

const Compost = () => {
  const [data, setData] = useState<dbData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          setData(value);

          const entry: SensorEntry = {
            timestamp: Date.now(),
            gas: value.gas,
            humidity: value.humidity,
            temperature: value.temperature,
          };

          setHistory((prev) => [...prev.slice(-10), entry]);
        } else {
          setData(null); // Data might have been deleted
          console.log("No data available at this path.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching real-time data:", err);
        setError(err);
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <div>Loading real-time data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <div>
      <h1>Real-time Data:</h1>
      <pre>{JSON.stringify(history)}</pre>
      <BarGraph history={history} />

    </div>
  );
};

export default Compost;
