// components/Card.tsx

import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  children?: React.ReactNode;
  suggestions?: string[];
  statusColor?: string; // NEW: allows dynamic status dot
}

const Card: React.FC<CardProps> = ({
  title,
  value,
  children,
  suggestions,
  statusColor = "#6b7280", // default gray
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
      {/* Title and Value */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-2 justify-between">
          <span className="text-gray-700 font-medium">{value}</span>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: statusColor }}></div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-52 w-full rounded-md flex items-center justify-center text-sm mb-4">
        {children ?? "Graph will appear here"}
      </div>

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="text-sm text-gray-600">
          <h4 className="font-medium mb-1">Suggestions:</h4>
          <ul className="list-disc list-inside space-y-1">
            {suggestions.map((sug, idx) => (
              <li key={idx}>{sug}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;
