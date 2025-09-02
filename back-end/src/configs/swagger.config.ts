import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To-Do App API",
      version: "1.0.0",
      description: "API documentation for Task management App",
    },
  },
  apis: ["./src/docs/*.docs.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
