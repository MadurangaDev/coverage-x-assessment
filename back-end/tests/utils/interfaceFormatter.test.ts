import { formatTask } from '@utils';
import { TaskStatus, TaskPriority } from '@enums';

describe('Interface Formatter', () => {
  describe('formatTask', () => {
    it('should format task from database to interface correctly', () => {
      // Arrange
      const taskFromDB = {
        task_id: 1,
        task_title: 'Test Task',
        task_description: 'Test Description',
        task_current_status: 'PENDING',
        task_priority: 'MEDIUM',
        task_due_date: new Date('2024-12-31'),
        task_created_at: new Date('2024-01-01'),
        task_updated_at: new Date('2024-01-02'),
        isDeleted: 0,
        task_history: [
          {
            record_id: 1,
            task_id: 1,
            task_status: 'PENDING',
            record_created_at: new Date('2024-01-01'),
          },
          {
            record_id: 2,
            task_id: 1,
            task_status: 'COMPLETED',
            record_created_at: new Date('2024-01-02'),
          },
        ],
      };

      // Act
      const result = formatTask(taskFromDB as any);

      // Assert
      expect(result).toEqual({
        taskId: 1,
        taskTitle: 'Test Task',
        taskDescription: 'Test Description',
        taskCurrentStatus: 'PENDING',
        taskPriority: 'MEDIUM',
        taskDueDate: new Date('2024-12-31'),
        taskCreatedAt: new Date('2024-01-01'),
        taskUpdatedAt: new Date('2024-01-02'),
        taskHistory: [
          {
            taskStatus: 'PENDING',
            recordCreatedAt: new Date('2024-01-01'),
          },
          {
            taskStatus: 'COMPLETED',
            recordCreatedAt: new Date('2024-01-02'),
          },
        ],
      });
    });

    it('should handle task with null due date', () => {
      // Arrange
      const taskFromDB = {
        task_id: 2,
        task_title: 'Task Without Due Date',
        task_description: 'Description',
        task_current_status: 'PENDING',
        task_priority: 'HIGH',
        task_due_date: null,
        task_created_at: new Date('2024-01-01'),
        task_updated_at: new Date('2024-01-01'),
        isDeleted: 0,
        task_history: [
          {
            record_id: 3,
            task_id: 2,
            task_status: 'PENDING',
            record_created_at: new Date('2024-01-01'),
          },
        ],
      };

      // Act
      const result = formatTask(taskFromDB as any);

      // Assert
      expect(result).toEqual({
        taskId: 2,
        taskTitle: 'Task Without Due Date',
        taskDescription: 'Description',
        taskCurrentStatus: 'PENDING',
        taskPriority: 'HIGH',
        taskDueDate: null,
        taskCreatedAt: new Date('2024-01-01'),
        taskUpdatedAt: new Date('2024-01-01'),
        taskHistory: [
          {
            taskStatus: 'PENDING',
            recordCreatedAt: new Date('2024-01-01'),
          },
        ],
      });
    });

    it('should handle task with empty history', () => {
      // Arrange
      const taskFromDB = {
        task_id: 3,
        task_title: 'Task With No History',
        task_description: 'Description',
        task_current_status: 'COMPLETED',
        task_priority: 'LOW',
        task_due_date: new Date('2024-12-31'),
        task_created_at: new Date('2024-01-01'),
        task_updated_at: new Date('2024-01-01'),
        isDeleted: 0,
        task_history: [],
      };

      // Act
      const result = formatTask(taskFromDB as any);

      // Assert
      expect(result).toEqual({
        taskId: 3,
        taskTitle: 'Task With No History',
        taskDescription: 'Description',
        taskCurrentStatus: 'COMPLETED',
        taskPriority: 'LOW',
        taskDueDate: new Date('2024-12-31'),
        taskCreatedAt: new Date('2024-01-01'),
        taskUpdatedAt: new Date('2024-01-01'),
        taskHistory: [],
      });
    });

    it('should handle task with multiple history entries', () => {
      // Arrange
      const taskFromDB = {
        task_id: 4,
        task_title: 'Task With Multiple History',
        task_description: 'Description',
        task_current_status: 'COMPLETED',
        task_priority: 'MEDIUM',
        task_due_date: new Date('2024-12-31'),
        task_created_at: new Date('2024-01-01'),
        task_updated_at: new Date('2024-01-03'),
        isDeleted: 0,
        task_history: [
          {
            record_id: 4,
            task_id: 4,
            task_status: 'PENDING',
            record_created_at: new Date('2024-01-01'),
          },
          {
            record_id: 5,
            task_id: 4,
            task_status: 'PENDING',
            record_created_at: new Date('2024-01-02'),
          },
          {
            record_id: 6,
            task_id: 4,
            task_status: 'COMPLETED',
            record_created_at: new Date('2024-01-03'),
          },
        ],
      };

      // Act
      const result = formatTask(taskFromDB as any);

      // Assert
      expect(result).toEqual({
        taskId: 4,
        taskTitle: 'Task With Multiple History',
        taskDescription: 'Description',
        taskCurrentStatus: 'COMPLETED',
        taskPriority: 'MEDIUM',
        taskDueDate: new Date('2024-12-31'),
        taskCreatedAt: new Date('2024-01-01'),
        taskUpdatedAt: new Date('2024-01-03'),
        taskHistory: [
          {
            taskStatus: 'PENDING',
            recordCreatedAt: new Date('2024-01-01'),
          },
          {
            taskStatus: 'PENDING',
            recordCreatedAt: new Date('2024-01-02'),
          },
          {
            taskStatus: 'COMPLETED',
            recordCreatedAt: new Date('2024-01-03'),
          },
        ],
      });
    });

    it('should handle task with all priority levels', () => {
      // Arrange
      const priorities = ['LOW', 'MEDIUM', 'HIGH'];
      
      priorities.forEach((priority, index) => {
        const taskFromDB = {
          task_id: index + 1,
          task_title: `Task ${priority}`,
          task_description: 'Description',
          task_current_status: 'PENDING',
          task_priority: priority,
          task_due_date: new Date('2024-12-31'),
          task_created_at: new Date('2024-01-01'),
          task_updated_at: new Date('2024-01-01'),
          isDeleted: 0,
          task_history: [
            {
              record_id: index + 1,
              task_id: index + 1,
              task_status: 'PENDING',
              record_created_at: new Date('2024-01-01'),
            },
          ],
        };

        // Act
        const result = formatTask(taskFromDB as any);

        // Assert
        expect(result.taskPriority).toBe(priority);
      });
    });

    it('should handle task with all status levels', () => {
      // Arrange
      const statuses = ['PENDING', 'COMPLETED'];
      
      statuses.forEach((status, index) => {
        const taskFromDB = {
          task_id: index + 1,
          task_title: `Task ${status}`,
          task_description: 'Description',
          task_current_status: status,
          task_priority: 'MEDIUM',
          task_due_date: new Date('2024-12-31'),
          task_created_at: new Date('2024-01-01'),
          task_updated_at: new Date('2024-01-01'),
          isDeleted: 0,
          task_history: [
            {
              record_id: index + 1,
              task_id: index + 1,
              task_status: status,
              record_created_at: new Date('2024-01-01'),
            },
          ],
        };

        // Act
        const result = formatTask(taskFromDB as any);

        // Assert
        expect(result.taskCurrentStatus).toBe(status);
      });
    });
  });
});
