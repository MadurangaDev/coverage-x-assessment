import { createSlice } from "@reduxjs/toolkit";

import type { ITask } from "@interfaces";
import {
  createTaskAction,
  deleteTaskAction,
  filterTasksAction,
  updateTaskAction,
} from "@redux-actions";

interface ITaskSlice {
  tasks: Array<ITask>;
  getTasksLoading: boolean;
  getTasksError: string | null;

  createTaskResponse: ITask | null;
  createTaskLoading: boolean;
  createTaskError: string | null;

  updateTaskResponse: ITask | null;
  updateTaskLoading: boolean;
  updateTaskError: string | null;

  deleteTaskResponse: ITask | null;
  deleteTaskLoading: boolean;
  deleteTaskError: string | null;
}

const initialState: ITaskSlice = {
  tasks: [],
  getTasksLoading: false,
  getTasksError: null,

  createTaskResponse: null,
  createTaskLoading: false,
  createTaskError: null,

  updateTaskResponse: null,
  updateTaskLoading: false,
  updateTaskError: null,

  deleteTaskResponse: null,
  deleteTaskLoading: false,
  deleteTaskError: null,
};

const taskSliceObj = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterTasksAction.pending, (state) => {
        state.tasks = [];
        state.getTasksLoading = true;
        state.getTasksError = null;
      })
      .addCase(filterTasksAction.fulfilled, (state, action) => {
        state.tasks = action.payload ?? [];
        state.getTasksLoading = false;
        state.getTasksError = null;
      })
      .addCase(filterTasksAction.rejected, (state, action) => {
        state.tasks = [];
        state.getTasksLoading = false;
        state.getTasksError =
          action.error.message || "Error while fetching tasks";
      });

    builder
      .addCase(createTaskAction.pending, (state) => {
        state.createTaskResponse = null;
        state.createTaskLoading = true;
        state.createTaskError = null;
      })
      .addCase(createTaskAction.fulfilled, (state, action) => {
        state.createTaskResponse = action.payload;
        state.createTaskLoading = false;
        state.createTaskError = null;
      })
      .addCase(createTaskAction.rejected, (state, action) => {
        state.createTaskResponse = null;
        state.createTaskLoading = false;
        state.createTaskError =
          action.error.message || "Error while creating task";
      });

    builder
      .addCase(updateTaskAction.pending, (state) => {
        state.updateTaskResponse = null;
        state.updateTaskLoading = true;
        state.updateTaskError = null;
      })
      .addCase(updateTaskAction.fulfilled, (state, action) => {
        state.updateTaskResponse = action.payload;
        state.updateTaskLoading = false;
        state.updateTaskError = null;
      })
      .addCase(updateTaskAction.rejected, (state, action) => {
        state.updateTaskResponse = null;
        state.updateTaskLoading = false;
        state.updateTaskError =
          action.error.message || "Error while updating task";
      });

    builder
      .addCase(deleteTaskAction.pending, (state) => {
        state.deleteTaskResponse = null;
        state.deleteTaskLoading = true;
        state.deleteTaskError = null;
      })
      .addCase(deleteTaskAction.fulfilled, (state, action) => {
        state.deleteTaskResponse = action.payload;
        state.deleteTaskLoading = false;
        state.deleteTaskError = null;
      })
      .addCase(deleteTaskAction.rejected, (state, action) => {
        state.deleteTaskResponse = null;
        state.deleteTaskLoading = false;
        state.deleteTaskError =
          action.error.message || "Error while deleting task";
      });
  },
});

export const taskSlice = taskSliceObj.reducer;
export const taskActions = taskSliceObj.actions;
