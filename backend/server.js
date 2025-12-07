const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// In-memory "database"
let users = []; 
/*
users = [
  {
    username: "john",
    password: "1234",
    tasks: [
      { id: 1, title: "...", priority: "High", status: "todo", created: "...", details: "..." }
    ]
  }
]
*/

// ---------------- SIGNUP ----------------
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Fill all fields" });

  if (users.find((u) => u.username === username))
    return res.status(400).json({ message: "User exists" });

  users.push({ username, password, tasks: [] });

  res.json({ message: "Signup successful" });
});

// ---------------- LOGIN ----------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({ username });
});

// ---------------- GET USER TASKS ----------------
app.get("/tasks/:username", (req, res) => {
  const { username } = req.params;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  res.json(user.tasks);
});

// ---------------- ADD TASK ----------------
app.post("/tasks/:username", (req, res) => {
  const { username } = req.params;
  const taskData = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const newTask = { id: Date.now(), ...taskData };
  user.tasks.push(newTask);

  res.json(newTask);
});

// ---------------- DELETE TASK ----------------
app.delete("/tasks/:username/:id", (req, res) => {
  const { username, id } = req.params;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  user.tasks = user.tasks.filter((task) => task.id != id);

  res.json({ message: "Task deleted" });
});

// ---------------- EDIT TASK ----------------
app.put("/tasks/:username/:id", (req, res) => {
  const { username, id } = req.params;
  const update = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const task = user.tasks.find((t) => t.id == id);
  if (!task) return res.status(400).json({ message: "Task not found" });

  Object.assign(task, update);

  res.json(task);
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => console.log("Server running on port", PORT));

