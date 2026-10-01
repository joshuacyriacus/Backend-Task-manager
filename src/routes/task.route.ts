import express from "express"
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/task.controller";
import { validateId } from "../middleware/validateId.middleware";
import { validateTask } from "../middleware/validateTask";

import { getRequestMethodandUrl } from "../middleware/logger.middleware";


export const taskRouter = express.Router();

taskRouter.get("/tasks", getRequestMethodandUrl, getAllTasks)

taskRouter.get("/tasks/:id", getRequestMethodandUrl, validateId, getTaskById)

taskRouter.post("/tasks", getRequestMethodandUrl, validateTask, createTask)

taskRouter.patch("/tasks/:id", validateId, getRequestMethodandUrl, updateTask)

taskRouter.delete("/tasks/:id", getRequestMethodandUrl ,validateId, deleteTask);

