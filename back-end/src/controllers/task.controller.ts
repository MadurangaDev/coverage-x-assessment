import { Request, Response } from "express";
import { config } from "dotenv";

import { StatusCodes } from "@enums";
import { createResponse } from "@utils";
import {
  createTask,
  deleteTaskById,
  getTasks,
  getTasksById,
  updateTask,
} from "@services";

config();

export const handleGetTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks({
      filter_query: req.query,
    });
    return createResponse(
      res,
      tasks,
      "Tasks Retrieved Successfully",
      StatusCodes.OK
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Failed to get tasks",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};

export const handleCreateTask = async (req: Request, res: Response) => {
  try {
    const newTask = await createTask(req.body);
    return createResponse(
      res,
      newTask,
      "Task created successfully",
      StatusCodes.CREATED
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Failed to create task",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};

export const handleGetTaskById = async (req: Request, res: Response) => {
  try {
    const { task_id } = req.params;
    const task = await getTasksById({ task_id: Number(task_id) });
    return createResponse(
      res,
      task,
      "Task Retrieved Successfully",
      StatusCodes.OK
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Failed to get task",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};

export const handleDeleteTaskById = async (req: Request, res: Response) => {
  try {
    const { task_id } = req.params;
    const deletedTask = await deleteTaskById({ task_id: Number(task_id) });
    return createResponse(
      res,
      deletedTask,
      "Task Deleted Successfully",
      StatusCodes.OK
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Failed to delete task",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};

export const handleUpdateTask = async (req: Request, res: Response) => {
  try {
    const { task_id } = req.params;
    const updatedTask = await updateTask({
      task_id: Number(task_id),
      taskData: req.body,
    });
    return createResponse(
      res,
      updatedTask,
      "Task Updated Successfully",
      StatusCodes.OK
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Failed to update task.",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};
