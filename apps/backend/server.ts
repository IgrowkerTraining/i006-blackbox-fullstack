import "./src/config/instrument";
import * as Sentry from "@sentry/node";
import express from "express";
import { setupMiddleware } from "./src/middleware/index";
import apiRoutes from "./src/routes/index";
import config from "./src/config";
import { setupSwagger } from "./src/config/swagger";

const app = express();

setupMiddleware(app);
setupSwagger(app);

app.use("/api", apiRoutes);

// El manejador de errores de Sentry debe registrarse después de todos los controladores
// pero antes de cualquier otro middleware de error personalizado.
Sentry.setupExpressErrorHandler(app);

app.listen(config.port, () => {
  console.log(`Example Auth Backend running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
