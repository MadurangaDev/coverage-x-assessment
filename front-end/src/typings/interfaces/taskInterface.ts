import { TaskPriority, TaskStatus } from "@enums";

interface ITaskHistoryRecord {
  taskStatus: TaskStatus;
  recordCreatedAt: string;
}

export interface ITask {
  taskId: number;
  taskTitle: string;
  taskDescription: string;
  taskCurrentStatus: TaskStatus;
  taskPriority: TaskPriority;
  taskDueDate: string;
  taskCreatedAt: string;
  taskUpdatedAt: string;
  taskHistory: ITaskHistoryRecord[];
}
