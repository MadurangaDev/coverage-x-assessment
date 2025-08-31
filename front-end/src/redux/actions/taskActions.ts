import { createAsyncThunk } from "@reduxjs/toolkit";

import { type ITask } from "@interfaces";
import {
  type IBaseResponse,
  type IBaseResponseArray,
  type IPaginationResponse,
} from "@responses";
import { type IFilterTasksQueries, type INewTaskRequest } from "@requests";
import { axiosInstance } from "@utils";
import { taskEndpoints } from "@constants";

export const filterTasksAction = createAsyncThunk(
  "task/getAllTasks",
  async (filters: IFilterTasksQueries, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<
        IBaseResponseArray<IPaginationResponse<ITask>>
      >(taskEndpoints.getAll, {
        params: filters,
      });
      if (response.data.body) {
        return response.data.body.data;
      } else {
        return rejectWithValue("No task list returned");
      }
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
          "Error while fetching tasks"
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
