require("module-alias/register");

import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { StatusCodes } from "@enums";
import { createResponse } from "@utils";
import { taskRoutes } from "@routes";
import { swaggerSpec } from "@configs";
import { checkDBConnection, validateRequestSyntax } from "@middlewares";

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(validateRequestSyntax);
app.use(checkDBConnection);

// Controllers
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/tasks", taskRoutes);

// Default Routes
app.all("/", (req: Request, res: Response): Response => {
  return createResponse(
    res,
    "welcome to API",
    "API is running",
    StatusCodes.OK
  );
});
app.all("*", (req: Request, res: Response) => {
  return createResponse(res, null, "Route not found", StatusCodes.NOT_FOUND);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
