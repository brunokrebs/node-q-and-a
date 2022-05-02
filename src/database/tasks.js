const { ObjectId } = require("mongodb");
const { getDatabase } = require("./mongo");

const collectionName = "tasks";

async function insertTask(task) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(task);
  return insertedId;
}

async function getTasks() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteTask(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
}

async function updateTask(id, task) {
  const database = await getDatabase();
  delete task._id;
  await database.collection(collectionName).update(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...task,
      },
    }
  );
}

module.exports = {
  insertTask,
  getTasks,
  deleteTask,
  updateTask,
};
