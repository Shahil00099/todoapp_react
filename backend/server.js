const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = []; // in-memory array

// READ - Get all tasks
app.get("/tasks", (req, res) => {
  res.json({ tasks }); // return object
});

// CREATE
app.post("/tasks", (req, res) => {
  const { task } = req.body;
  if (task && task.trim() !== "") {
    tasks.push(task);
  }
  res.json({ tasks });
});

// UPDATE
app.put("/tasks/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const { task } = req.body;
  if (!isNaN(index) && tasks[index] !== undefined) {
    tasks[index] = task;
  }
  res.json({ tasks });
});

// DELETE
app.delete("/tasks/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && tasks[index] !== undefined) {
    tasks.splice(index, 1);
  }
  res.json({ tasks });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
