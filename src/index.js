const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { startDatabase } = require("./database/mongo");
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
app.get("/", async (req, res) => {
  const query = req.query.query;
  if (!query) {
    res.send(await getTasks());
    return;
  }

  const tasks = await getTasks();
  const filteredTasks = tasks.filter((task) => {
    if (!task.title) return false;
    return task.title.toLowerCase().includes(query.toLowerCase());
  });
  res.send(filteredTasks);
});

app.post("/", async (req, res) => {
  const newTask = req.body;
  await insertTask(newTask);
  res.send({ message: "New task inserted." });
});

// endpoint to delete a task
app.delete("/:id", async (req, res) => {
  await deleteTask(req.params.id);
  res.send({ message: "Task removed." });
});

// endpoint to update a task
app.put("/:id", async (req, res) => {
  const updatedTask = req.body;
  await updateTask(req.params.id, updatedTask);
  res.send({ message: "Task updated." });
});

// starting the server
startDatabase().then(async () => {
  await insertTask({ title: "Buy milk" });

  // start the server
  app.listen(3001, async () => {
    console.log("listening on port 3001");
  });
});
