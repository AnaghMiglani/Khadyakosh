/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LineChartComponent.tsx

"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
  dataKey: string;
  label: string;
  stroke?: string;
};

const LineChartComponent: React.FC<Props> = ({ data, dataKey, label, stroke = "#8884d8" }) => {
  // Format time
  const formatTime = (time: number) => {
    const date = new Date(time);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
  };

  return (
    <ResponsiveContainer width="100%" height="100%" >
  <LineChart data={data}>
    {/* Customize or remove grid below */}
    <CartesianGrid stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
    <XAxis
      dataKey="currTime"
      tickFormatter={formatTime}
      minTickGap={10}
      padding={{ left: 10, right: 10 }}
    />
    <YAxis domain={['dataMin - 10', 'dataMax + 10']} tickCount={6} width={40} />
    <Tooltip labelFormatter={(value) => formatTime(Number(value))} />
    <Line type="monotone" dataKey={dataKey} name={label} stroke={stroke} strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>

  );
};

export default LineChartComponent;
