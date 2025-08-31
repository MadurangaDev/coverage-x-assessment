import { ITask } from "@interfaces";
import { PrismaClient, Prisma } from "@prisma/client";

type ITaskFromDB = Prisma.taskGetPayload<{
  include: { task_history: true };
}>;

export const formatTask = (task: ITaskFromDB): ITask => {
  return {
    taskId: task.task_id,
    taskTitle: task.task_title,
    taskDescription: task.task_description,
    taskCurrentStatus: task.task_current_status,
    taskPriority: task.task_priority,
    taskDueDate: task.task_due_date,
    taskCreatedAt: task.task_created_at,
    taskUpdatedAt: task.task_updated_at,
    taskHistory: task.task_history.map((history) => ({
      taskStatus: history.task_status,
      recordCreatedAt: history.record_created_at,
    })),
  };
};
