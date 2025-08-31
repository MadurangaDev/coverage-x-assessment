import { z } from "zod";

export const newTaskRequestSchema = z.object({
  taskTitle: z
    .string({
      required_error: "Task title is required",
      invalid_type_error: "Task title must be a string",
    })
    .min(1, "Task title is required")
    .max(50, "Task title is too long"),
  taskDescription: z
    .string({
      invalid_type_error: "Task description must be a string",
      required_error: "Task description is required",
    })
    .min(1, "Task description is required")
    .max(500, "Task description is too long"),
  taskCurrentStatus: z
    .enum(["PENDING", "COMPLETED"])
    .optional()
    .default("PENDING"),
  taskPriority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().default("MEDIUM"),
  taskDueDate: z.string().date().optional().nullable(),
});

export const taskIdParameterSchema = z.object({
  task_id: z.string().regex(/^[1-9]\d*$/, "Invalid Task ID"),
});

export const getTasksFilterSchema = z.object({
  task_priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  task_status: z.enum(["PENDING", "COMPLETED"]).optional(),
  task_due_date: z.string().date().optional(),

  page_size: z
    .string()
    .regex(/^[1-9]\d*$/, "Page size must be a positive integer")
    .optional(),
  page: z
    .string()
    .regex(/^[1-9]\d*$/, "Page must be a positive integer")
    .optional(),
});
export type IGetTasksFilterDTO = z.infer<typeof getTasksFilterSchema>;

export type INewTaskRequestDTO = z.infer<typeof newTaskRequestSchema>;
