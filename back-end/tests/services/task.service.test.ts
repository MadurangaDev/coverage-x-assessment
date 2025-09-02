import { StatusCodes } from '@enums';
import { createTask, getTasks, getTasksById, deleteTaskById, updateTask } from '@services';

// Mock Prisma Client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    $disconnect: jest.fn(),
  })),
}));

// Mock utility functions
jest.mock('@utils', () => ({
  formatTask: jest.fn((task) => ({
    taskId: task.task_id,
    taskTitle: task.task_title,
    taskDescription: task.task_description,
    taskCurrentStatus: task.task_current_status,
    taskPriority: task.task_priority,
    taskDueDate: task.task_due_date,
    taskCreatedAt: task.task_created_at,
    taskUpdatedAt: task.task_updated_at,
    taskHistory: task.task_history || [],
  })),
  createPaginationMetaData: jest.fn(({ totalItems, pageSize, currentPage }) => ({
    total_items: totalItems,
    page_size: pageSize,
    total_pages: Math.ceil(totalItems / pageSize),
    page: currentPage,
    has_next_page: currentPage < Math.ceil(totalItems / pageSize),
    has_prev_page: currentPage > 1,
  })),
}));

describe('Task Service', () => {
  describe('createTask', () => {
    it('should be a function', () => {
      expect(typeof createTask).toBe('function');
    });

    it('should accept one parameter', () => {
      expect(createTask.length).toBe(1);
    });
  });

  describe('getTasks', () => {
    it('should be a function', () => {
      expect(typeof getTasks).toBe('function');
    });

    it('should accept one parameter', () => {
      expect(getTasks.length).toBe(1);
    });
  });

  describe('getTasksById', () => {
    it('should be a function', () => {
      expect(typeof getTasksById).toBe('function');
    });

    it('should accept one parameter', () => {
      expect(getTasksById.length).toBe(1);
    });
  });

  describe('deleteTaskById', () => {
    it('should be a function', () => {
      expect(typeof deleteTaskById).toBe('function');
    });

    it('should accept one parameter', () => {
      expect(deleteTaskById.length).toBe(1);
    });
  });

  describe('updateTask', () => {
    it('should be a function', () => {
      expect(typeof updateTask).toBe('function');
    });

    it('should accept one parameter', () => {
      expect(updateTask.length).toBe(1);
    });
  });
});