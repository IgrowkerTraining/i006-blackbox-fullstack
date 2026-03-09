import express from "express";
import { setupMiddleware } from "./src/middleware/index";
import apiRoutes from "./src/routes/index";
import config from "./src/config";
import { setupSwagger } from "./src/config/swagger";

const app = express();

setupMiddleware(app);
setupSwagger(app);

app.use("/api", apiRoutes);

app.listen(config.port, () => {
  console.log(`Example Auth Backend running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
