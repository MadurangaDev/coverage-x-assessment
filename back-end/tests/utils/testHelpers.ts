import { Request, Response } from 'express';
import { StatusCodes } from '@enums';
import { TaskStatus, TaskPriority } from '@enums';
import { ITask } from '@interfaces';

// Mock Express Request and Response objects
export const createMockRequest = (overrides: Partial<Request> = {}): Partial<Request> => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  ...overrides,
});

export const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  return res;
};

// Test data factories
export const createMockTask = (overrides: Partial<ITask> = {}): ITask => ({
  taskId: 1,
  taskTitle: 'Test Task',
  taskDescription: 'Test Description',
  taskCurrentStatus: TaskStatus.PENDING,
  taskPriority: TaskPriority.MEDIUM,
  taskDueDate: new Date('2024-12-31'),
  taskCreatedAt: new Date('2024-01-01'),
  taskUpdatedAt: new Date('2024-01-01'),
  taskHistory: [
    {
      taskStatus: TaskStatus.PENDING,
      recordCreatedAt: new Date('2024-01-01'),
    },
  ],
  ...overrides,
});

export const createMockTaskFromDB = (overrides: any = {}) => ({
  task_id: 1,
  task_title: 'Test Task',
  task_description: 'Test Description',
  task_current_status: 'PENDING' as any,
  task_priority: 'MEDIUM' as any,
  task_due_date: new Date('2024-12-31'),
  task_created_at: new Date('2024-01-01'),
  task_updated_at: new Date('2024-01-01'),
  isDeleted: 0,
  task_history: [
    {
      record_id: 1,
      task_id: 1,
      task_status: 'PENDING' as any,
      record_created_at: new Date('2024-01-01'),
    },
  ],
  ...overrides,
});

export const createMockNewTaskRequest = (overrides: any = {}) => ({
  taskTitle: 'New Test Task',
  taskDescription: 'New Test Description',
  taskCurrentStatus: TaskStatus.PENDING,
  taskPriority: TaskPriority.HIGH,
  taskDueDate: '2024-12-31',
  ...overrides,
});

export const createMockGetTasksFilter = (overrides: any = {}) => ({
  task_priority: TaskPriority.MEDIUM,
  task_status: TaskStatus.PENDING,
  task_due_date: '2024-12-31',
  page: '1',
  page_size: '10',
  ...overrides,
});

// Error helpers
export const createMockError = (message: string, code: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR) => ({
  message,
  code,
});

// Database mock helpers
export const createMockPrismaClient = () => ({
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  $queryRaw: jest.fn(),
  $disconnect: jest.fn(),
});

// Assertion helpers
export const expectResponse = (
  res: any,
  expectedStatus: StatusCodes,
  expectedMessage?: string,
  expectedBody?: any
) => {
  expect(res.status).toHaveBeenCalledWith(expectedStatus);
  expect(res.json).toHaveBeenCalled();
  
  const responseBody = res.json.mock.calls[0][0];
  expect(responseBody.message).toBe(expectedMessage);
  
  if (expectedBody !== undefined) {
    expect(responseBody.body).toEqual(expectedBody);
  }
};
