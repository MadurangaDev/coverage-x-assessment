import type { TaskPriority, TaskStatus } from "@enums";

export interface INewTaskRequest {
  taskTitle: string;
  taskDescription: string;
  taskCurrentStatus: TaskStatus;
  taskPriority: TaskPriority;
  taskDueDate: string | null;
}

export interface IFilterTasksQueries {
  task_priority?: TaskPriority;
  task_status?: TaskStatus;
  task_due_date?: string;

  page_size?: number;
  page?: number;
}
