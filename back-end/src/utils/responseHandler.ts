import { Response } from "express";

import { StatusCodes } from "@enums";
import { baseResponse } from "@responses";

export const createResponseBody = <T>(
  body: T | null,
  message: string
): baseResponse<T> => {
  return {
    body,
    message,
  };
};

export const createResponse = <T>(
  res: Response,
  body: T | null,
  message: string,
  statusCode: StatusCodes | number | string
): Response => {
  const normalizeStatusCode = (code: unknown): number => {
    if (typeof code === "number" && Number.isInteger(code)) {
      return code >= 100 && code <= 599 ? code : StatusCodes.INTERNAL_SERVER_ERROR;
    }
    if (typeof code === "string") {
      const parsed = Number(code);
      if (Number.isInteger(parsed)) {
        return parsed >= 100 && parsed <= 599 ? parsed : StatusCodes.INTERNAL_SERVER_ERROR;
      }
    }
    return StatusCodes.INTERNAL_SERVER_ERROR;
  };

  const safeStatus = normalizeStatusCode(statusCode);
  return res.status(safeStatus).json(createResponseBody(body, message));
};
