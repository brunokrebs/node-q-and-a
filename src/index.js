const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const {
  deleteTask,
  insertTask,
  getTasks,
  updateTask,
} = require("./database/tasks");

// defining the Express app
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

// defining an endpoint to return all tasks
app.get("/", (req, res) => {
  const query = req.query.query;
  if (!query) {
    res.send(getTasks());
    return;
  }

  const tasks = getTasks();
  const filteredTasks = tasks.filter((task) => {
    if (!task.title) return false;
    return task.title.toLowerCase().includes(query.toLowerCase());
  });
  res.send(filteredTasks);
});

app.post("/", (req, res) => {
  const newTask = req.body;
  console.log('====== - newTask:', newTask);
  insertTask(newTask);
  res.send({ message: "New task inserted." });
});

// endpoint to delete a task
app.delete("/:id", (req, res) => {
  deleteTask(req.params.id);
  res.send({ message: "Task removed." });
});

// endpoint to update a task
app.put("/:id", (req, res) => {
  const updatedTask = req.body;
  updateTask(req.params.id, updatedTask);
  res.send({ message: "Task updated." });
});

// start the server
app.listen(3001, () => {
  insertTask({ title: "Buy milk" });
  console.log("listening on port 3001");
});
