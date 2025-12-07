const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory users DB
let users = [];
let tasks = [];

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if(users.find(u => u.username === username)) return res.status(400).json({ message: "User exists" });
  users.push({ username, password });
  res.json({ message: "Signup successful" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if(!user) return res.status(400).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful", username });
});

// Logout (frontend can just remove token / session)
app.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

// CRUD tasks
app.get("/tasks", (req, res) => res.json({ tasks }));
app.post("/tasks", (req, res) => {
  const { task } = req.body;
  tasks.push(task);
  res.json({ tasks });
});
app.put("/tasks/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const { task } = req.body;
  if(tasks[index]) tasks[index] = task;
  res.json({ tasks });
});
app.delete("/tasks/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if(tasks[index]) tasks.splice(index, 1);
  res.json({ tasks });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
