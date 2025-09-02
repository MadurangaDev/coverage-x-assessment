import { createAsyncThunk } from "@reduxjs/toolkit";

import { type ITask } from "@interfaces";
import { type IBaseResponse, type IPaginatedResponse } from "@responses";
import { type IFilterTasksQueries, type INewTaskRequest } from "@requests";
import { axiosInstance } from "@utils";
import { taskEndpoints } from "@constants";

export const filterTasksAction = createAsyncThunk(
  "task/getAllTasks",
  async (filters: IFilterTasksQueries, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<
        IBaseResponse<IPaginatedResponse<ITask[]>>
      >(taskEndpoints.getAll, {
        params: filters,
      });
      const tasks = response.data.body?.data ?? [];
      return tasks;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error while fetching tasks"
      );
    }
  }
);

export const createTaskAction = createAsyncThunk(
  "task/createTask",
  async (taskData: INewTaskRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IBaseResponse<ITask>>(
        taskEndpoints.create,
        taskData
      );
      if (response.data.body) {
        return response.data.body;
      } else {
        return rejectWithValue("Task creation failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error while creating tasks"
      );
    }
  }
);

export const updateTaskAction = createAsyncThunk(
  "task/updateTask",
  async (
    taskData: INewTaskRequest & { taskId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put<IBaseResponse<ITask>>(
        taskEndpoints.update(taskData.taskId),
        taskData
      );
      if (response.data.body) {
        return response.data.body;
      } else {
        return rejectWithValue("Task update failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error while updating task"
      );
    }
  }
);

export const deleteTaskAction = createAsyncThunk(
  "task/deleteTask",
  async (taskId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete<IBaseResponse<ITask>>(
        taskEndpoints.delete(taskId)
      );
      if (response.data.body) {
        return response.data.body;
      } else {
        return rejectWithValue("Task deletion failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error while deleting task"
      );
    }
  }
);
