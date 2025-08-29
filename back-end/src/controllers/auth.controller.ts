import { Request, Response } from "express";
import { config } from "dotenv";
import { StatusCodes } from "@enums";
import { createResponse } from "@utils";

config();

export const handleLogin = async (req: Request, res: Response) => {
  return createResponse(res, null, "Login Successful", StatusCodes.OK);
};
