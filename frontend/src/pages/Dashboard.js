import React, { useState } from "react";
import { 
  Plus, CheckCircle, Calendar, Trash2, Edit2, Save, X, LogOut 
} from "lucide-react";

// --- Initial Mock Tasks ---
const initialTasks = [
  {
    id: 1,
    title: "Decrypt Transmission Package 7.1",
    details: "Run decryption script on secured partition.",
    priority: "High",
    status: "In Progress",
    created: "2077-10-25",
  },
  {
    id: 2,
    title: "Audit Node Security Log - Sector Gamma",
    details: "Verify all access points are sealed post-incident.",
    priority: "Moderate",
    status: "Completed",
    created: "2077-10-23",
  },
];

// --- Progress Circle Component ---
const ProgressRing = ({ radius, stroke, progress, colorClass, shadowClass }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className={`shadow-lg ${shadowClass}`}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      <circle
        stroke="currentColor"
        strokeWidth={stroke}
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="text-gray-700/50"
      />
      <circle
        strokeWidth={stroke}
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.7s ease-out", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        strokeLinecap="round"
        className={`${colorClass}`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className={`font-mono text-xl font-bold ${colorClass.replace("stroke-", "text-")}`}
      >
        {progress}%
      </text>
    </svg>
  );
};

const Dashboard = ({ onLogout }) => {
  // ... your state and functions

  return (
    <div className="dashboard-container">
      <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1>Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>

      {/* Your task list and other content */}
    </div>
  );
};


export default Dashboard;
