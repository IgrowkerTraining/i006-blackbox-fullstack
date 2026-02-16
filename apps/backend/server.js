import express from "express";
import { setupMiddleware } from "./src/middleware/index.js";
import apiRoutes from "./src/routes/index.js";
import config from "./src/config/index.js";

const app = express();

setupMiddleware(app);

app.use("/api", apiRoutes);

app.listen(config.port, () => {
  console.log(`Example Auth Backend running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
