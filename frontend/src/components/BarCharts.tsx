"use client"

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { SensorEntry } from "@/types" // or define locally if not using a shared type

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

interface SensorBarChartsProps {
  history: SensorEntry[]
}

export default function BarGraph({ history }: SensorBarChartsProps) {
  const labels = history.map((entry) =>
    new Date(entry.timestamp).toLocaleTimeString()
  )

  const gasData = history.map((entry) => entry.gas)
  const humidityData = history.map((entry) => entry.humidity)
  const temperatureData = history.map((entry) => entry.temperature)

  return (
    <div className="grid gap-6">
      <BarChart title="Gas Levels" data={gasData} labels={labels} color="#f87171" />
      <BarChart title="Humidity Levels" data={humidityData} labels={labels} color="#60a5fa" />
      <BarChart title="Temperature Levels" data={temperatureData} labels={labels} color="#facc15" />
    </div>
  )
}

function BarChart({ title, data, labels, color }) {
    const chartData = {
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: color,
          barThickness: 6,
          barPercentage: 0.8,
          categoryPercentage: 1,
        },
      ],
    }
  
    const options = {
      responsive: true,
      animation: {
        duration: 200,
        easing: 'linear',
      },
      scales: {
        x: {
          barPercentage: 0.8,
          categoryPercentage: 1,
          grid: { display: false },
          ticks: { maxRotation: 0, autoSkip: true },
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: { display: false },
      },
    }
  
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <Bar data={chartData} options={options} />
      </div>
    )
  }
  