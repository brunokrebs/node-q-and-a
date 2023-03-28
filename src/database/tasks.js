const tasks = [];

function insertTask(task) {
  tasks.push({
    _id: Date.now(),
    ...task,
  })
}

function getTasks() {
  return tasks;
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t._id == id);

  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

function updateTask(id, task) {
  const index = tasks.findIndex(t => t._id == id);
  const taskFound = tasks[index];

  if (index !== -1) {
    tasks.splice(index, 1, { ...taskFound, ...task, _id: id });
  }
}

module.exports = {
  insertTask,
  getTasks,
  deleteTask,
  updateTask,
};
