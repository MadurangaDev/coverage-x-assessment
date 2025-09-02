import { Request, Response, NextFunction } from 'express';
import { ZodSchema, z } from 'zod';
import { StatusCodes } from '@enums';
import {
  validateRequestSyntax,
  validateRequestBody,
  validateRequestQuery,
  validateRequestParams,
  validateRequestHeaders,
} from '@middlewares';
import {
  createMockRequest,
  createMockResponse,
} from '../utils/testHelpers';

// Mock the response utility
jest.mock('@utils', () => ({
  createResponse: jest.fn((res, body, message, statusCode) => {
    res.status(statusCode).json({ body, message });
    return res;
  }),
}));

describe('Validate Request Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = createMockRequest();
    mockRes = createMockResponse();
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('validateRequestSyntax', () => {
    it('should call next() when no syntax error', () => {
      // Arrange
      const error = null;

      // Act
      validateRequestSyntax(error, mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should handle JSON syntax error', () => {
      // Arrange
      const syntaxError = new SyntaxError('Unexpected token } in JSON at position 1');
      (syntaxError as any).body = 'invalid json';

      // Act
      validateRequestSyntax(syntaxError, mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Invalid request format',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next() for non-syntax errors', () => {
      // Arrange
      const otherError = new Error('Some other error');

      // Act
      validateRequestSyntax(otherError, mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });

  describe('validateRequestBody', () => {
    it('should call next() when validation passes', () => {
      // Arrange
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });
      mockReq.body = { name: 'John', age: 25 };

      // Act
      const middleware = validateRequestBody(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return error when validation fails', () => {
      // Arrange
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });
      mockReq.body = { name: 'John', age: 'invalid' };

      // Act
      const middleware = validateRequestBody(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Expected number, received string',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return error for missing required fields', () => {
      // Arrange
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });
      mockReq.body = { name: 'John' };

      // Act
      const middleware = validateRequestBody(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Required',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('validateRequestQuery', () => {
    it('should call next() when validation passes', () => {
      // Arrange
      const schema = z.object({
        page: z.string().optional(),
        limit: z.string().optional(),
      });
      mockReq.query = { page: '1', limit: '10' };

      // Act
      const middleware = validateRequestQuery(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return error when validation fails', () => {
      // Arrange
      const schema = z.object({
        page: z.string().regex(/^\d+$/),
        limit: z.string().regex(/^\d+$/),
      });
      mockReq.query = { page: 'invalid', limit: '10' };

      // Act
      const middleware = validateRequestQuery(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Invalid',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle empty query parameters', () => {
      // Arrange
      const schema = z.object({
        page: z.string().optional(),
        limit: z.string().optional(),
      });
      mockReq.query = {};

      // Act
      const middleware = validateRequestQuery(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });

  describe('validateRequestParams', () => {
    it('should call next() when validation passes', () => {
      // Arrange
      const schema = z.object({
        id: z.string().regex(/^\d+$/),
      });
      mockReq.params = { id: '123' };

      // Act
      const middleware = validateRequestParams(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return error when validation fails', () => {
      // Arrange
      const schema = z.object({
        id: z.string().regex(/^\d+$/),
      });
      mockReq.params = { id: 'invalid' };

      // Act
      const middleware = validateRequestParams(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Invalid',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return error for missing required params', () => {
      // Arrange
      const schema = z.object({
        id: z.string(),
      });
      mockReq.params = {};

      // Act
      const middleware = validateRequestParams(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Required',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('validateRequestHeaders', () => {
    it('should call next() when validation passes', () => {
      // Arrange
      const schema = z.object({
        'content-type': z.string().optional(),
        'authorization': z.string().optional(),
      });
      mockReq.headers = { 
        'content-type': 'application/json',
        'authorization': 'Bearer token123'
      };

      // Act
      const middleware = validateRequestHeaders(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return error when validation fails', () => {
      // Arrange
      const schema = z.object({
        'authorization': z.string().regex(/^Bearer\s+/),
      });
      mockReq.headers = { 
        'authorization': 'Invalid token'
      };

      // Act
      const middleware = validateRequestHeaders(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Invalid',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle missing headers', () => {
      // Arrange
      const schema = z.object({
        'authorization': z.string(),
      });
      mockReq.headers = {};

      // Act
      const middleware = validateRequestHeaders(schema);
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        body: null,
        message: 'Required',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
