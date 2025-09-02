import { Router } from "express";

import {
  handleDeleteTaskById,
  handleGetTaskById,
  handleGetTasks,
  handleUpdateTask,
  handleCreateTask,
} from "@controllers";
import {
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
} from "@middlewares";
import {
  taskIdParameterSchema,
  newTaskRequestSchema,
  getTasksFilterSchema,
} from "@requests";

const taskRoutes = Router();

taskRoutes.get("/", validateRequestQuery(getTasksFilterSchema), handleGetTasks);

taskRoutes.post(
  "/",
  validateRequestBody(newTaskRequestSchema),
  handleCreateTask
);

taskRoutes.get(
  "/:task_id",
  validateRequestParams(taskIdParameterSchema),
  handleGetTaskById
);

taskRoutes.delete(
  "/:task_id",
  validateRequestParams(taskIdParameterSchema),
  handleDeleteTaskById
);

taskRoutes.put(
  "/:task_id",
  validateRequestParams(taskIdParameterSchema),
  validateRequestBody(newTaskRequestSchema),
  handleUpdateTask
);

export { taskRoutes };
