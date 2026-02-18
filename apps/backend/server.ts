import express from "express";
import { setupMiddleware } from "./src/middleware/index";
import apiRoutes from "./src/routes/index";
import config from "./src/config";
import userRoutes from "./src/routes/user.routes";

const app = express();

setupMiddleware(app);

app.use("/api", apiRoutes);
app.use("/api/users", userRoutes);

app.listen(config.port, () => {
  console.log(`Example Auth Backend running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
