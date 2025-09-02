import { TaskPriority, TaskStatus } from "@enums";

export interface ITask {
  taskId: number;
  taskTitle: string;
  taskDescription: string;
  taskCurrentStatus: TaskStatus;
  taskPriority: TaskPriority;
  taskDueDate: Date | null;
  taskCreatedAt: Date;
  taskUpdatedAt: Date;
  taskHistory: {
    taskStatus: TaskStatus;
    recordCreatedAt: Date;
  }[];
}
