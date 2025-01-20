import Task from "../models/task.js";

export const getTasksByUser = async (req, res) => {
  const { userName } = req.user;

  try {
    const tasks = await Task.find({ author: userName });
    return res.status(200).json(tasks);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: `Error fetching tasks: ${err.message}` });
  }
};

export const createTaskByUser = async (req, res) => {
  const { userName } = req.user;
  const task = req.body;
  task.author = userName;

  try {
    const newTask = new Task(task);
    await newTask.save();
    return res.status(201).json({ newTask });
  } catch (err) {
    return res.status(500).json({ msg: `Error creating new task: ${err}` });
  }
};

export const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  const inValidFields = Object.keys(updatedFields).filter(
    (key) => !["title", "desc", "completed"].includes(key),
  );

  if (inValidFields.length) {
    return res
      .status(400)
      .json({ msg: `Include invalid fields: ${inValidFields}` });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(500).json({ msg: `Error updating task: ${err.message}` });
  }
};

export const deleteTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json({ msg: "Task deleted successfully" });
  } catch (err) {
    return res.status(500).json({ msg: `Error deleting task: ${err.message}` });
  }
};
