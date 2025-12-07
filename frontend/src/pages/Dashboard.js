import React, { useState } from "react";
import "../styles/dashboard.css";

const Dashboard = ({ user, handleLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const getProgressColor = (val) => {
    if (val <= 30) return "#e84118";   // Red
    if (val <= 70) return "#fbc531";   // Yellow
    return "#4cd137";                  // Green
  };

  const completed = tasks.filter((t) => t.done).length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const notStarted = tasks.filter((t) => t.status === "Not Started").length;
  const progress = tasks.length === 0 
    ? 0 
    : Math.round((completed / tasks.length) * 100);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          name: newTask,
          description: "Task description...",
          priority: "Moderate",
          status: "Not Started",
          done: false,
        },
      ]);
      setNewTask("");
    }
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
              status: task.done ? "Not Started" : "Completed",
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-box">
          <img src="https://via.placeholder.com/80" alt="Profile" />
          <h3>{user}</h3>
          <p>{user}@gmail.com</p>
        </div>

        <nav className="menu">
          <button className="menu-item active">Dashboard</button>
          <button className="menu-item">Vital Task</button>
          <button className="menu-item">My Tasks</button>
          <button className="menu-item">Task Categories</button>
          <button className="menu-item">Settings</button>
          <button className="menu-item">Help</button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className="main-area">
        {/* Top Bar */}
        <header className="topbar">
          <h2>Welcome back, {user} 👋</h2>
          <input className="search-bar" placeholder="Search your task here..." />
          <div className="top-icons">
            <span>🔍</span>
            <span>📅</span>
            <span>🔔</span>
          </div>
          <span className="date">{new Date().toLocaleDateString()}</span>
        </header>

        {/* Content Layout */}
        <div className="content-grid">
          {/* To-Do Section */}
          <section className="todo-section card">
            <div className="card-header">
              <h3>To-Do</h3>
              <button className="add-btn" onClick={addTask}>+ Add Task</button>
            </div>

            <input
              className="task-input"
              type="text"
              placeholder="Add new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />

            <div className="task-list">
              {tasks.map((task) => (
                <div className="task-card" key={task.id}>
                  <div className="task-header">
                    <h4>{task.name}</h4>
                    <div className="task-actions">
                      <button onClick={() => toggleDone(task.id)}>✔</button>
                      <button onClick={() => deleteTask(task.id)}>✖</button>
                    </div>
                  </div>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span>Priority: {task.priority}</span>
                    <span>Status: {task.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Task Status */}
              <section className="status-section card">
  <h3>Task Progress</h3>

  <div className="progress-circle">
    <svg viewBox="0 0 36 36" className="circular-chart">
      <path
        className="circle-bg"
        d="
          M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831
        "
      />

      <path
        className="circle"
        stroke={getProgressColor(progress)}
        strokeDasharray={`${progress}, 100`}
        d="
          M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831
        "
      />

      <text x="18" y="20.35" className="percentage">
        {progress}%
      </text>
    </svg>

    <p className="circle-label">Tasks Completed</p>
  </div>

  <div className="status-details">
    <p><strong>{completed}</strong> Completed</p>
    <p><strong>{inProgress}</strong> In Progress</p>
    <p><strong>{notStarted}</strong> Not Started</p>
  </div>
</section>



          {/* Completed Tasks */}
          <section className="completed-section card">
            <h3>Completed Tasks</h3>
            {tasks
              .filter((t) => t.done)
              .map((task) => (
                <div key={task.id} className="completed-card">
                  <h4>{task.name}</h4>
                  <p>Status: Completed</p>
                </div>
              ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
