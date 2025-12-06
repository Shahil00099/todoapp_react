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

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // --- CRUD Functions ---
  const handleAddTask = () => {
    if (!newTaskTitle) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      details: "No details provided",
      priority: "Moderate",
      status: "Not Started",
      created: new Date().toISOString().split("T")[0],
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
  };

  const handleDeleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const handleEditTask = (task) => {
    setEditingId(task.id);
    setNewTitle(task.title);
  };

  const handleSaveEdit = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task)));
    setEditingId(null);
    setNewTitle("");
  };

  const handleToggleStatus = (task) => {
    const newStatus =
      task.status === "Completed"
        ? "In Progress"
        : task.status === "In Progress"
        ? "Not Started"
        : "Completed";
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)));
  };

  // --- Status Metrics ---
  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const notStartedCount = totalTasks - completedCount - inProgressCount;
  const completedPercent = totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0;
  const inProgressPercent = totalTasks ? Math.round((inProgressCount / totalTasks) * 100) : 0;
  const notStartedPercent = totalTasks ? Math.round((notStartedCount / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-200 antialiased overflow-hidden flex">
      {/* --- Sidebar --- */}
      <div className="w-64 bg-gray-900 border-r border-fuchsia-600/50 p-6 flex flex-col justify-between">
        <div>
          <div className="text-xl font-mono text-fuchsia-400 mb-8 border-b border-fuchsia-600 pb-2">
            CYBERNETICS-OS
          </div>
          {/* User Profile */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="relative p-1 border-2 border-cyan-500 rounded-full shadow-lg shadow-cyan-500/30">
              <img
                src="https://placehold.co/60x60/1a1a1a/06B6D4?text=USR"
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-gray-900"></span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-cyan-400">Agent Kilo</h3>
            <p className="text-xs text-gray-500 font-mono mt-1">kilo_77@corp.net</p>
          </div>

          {/* Navigation Links */}
          <nav>
            {["Dashboard", "Mission Log", "Settings"].map((item) => (
              <div key={item} className="flex items-center p-3 my-2 rounded-lg cursor-pointer transition-all duration-200 text-gray-400 hover:bg-gray-800 hover:text-cyan-400">
                {item}
              </div>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-6 border-t border-gray-800/50 cursor-pointer text-red-400 hover:bg-gray-800 hover:text-red-500 p-3 rounded-lg flex items-center">
          <LogOut className="w-5 h-5 mr-3" /> <span className="font-mono">Logoff Session</span>
        </div>
      </div>

      {/* --- Main Content --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-cyan-400 tracking-wider mb-4 sm:mb-0">
            Welcome back, <span className="text-fuchsia-400">Agent Kilo</span> 👋
          </h1>
        </header>

        {/* Add Task */}
        <div className="flex flex-col sm:flex-row mb-10 p-2 bg-gray-800 rounded-xl shadow-xl border border-fuchsia-700/50">
          <input
            type="text"
            placeholder="Enter new mission title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 p-3 bg-gray-900 text-gray-300 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none border-b sm:border-b-0 sm:border-r border-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            disabled={!newTaskTitle}
            className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold p-3 sm:px-5 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none transition-all duration-200 flex items-center justify-center shadow-lg shadow-fuchsia-800/50 disabled:opacity-50 mt-2 sm:mt-0"
          >
            <Plus className="w-5 h-5 sm:mr-2" /> <span className="hidden sm:inline">Add Mission</span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-cyan-400 border-b border-cyan-600 pb-1 mb-4">
              Active Mission Log ({totalTasks})
            </h2>
            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
              {tasks.length > 0 ? tasks.map((task) => (
                <div key={task.id} className="p-4 bg-gray-800 rounded-xl shadow-xl border border-cyan-800 hover:border-cyan-500/50 transition-all duration-300 flex justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center text-sm text-gray-400 mb-2 font-mono">
                      <Calendar className="w-3 h-3 mr-2 text-fuchsia-400" /> Created: {task.created}
                    </div>
                    {editingId === task.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="flex-1 bg-gray-700 text-cyan-400 text-xl font-bold p-1 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-400 min-w-0"
                          autoFocus
                        />
                        <button onClick={() => handleSaveEdit(task.id)} className="text-green-500 hover:text-green-400 p-1">
                          <Save className="w-5 h-5" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-red-500 hover:text-red-400 p-1">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <h3 className={`text-xl font-bold text-cyan-400 mb-2 ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </h3>
                    )}
                    <p className="text-sm text-gray-300 mb-3">{task.details}</p>
                    <div className="flex flex-wrap items-center text-xs space-x-2 sm:space-x-4">
                      <span className={`px-2 py-0.5 rounded font-mono ${
                        task.priority === 'High' ? 'bg-red-900 text-red-400 border border-red-700' : 
                        task.priority === 'Moderate' ? 'bg-yellow-900 text-yellow-400 border border-yellow-700' :
                        'bg-green-900 text-green-400 border border-green-700'
                      }`}>Priority: {task.priority}</span>
                      <button
                        onClick={() => handleToggleStatus(task)}
                        className={`px-2 py-0.5 rounded font-mono cursor-pointer transition-colors duration-200 border ${
                          task.status === 'In Progress' ? 'bg-cyan-900 text-cyan-400 border-cyan-700 hover:bg-cyan-800' : 
                          task.status === 'Completed' ? 'bg-green-900 text-green-400 border-green-700 hover:bg-green-800' :
                          'bg-fuchsia-900 text-fuchsia-400 border-fuchsia-700 hover:bg-fuchsia-800'
                        } mt-2 sm:mt-0`}
                      >
                        Status: {task.status}
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded shadow-md shadow-cyan-800/30 transition-all duration-150"
                      title="Edit Title"
                      disabled={editingId === task.id}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded shadow-md shadow-red-800/30 transition-all duration-150"
                      title="Delete Mission"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="p-6 text-center text-gray-500 border border-dashed border-cyan-700 rounded-lg font-mono">
                  No missions logged. Enter a title above and click 'Add Mission' to begin.
                </div>
              )}
            </div>
          </div>

          {/* Status Rings Column */}
          <div className="lg:col-span-1">
            <div className="p-5 bg-gray-800 rounded-xl shadow-xl border border-cyan-800 mb-8">
              <h2 className="text-lg font-bold text-fuchsia-400 mb-4 border-b border-fuchsia-600 pb-2">System Status Metrics ({totalTasks})</h2>
              <div className="flex justify-around items-center space-x-2">
                <div className="flex flex-col items-center">
                  <ProgressRing radius={40} stroke={6} progress={completedPercent} colorClass="stroke-green-400" shadowClass="drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                  <p className="mt-2 text-xs text-green-400">Completed ({completedCount})</p>
                </div>
                <div className="flex flex-col items-center">
                  <ProgressRing radius={40} stroke={6} progress={inProgressPercent} colorClass="stroke-cyan-400" shadowClass="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                  <p className="mt-2 text-xs text-cyan-400">In Progress ({inProgressCount})</p>
                </div>
                <div className="flex flex-col items-center">
                  <ProgressRing radius={40} stroke={6} progress={notStartedPercent} colorClass="stroke-fuchsia-400" shadowClass="drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]" />
                  <p className="mt-2 text-xs text-fuchsia-400">Idle/Pending ({notStartedCount})</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
