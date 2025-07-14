import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  children?: React.ReactNode;
  suggestions?: string[];
  statusColor?: string;
  statusLabel?: React.ReactNode | string; // NEW: For tooltip on status dot
}

const Card: React.FC<CardProps> = ({
  title,
  value,
  children,
  suggestions,
  statusColor = "#6b7280",
  statusLabel = "Status",
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-md transition-all  duration-300">
      {/* Title & Status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-2 relative group">
          <span className="text-gray-700 font-medium">{value}</span>
          <div
            className="w-4 h-4 rounded-full cursor-pointer"
            style={{ backgroundColor: statusColor }}
          ></div>

          {/* Tooltip */}
          <div className="absolute top-4 right-0  text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 flex justify-center items-center">
            <div>
            {statusLabel}

            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-52 w-full rounded-md flex items-center justify-center text-sm mb-4 bg-gray-50">
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
