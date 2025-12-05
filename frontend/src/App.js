import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  // Fetch all tasks from backend
// GET tasks
const fetchTasks = () => {
  fetch("http://localhost:5000/tasks")
    .then(res => res.json())
    .then(data => setTasks(Array.isArray(data.tasks) ? data.tasks : data)); 
};



  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a task
  const addTask = () => {
    if (!newTask.trim()) return;

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask })
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks);
        setNewTask("");
      });
  };

  // Delete a task
  const deleteTask = (index) => {
  fetch(`http://localhost:5000/tasks/${index}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => setTasks(data.tasks)); // make sure this matches backend response
};


  // Start editing
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index]);
  };

  // Save edited task
  const saveEdit = (index) => {
    fetch(`http://localhost:5000/tasks/${index}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: editedTask })
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks);
        setEditingIndex(null);
      });
  };

  return (
    <div style={{ width: "400px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>React To-Do App (CRUD)</h1>

      {/* Add Task */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px" }}>Add</button>
      </div>

      <ul style={{ marginTop: "20px", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              listStyle: "none",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >

            {/* Editing Mode */}
            {editingIndex === index ? (
              <>
                <input
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  style={{ flex: 1, padding: "5px" }}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => setEditingIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>{task}</span>
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
