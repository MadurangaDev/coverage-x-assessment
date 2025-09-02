import { Request, Response } from 'express';
import { StatusCodes } from '@enums';
import { TaskStatus, TaskPriority } from '@enums';
import {
  handleGetTasks,
  handleCreateTask,
  handleGetTaskById,
  handleDeleteTaskById,
  handleUpdateTask,
} from '@controllers';
import {
  createMockRequest,
  createMockResponse,
  createMockTask,
  createMockNewTaskRequest,
  createMockGetTasksFilter,
  expectResponse,
} from '../utils/testHelpers';

// Mock the service functions
jest.mock('@services', () => ({
  getTasks: jest.fn(),
  createTask: jest.fn(),
  getTasksById: jest.fn(),
  deleteTaskById: jest.fn(),
  updateTask: jest.fn(),
}));

// Mock the response utility
jest.mock('@utils', () => ({
  createResponse: jest.fn((res, body, message, statusCode) => {
    res.status(statusCode).json({ body, message });
    return res;
  }),
}));

import * as taskService from '@services';

describe('Task Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = createMockRequest();
    mockRes = createMockResponse();
    jest.clearAllMocks();
  });

  describe('handleGetTasks', () => {
    it('should handle successful task retrieval', async () => {
      // Arrange
      const mockTasks = [createMockTask(), createMockTask({ taskId: 2 })];
      const mockResponse = {
        data: mockTasks,
        pagination: {
          total_items: 2,
          page_size: 10,
          total_pages: 1,
          page: 1,
          has_next_page: false,
          has_prev_page: false,
        },
      };
      
      mockReq.query = createMockGetTasksFilter();
      (taskService.getTasks as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      await handleGetTasks(mockReq as Request, mockRes as Response);

      // Assert
      expect(taskService.getTasks).toHaveBeenCalledWith({
        filter_query: mockReq.query,
      });
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: mockResponse,
        message: 'Tasks Retrieved Successfully',
      });
    });

    it('should handle service error', async () => {
      // Arrange
      const serviceError = {
        message: 'Database connection failed',
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
      mockReq.query = createMockGetTasksFilter();
      (taskService.getTasks as jest.Mock).mockRejectedValue(serviceError);

      // Act
      await handleGetTasks(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Database connection failed',
      });
    });

    it('should handle generic error', async () => {
      // Arrange
      const genericError = new Error('Unexpected error');
      mockReq.query = createMockGetTasksFilter();
      (taskService.getTasks as jest.Mock).mockRejectedValue(genericError);

      // Act
      await handleGetTasks(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Unexpected error',
      });
    });
  });

  describe('handleCreateTask', () => {
    it('should handle successful task creation', async () => {
      // Arrange
      const newTaskData = createMockNewTaskRequest();
      const createdTask = createMockTask();
      
      mockReq.body = newTaskData;
      (taskService.createTask as jest.Mock).mockResolvedValue(createdTask);

      // Act
      await handleCreateTask(mockReq as Request, mockRes as Response);

      // Assert
      expect(taskService.createTask).toHaveBeenCalledWith(newTaskData);
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: createdTask,
        message: 'Task created successfully',
      });
    });

    it('should handle validation error', async () => {
      // Arrange
      const validationError = {
        message: 'Task title is required',
        code: StatusCodes.BAD_REQUEST,
      };
      mockReq.body = createMockNewTaskRequest();
      (taskService.createTask as jest.Mock).mockRejectedValue(validationError);

      // Act
      await handleCreateTask(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Task title is required',
      });
    });

    it('should handle generic error', async () => {
      // Arrange
      const genericError = new Error('Unexpected error');
      mockReq.body = createMockNewTaskRequest();
      (taskService.createTask as jest.Mock).mockRejectedValue(genericError);

      // Act
      await handleCreateTask(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Unexpected error',
      });
    });
  });

  describe('handleGetTaskById', () => {
    it('should handle successful task retrieval by id', async () => {
      // Arrange
      const taskId = '1';
      const task = createMockTask();
      
      mockReq.params = { task_id: taskId };
      (taskService.getTasksById as jest.Mock).mockResolvedValue(task);

      // Act
      await handleGetTaskById(mockReq as Request, mockRes as Response);

      // Assert
      expect(taskService.getTasksById).toHaveBeenCalledWith({
        task_id: Number(taskId),
      });
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: task,
        message: 'Task Retrieved Successfully',
      });
    });

    it('should handle task not found', async () => {
      // Arrange
      const taskId = '999';
      const notFoundError = {
        message: 'Task not found',
        code: StatusCodes.NOT_FOUND,
      };
      
      mockReq.params = { task_id: taskId };
      (taskService.getTasksById as jest.Mock).mockRejectedValue(notFoundError);

      // Act
      await handleGetTaskById(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Task not found',
      });
    });

    it('should handle invalid task id', async () => {
      // Arrange
      const taskId = 'invalid';
      const task = createMockTask();
      
      mockReq.params = { task_id: taskId };
      (taskService.getTasksById as jest.Mock).mockResolvedValue(task);

      // Act
      await handleGetTaskById(mockReq as Request, mockRes as Response);

      // Assert
      expect(taskService.getTasksById).toHaveBeenCalledWith({
        task_id: NaN,
      });
    });
  });

  describe('handleDeleteTaskById', () => {
    it('should handle successful task deletion', async () => {
      // Arrange
      const taskId = '1';
      const deletedTask = createMockTask();
      
      mockReq.params = { task_id: taskId };
      (taskService.deleteTaskById as jest.Mock).mockResolvedValue(deletedTask);

      // Act
      await handleDeleteTaskById(mockReq as Request, mockRes as Response);

      // Assert
      expect(taskService.deleteTaskById).toHaveBeenCalledWith({
        task_id: Number(taskId),
      });
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: deletedTask,
        message: 'Task Deleted Successfully',
      });
    });

    it('should handle task not found for deletion', async () => {
      // Arrange
      const taskId = '999';
      const notFoundError = {
        message: 'Task not found',
        code: StatusCodes.NOT_FOUND,
      };
      
      mockReq.params = { task_id: taskId };
      (taskService.deleteTaskById as jest.Mock).mockRejectedValue(notFoundError);

      // Act
      await handleDeleteTaskById(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Task not found',
      });
    });
  });

  describe('handleUpdateTask', () => {
    it('should handle successful task update', async () => {
      // Arrange
      const taskId = '1';
      const updateData = createMockNewTaskRequest();
      const updatedTask = createMockTask();
      
      mockReq.params = { task_id: taskId };
      mockReq.body = updateData;
      (taskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

      // Act
      await handleUpdateTask(mockReq as Request, mockRes as Response);

      // Assert
      expect(taskService.updateTask).toHaveBeenCalledWith({
        task_id: Number(taskId),
        taskData: updateData,
      });
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: updatedTask,
        message: 'Task Updated Successfully',
      });
    });

    it('should handle task not found for update', async () => {
      // Arrange
      const taskId = '999';
      const updateData = createMockNewTaskRequest();
      const notFoundError = {
        message: 'Task not found',
        code: StatusCodes.NOT_FOUND,
      };
      
      mockReq.params = { task_id: taskId };
      mockReq.body = updateData;
      (taskService.updateTask as jest.Mock).mockRejectedValue(notFoundError);

      // Act
      await handleUpdateTask(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Task not found',
      });
    });

    it('should handle validation error during update', async () => {
      // Arrange
      const taskId = '1';
      const updateData = createMockNewTaskRequest();
      const validationError = {
        message: 'Task title is required',
        code: StatusCodes.BAD_REQUEST,
      };
      
      mockReq.params = { task_id: taskId };
      mockReq.body = updateData;
      (taskService.updateTask as jest.Mock).mockRejectedValue(validationError);

      // Act
      await handleUpdateTask(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Task title is required',
      });
    });
  });
});
