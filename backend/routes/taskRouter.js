import express from "express";
import {
  getTasksByUser,
  createTaskByUser,
  updateTaskById,
  deleteTaskById,
} from "../controllers/taskController.js";
import { isLoggedin } from "../middlewares/auth.js";

const taskRouter = express.Router();

taskRouter
  .post("", isLoggedin, createTaskByUser)
  .get("", isLoggedin, getTasksByUser)
  .put("/:id", isLoggedin, updateTaskById)
  .delete("/:id", isLoggedin, deleteTaskById);

export default taskRouter;
