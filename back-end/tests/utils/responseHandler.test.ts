import { Response } from 'express';
import { StatusCodes } from '@enums';
import { createResponseBody, createResponse } from '@utils';
import { createMockResponse } from './testHelpers';

describe('Response Handler Utils', () => {
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockRes = createMockResponse();
    jest.clearAllMocks();
  });

  describe('createResponseBody', () => {
    it('should create response body with data and message', () => {
      // Arrange
      const body = { id: 1, name: 'Test' };
      const message = 'Success';

      // Act
      const result = createResponseBody(body, message);

      // Assert
      expect(result).toEqual({
        body,
        message,
      });
    });

    it('should create response body with null data', () => {
      // Arrange
      const body = null;
      const message = 'Error occurred';

      // Act
      const result = createResponseBody(body, message);

      // Assert
      expect(result).toEqual({
        body: null,
        message: 'Error occurred',
      });
    });

    it('should create response body with array data', () => {
      // Arrange
      const body = [{ id: 1 }, { id: 2 }];
      const message = 'Items retrieved';

      // Act
      const result = createResponseBody(body, message);

      // Assert
      expect(result).toEqual({
        body: [{ id: 1 }, { id: 2 }],
        message: 'Items retrieved',
      });
    });

    it('should create response body with empty string message', () => {
      // Arrange
      const body = { data: 'test' };
      const message = '';

      // Act
      const result = createResponseBody(body, message);

      // Assert
      expect(result).toEqual({
        body: { data: 'test' },
        message: '',
      });
    });
  });

  describe('createResponse', () => {
    it('should create successful response with 200 status', () => {
      // Arrange
      const body = { id: 1, name: 'Test' };
      const message = 'Success';
      const statusCode = StatusCodes.OK;

      // Act
      const result = createResponse(mockRes as Response, body, message, statusCode);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        body,
        message,
      });
      expect(result).toBe(mockRes);
    });

    it('should create error response with 400 status', () => {
      // Arrange
      const body = null;
      const message = 'Bad Request';
      const statusCode = StatusCodes.BAD_REQUEST;

      // Act
      const result = createResponse(mockRes as Response, body, message, statusCode);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Bad Request',
      });
      expect(result).toBe(mockRes);
    });

    it('should create created response with 201 status', () => {
      // Arrange
      const body = { id: 1, name: 'Created Item' };
      const message = 'Item created successfully';
      const statusCode = StatusCodes.CREATED;

      // Act
      const result = createResponse(mockRes as Response, body, message, statusCode);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith({
        body,
        message,
      });
      expect(result).toBe(mockRes);
    });

    it('should create not found response with 404 status', () => {
      // Arrange
      const body = null;
      const message = 'Resource not found';
      const statusCode = StatusCodes.NOT_FOUND;

      // Act
      const result = createResponse(mockRes as Response, body, message, statusCode);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Resource not found',
      });
      expect(result).toBe(mockRes);
    });

    it('should create internal server error response with 500 status', () => {
      // Arrange
      const body = null;
      const message = 'Internal server error';
      const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

      // Act
      const result = createResponse(mockRes as Response, body, message, statusCode);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Internal server error',
      });
      expect(result).toBe(mockRes);
    });

    it('should handle complex data structures', () => {
      // Arrange
      const body = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
        ],
        pagination: {
          page: 1,
          total: 2,
        },
      };
      const message = 'Items retrieved successfully';
      const statusCode = StatusCodes.OK;

      // Act
      const result = createResponse(mockRes as Response, body, message, statusCode);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        body,
        message,
      });
      expect(result).toBe(mockRes);
    });

    it('should handle empty array data', () => {
      // Arrange
      const body: any[] = [];
      const message = 'No items found';
      const statusCode = StatusCodes.OK;

      // Act
      const result = createResponse(mockRes as Response, body, message, statusCode);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: [],
        message: 'No items found',
      });
      expect(result).toBe(mockRes);
    });
  });
});
