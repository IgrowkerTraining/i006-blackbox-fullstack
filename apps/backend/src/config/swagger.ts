import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BlackBox API",
      version: "1.0.0",
      description: "Compliance & Operations SaaS B2B - Fleet Management API",
      contact: {
        name: "BlackBox Team",
        email: "support@blackbox.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://api.blackbox.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Rutas donde buscar comentarios con anotaciones de Swagger
  // Usamos rutas relativas que funcionen tanto en src (dev) como cuando src se copia a la raiz (prod Docker)
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./src/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // Swagger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs en JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log("Swagger docs available at http://localhost:3000/api-docs");
};
