import { PrismaClient } from "@prisma/client";

import { StatusCodes } from "@enums";
import { IGetTasksFilterDTO, INewTaskRequestDTO } from "@requests";
import { ITask } from "@interfaces";
import { formatTask } from "@utils";
import { IPaginationResponse } from "@responses";
import { createPaginationMetaData } from "@/utils/pagination.util";

const prisma = new PrismaClient();

const checkTaskAvailability = async (task_id: number): Promise<ITask> => {
  try {
    const task = await prisma.task.findUnique({
      where: { task_id, isDeleted: 0 },
      include: {
        task_history: {
          orderBy: {
            record_id: "desc",
          },
        },
      },
    });
    if (!task) {
      throw {
        message: "Task not found",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return formatTask(task);
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to check task availability",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};

export const createTask = async (
  taskData: INewTaskRequestDTO
): Promise<ITask> => {
  try {
    const newTask = await prisma.task.create({
      data: {
        task_title: taskData.taskTitle,
        task_description: taskData.taskDescription,
        task_current_status: taskData.taskCurrentStatus,
        task_priority: taskData.taskPriority,
        task_due_date: taskData.taskDueDate
          ? new Date(taskData.taskDueDate)
          : null,
        task_history: {
          create: [
            {
              task_status: taskData.taskCurrentStatus,
            },
          ],
        },
      },
      include: {
        task_history: true,
      },
    });
    const preparedTask: ITask = formatTask(newTask);
    return preparedTask;
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to create task",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};

export const getTasks = async ({
  filter_query,
}: {
  filter_query: IGetTasksFilterDTO;
}): Promise<IPaginationResponse<ITask[]>> => {
  try {
    const { task_priority, task_status, task_due_date, page, page_size } =
      filter_query;

    const where = {
      isDeleted: 0,
      ...(task_priority && { task_priority }),
      ...(task_status && { task_current_status: task_status }),
      ...(task_due_date && { task_due_date: new Date(task_due_date) }),
    };

    const currentPage = page ? Number(page) : 1;
    const size = page_size ? Number(page_size) : undefined;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        ...(size && { take: size }),
        skip: size ? (currentPage - 1) * size : 0,
        orderBy: { task_id: "desc" },
        include: {
          task_history: { orderBy: { record_id: "desc" } },
        },
      }),
      prisma.task.count({ where }),
    ]);

    const preparedTasks = tasks.map(formatTask);

    return {
      data: preparedTasks,
      pagination: createPaginationMetaData({
        totalItems: total,
        pageSize: size ?? total,
        currentPage,
      }),
    };
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to retrieve tasks",
      code:
        ((err as any).code as StatusCodes) ?? StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const getTasksById = async ({
  task_id,
}: {
  task_id: number;
}): Promise<ITask> => {
  try {
    const task = await checkTaskAvailability(task_id);
    return task;
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to retrieve tasks",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};

export const deleteTaskById = async ({
  task_id,
}: {
  task_id: number;
}): Promise<ITask> => {
  try {
    const task = await checkTaskAvailability(task_id);
    await prisma.task.update({
      where: { task_id },
      data: { isDeleted: 1 },
    });
    return task;
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to delete task",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};

export const updateTask = async ({
  task_id,
  taskData,
}: {
  task_id: number;
  taskData: INewTaskRequestDTO;
}) => {
  try {
    const task = await checkTaskAvailability(task_id);
    const updatedTask = await prisma.task.update({
      where: { task_id },
      data: {
        task_title: taskData.taskTitle,
        task_description: taskData.taskDescription,
        task_current_status: taskData.taskCurrentStatus,
        task_priority: taskData.taskPriority,
        task_due_date: taskData.taskDueDate
          ? new Date(taskData.taskDueDate)
          : null,
        ...(task.taskCurrentStatus !== taskData.taskCurrentStatus && {
          task_history: {
            create: {
              task_status: taskData.taskCurrentStatus,
            },
          },
        }),
      },
      include: {
        task_history: {
          orderBy: {
            record_id: "desc",
          },
        },
      },
    });
    const preparedTask: ITask = formatTask(updatedTask);
    return preparedTask;
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to update task",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};
