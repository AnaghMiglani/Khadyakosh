/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/db";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import Card from "./Cards";
import LineChartComponent from "./LineChart";
import { FiAlertTriangle, FiCheckCircle, FiActivity } from "react-icons/fi";

type SensorEntry = {
  timestamp: number;
  currTime: number;
  gas: number;
  humidity: number;
  temperature: number;
};

const Vermicompost = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const [history, setHistory] = useState<SensorEntry[]>([]);

  useEffect(() => {
    if (!user) return;
    const dataRef = ref(db, `/users/${user.uid}`);

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const value = snapshot.val();

          const entry: SensorEntry = {
            timestamp: value.timeStamp,
            currTime: Date.now(),
            gas: value.gas,
            humidity: value.humidity,
            temperature: value.temperature,
          };

          setHistory((prev) => [...prev.slice(-10), entry]);
        } else {
          setHistory([]);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const latest = history[history.length - 1] ?? {
    timestamp: 0,
    gas: 0,
    humidity: 0,
    temperature: 0,
  };

  const getStatusInfo = (
    type: "gas" | "humidity" | "temperature",
    value: number
  ) => {
    if (type === "gas") {
      if (value <= 100)
        return { color: "#22c55e", label: "Good", icon: <FiCheckCircle /> };
      if (value <= 200)
        return {
          color: "#eab308",
          label: "Moderate",
          icon: <FiAlertTriangle />,
        };
      return { color: "#ef4444", label: "High", icon: <FiActivity /> };
    }

    if (type === "humidity") {
      if (value < 40)
        return { color: "#eab308", label: "Low", icon: <FiAlertTriangle /> };
      if (value <= 60)
        return { color: "#22c55e", label: "Optimal", icon: <FiCheckCircle /> };
      return { color: "#ef4444", label: "High", icon: <FiActivity /> };
    }

    if (type === "temperature") {
      if (value < 35)
        return { color: "#3b82f6", label: "Cool", icon: <FiAlertTriangle /> };
      if (value <= 50)
        return { color: "#22c55e", label: "Ideal", icon: <FiCheckCircle /> };
      return { color: "#ef4444", label: "Hot", icon: <FiActivity /> };
    }

    return { color: "#6b7280", label: "Unknown", icon: null };
  };

  const formatTimestamp = (timestamp: number) => {
    if (!timestamp) return "N/A";
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(new Date(timestamp));
  };

  if (loading)
    return <div className="p-10 text-center">⏳ Loading real-time data...</div>;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        ⚠️ Error: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {history.length === 0 && (
        <div className="w-full max-w-7xl mx-auto px-4 text-center text-gray-600 my-16 mb-12">
          <strong className="text-6xl"> No data found</strong>

          <p className="text-xl">
            Please connect your ESP to start receiving real-time sensor
            readings.
          </p>
        </div>
      )}
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Real-time Vermi-Compost Sensor Dashboard
        </h1>
        <div className="text-sm bg-white shadow px-4 py-2 rounded-lg border text-gray-600">
          <span className="font-medium">Last updated:</span>{" "}
          <span>{formatTimestamp(latest.timestamp)}</span>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Gas Level",
            value: latest.gas,
            type: "gas",
            suggestions: [
              "Increase aeration",
              "Check for odor",
              "Turn compost pile",
            ],
            stroke: "#2260c5",
          },
          {
            title: "Humidity",
            value: latest.humidity,
            type: "humidity",
            suggestions: [
              "Add dry material",
              "Check water content",
              "Cover compost bin",
            ],
            stroke: "#3b82f6",
          },
          {
            title: "Temperature",
            value: latest.temperature,
            type: "temperature",
            suggestions: ["Insulate bin", "Turn pile often", "Monitor daily"],
            stroke: "#ef4444",
          },
        ].map(({ title, value, type, suggestions, stroke }) => {
          const { color, label, icon } = getStatusInfo(type as any, value);
          const displaySuggestions = value === 0 ? ["N/A"] : suggestions;
          return (
            <Card
              key={title}
              title={title}
              value={value ?? "N/A"}
              statusColor={color}
              suggestions={displaySuggestions}
              statusLabel={
                <div className="flex items-center gap-2 text-sm justify-center">
                  <span
                    className="inline-flex items-center gap-1 bg-opacity-10 px-2 py-1 rounded-full"
                    style={{ backgroundColor: color }}
                  >
                    <span style={{ color }}>{icon}</span>
                    <span className="text-gray-800 font-medium">{label}</span>
                  </span>
                </div>
              }
            >
              <div className="w-full h-48">
                <LineChartComponent
                  data={history}
                  dataKey={type}
                  label={title}
                  stroke={stroke}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Vermicompost;
