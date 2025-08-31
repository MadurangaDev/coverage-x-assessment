export interface ITask {
  taskId: number;
  taskTitle: string;
  taskDescription: string;
  taskCurrentStatus: "PENDING" | "COMPLETED";
  taskPriority: "LOW" | "MEDIUM" | "HIGH";
  taskDueDate: Date | null;
  taskCreatedAt: Date;
  taskUpdatedAt: Date;
  taskHistory: {
    taskStatus: "PENDING" | "COMPLETED";
    recordCreatedAt: Date;
  }[];
}
