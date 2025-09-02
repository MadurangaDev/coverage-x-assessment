import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from '@enums';
import { checkDBConnection } from '@middlewares';
import {
  createMockRequest,
  createMockResponse,
} from '../utils/testHelpers';

// Mock Prisma Client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $queryRaw: jest.fn(),
    $disconnect: jest.fn(),
  })),
}));

// Mock the response utility
jest.mock('@utils', () => ({
  createResponse: jest.fn((res, body, message, statusCode) => {
    res.status(statusCode).json({ body, message });
    return res;
  }),
}));

describe('Check DB Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;
  let mockPrisma: any;

  beforeEach(() => {
    mockReq = createMockRequest();
    mockRes = createMockResponse();
    mockNext = jest.fn();
    mockPrisma = new (require('@prisma/client').PrismaClient)();
    jest.clearAllMocks();
  });

  describe('checkDBConnection', () => {
    it('should be a function', () => {
      expect(typeof checkDBConnection).toBe('function');
    });

    it('should accept three parameters', () => {
      expect(checkDBConnection.length).toBe(3);
    });
  });
});
