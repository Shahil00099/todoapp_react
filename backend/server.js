const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// In-memory "database"
let users = [];
let tasks = [
  {
    id: 1,
    title: "Decrypt Transmission Package 7.1",
    details: "Initiate T-4 protocol...",
    priority: "High",
    status: "In Progress",
    created: "2077-10-25",
  },
];

// --- ROUTES ---

// Get tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  res.json(newTask);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.json({ message: "Deleted" });
});

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ message: "Fill all fields" });

  if (users.find((u) => u.username === username))
    return res.json({ message: "User exists" });

  users.push({ username, password });
  res.json({ message: "Signup successful" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) res.json({ username: user.username });
  else res.json({ message: "Invalid credentials" });
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
