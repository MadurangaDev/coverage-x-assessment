import request from 'supertest';
import express from 'express';
import { StatusCodes } from '@enums';
import { TaskStatus, TaskPriority } from '@enums';
import { taskRoutes } from '@routes';
import { createResponse } from '@utils';

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

describe('Task API Integration Tests', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/tasks', taskRoutes);
    jest.clearAllMocks();
  });

  describe('GET /tasks', () => {
    it('should return tasks successfully', async () => {
      // Arrange
      const mockTasks = [
        {
          taskId: 1,
          taskTitle: 'Test Task 1',
          taskDescription: 'Description 1',
          taskCurrentStatus: TaskStatus.PENDING,
          taskPriority: TaskPriority.MEDIUM,
          taskDueDate: new Date('2024-12-31'),
          taskCreatedAt: new Date('2024-01-01'),
          taskUpdatedAt: new Date('2024-01-01'),
          taskHistory: [],
        },
      ];
      const mockResponse = {
        data: mockTasks,
        pagination: {
          total_items: 1,
          page_size: 10,
          total_pages: 1,
          page: 1,
          has_next_page: false,
          has_prev_page: false,
        },
      };
      (taskService.getTasks as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const response = await request(app)
        .get('/tasks')
        .query({ page: '1', page_size: '10' });

      // Assert
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({
        body: {
          ...mockResponse,
          data: mockResponse.data.map(task => ({
            ...task,
            taskCreatedAt: task.taskCreatedAt.toISOString(),
            taskUpdatedAt: task.taskUpdatedAt.toISOString(),
            taskDueDate: task.taskDueDate.toISOString(),
          })),
        },
        message: 'Tasks Retrieved Successfully',
      });
      expect(taskService.getTasks).toHaveBeenCalledWith({
        filter_query: { page: '1', page_size: '10' },
      });
    });

    it('should handle service error', async () => {
      // Arrange
      const serviceError = {
        message: 'Database connection failed',
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
      (taskService.getTasks as jest.Mock).mockRejectedValue(serviceError);

      // Act
      const response = await request(app).get('/tasks');

      // Assert
      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        body: null,
        message: 'Database connection failed',
      });
    });
  });

  describe('POST /tasks', () => {
    it('should create task successfully', async () => {
      // Arrange
      const newTaskData = {
        taskTitle: 'New Task',
        taskDescription: 'New Description',
        taskCurrentStatus: TaskStatus.PENDING,
        taskPriority: TaskPriority.HIGH,
        taskDueDate: '2024-12-31',
      };
      const createdTask = {
        taskId: 1,
        ...newTaskData,
        taskDueDate: new Date(newTaskData.taskDueDate),
        taskCreatedAt: new Date('2024-01-01'),
        taskUpdatedAt: new Date('2024-01-01'),
        taskHistory: [],
      };
      (taskService.createTask as jest.Mock).mockResolvedValue(createdTask);

      // Act
      const response = await request(app)
        .post('/tasks')
        .send(newTaskData);

      // Assert
      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual({
        body: {
          ...createdTask,
          taskCreatedAt: createdTask.taskCreatedAt.toISOString(),
          taskUpdatedAt: createdTask.taskUpdatedAt.toISOString(),
          taskDueDate: createdTask.taskDueDate.toISOString(),
        },
        message: 'Task created successfully',
      });
      expect(taskService.createTask).toHaveBeenCalledWith(newTaskData);
    });

    it('should handle validation error', async () => {
      // Arrange
      const invalidTaskData = {
        taskTitle: '', // Invalid: empty title
        taskDescription: 'Description',
      };

      // Act
      const response = await request(app)
        .post('/tasks')
        .send(invalidTaskData);

      // Assert
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toContain('Task title is required');
    });

    it('should handle service error during creation', async () => {
      // Arrange
      const newTaskData = {
        taskTitle: 'New Task',
        taskDescription: 'New Description',
        taskCurrentStatus: TaskStatus.PENDING,
        taskPriority: TaskPriority.HIGH,
        taskDueDate: '2024-12-31',
      };
      const serviceError = {
        message: 'Task title already exists',
        code: StatusCodes.CONFLICT,
      };
      (taskService.createTask as jest.Mock).mockRejectedValue(serviceError);

      // Act
      const response = await request(app)
        .post('/tasks')
        .send(newTaskData);

      // Assert
      expect(response.status).toBe(StatusCodes.CONFLICT);
      expect(response.body).toEqual({
        body: null,
        message: 'Task title already exists',
      });
    });
  });

  describe('GET /tasks/:task_id', () => {
    it('should return task by id successfully', async () => {
      // Arrange
      const taskId = '1';
      const task = {
        taskId: 1,
        taskTitle: 'Test Task',
        taskDescription: 'Description',
        taskCurrentStatus: TaskStatus.PENDING,
        taskPriority: TaskPriority.MEDIUM,
        taskDueDate: new Date('2024-12-31'),
        taskCreatedAt: new Date('2024-01-01'),
        taskUpdatedAt: new Date('2024-01-01'),
        taskHistory: [],
      };
      (taskService.getTasksById as jest.Mock).mockResolvedValue(task);

      // Act
      const response = await request(app).get(`/tasks/${taskId}`);

      // Assert
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({
        body: {
          ...task,
          taskCreatedAt: task.taskCreatedAt.toISOString(),
          taskUpdatedAt: task.taskUpdatedAt.toISOString(),
          taskDueDate: task.taskDueDate.toISOString(),
        },
        message: 'Task Retrieved Successfully',
      });
      expect(taskService.getTasksById).toHaveBeenCalledWith({
        task_id: Number(taskId),
      });
    });

    it('should handle task not found', async () => {
      // Arrange
      const taskId = '999';
      const notFoundError = {
        message: 'Task not found',
        code: StatusCodes.NOT_FOUND,
      };
      (taskService.getTasksById as jest.Mock).mockRejectedValue(notFoundError);

      // Act
      const response = await request(app).get(`/tasks/${taskId}`);

      // Assert
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual({
        body: null,
        message: 'Task not found',
      });
    });

    it('should handle invalid task id format', async () => {
      // Act
      const response = await request(app).get('/tasks/invalid');

      // Assert
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toContain('Invalid Task ID');
    });
  });

  describe('PUT /tasks/:task_id', () => {
    it('should update task successfully', async () => {
      // Arrange
      const taskId = '1';
      const updateData = {
        taskTitle: 'Updated Task',
        taskDescription: 'Updated Description',
        taskCurrentStatus: TaskStatus.COMPLETED,
        taskPriority: TaskPriority.HIGH,
        taskDueDate: '2024-12-31',
      };
      const updatedTask = {
        taskId: 1,
        ...updateData,
        taskDueDate: new Date(updateData.taskDueDate),
        taskCreatedAt: new Date('2024-01-01'),
        taskUpdatedAt: new Date('2024-01-02'),
        taskHistory: [],
      };
      (taskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

      // Act
      const response = await request(app)
        .put(`/tasks/${taskId}`)
        .send(updateData);

      // Assert
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({
        body: {
          ...updatedTask,
          taskCreatedAt: updatedTask.taskCreatedAt.toISOString(),
          taskUpdatedAt: updatedTask.taskUpdatedAt.toISOString(),
          taskDueDate: updatedTask.taskDueDate.toISOString(),
        },
        message: 'Task Updated Successfully',
      });
      expect(taskService.updateTask).toHaveBeenCalledWith({
        task_id: Number(taskId),
        taskData: updateData,
      });
    });

    it('should handle task not found for update', async () => {
      // Arrange
      const taskId = '999';
      const updateData = {
        taskTitle: 'Updated Task',
        taskDescription: 'Updated Description',
        taskCurrentStatus: TaskStatus.COMPLETED,
        taskPriority: TaskPriority.HIGH,
        taskDueDate: '2024-12-31',
      };
      const notFoundError = {
        message: 'Task not found',
        code: StatusCodes.NOT_FOUND,
      };
      (taskService.updateTask as jest.Mock).mockRejectedValue(notFoundError);

      // Act
      const response = await request(app)
        .put(`/tasks/${taskId}`)
        .send(updateData);

      // Assert
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual({
        body: null,
        message: 'Task not found',
      });
    });

    it('should handle validation error during update', async () => {
      // Arrange
      const taskId = '1';
      const invalidUpdateData = {
        taskTitle: '', // Invalid: empty title
        taskDescription: 'Description',
      };

      // Act
      const response = await request(app)
        .put(`/tasks/${taskId}`)
        .send(invalidUpdateData);

      // Assert
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toContain('Task title is required');
    });
  });

  describe('DELETE /tasks/:task_id', () => {
    it('should delete task successfully', async () => {
      // Arrange
      const taskId = '1';
      const deletedTask = {
        taskId: 1,
        taskTitle: 'Deleted Task',
        taskDescription: 'Description',
        taskCurrentStatus: TaskStatus.PENDING,
        taskPriority: TaskPriority.MEDIUM,
        taskDueDate: new Date('2024-12-31'),
        taskCreatedAt: new Date('2024-01-01'),
        taskUpdatedAt: new Date('2024-01-01'),
        taskHistory: [],
      };
      (taskService.deleteTaskById as jest.Mock).mockResolvedValue(deletedTask);

      // Act
      const response = await request(app).delete(`/tasks/${taskId}`);

      // Assert
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual({
        body: {
          ...deletedTask,
          taskCreatedAt: deletedTask.taskCreatedAt.toISOString(),
          taskUpdatedAt: deletedTask.taskUpdatedAt.toISOString(),
          taskDueDate: deletedTask.taskDueDate.toISOString(),
        },
        message: 'Task Deleted Successfully',
      });
      expect(taskService.deleteTaskById).toHaveBeenCalledWith({
        task_id: Number(taskId),
      });
    });

    it('should handle task not found for deletion', async () => {
      // Arrange
      const taskId = '999';
      const notFoundError = {
        message: 'Task not found',
        code: StatusCodes.NOT_FOUND,
      };
      (taskService.deleteTaskById as jest.Mock).mockRejectedValue(notFoundError);

      // Act
      const response = await request(app).delete(`/tasks/${taskId}`);

      // Assert
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual({
        body: null,
        message: 'Task not found',
      });
    });

    it('should handle invalid task id format for deletion', async () => {
      // Act
      const response = await request(app).delete('/tasks/invalid');

      // Assert
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toContain('Invalid Task ID');
    });
  });
});
