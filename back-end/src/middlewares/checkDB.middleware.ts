import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { StatusCodes } from "@enums";
import { createResponse } from "@utils";

const prisma = new PrismaClient();

export const checkDBConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    next();
  } catch (err) {
    return createResponse(
      res,
      null,
      "Database Connection Failed",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
