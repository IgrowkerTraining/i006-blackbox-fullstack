import express from "express";
import authRoutes from "./auth.js";
import companyRoutes from "./company.js";
import vehicleRoutes from "./vehicle.js";
import userRoutes from "./user.routes.js";
import eventRoutes from "./events.js";
import driverRoutes from "./driver.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/companies", companyRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/users", userRoutes);
router.use("/drivers", driverRoutes);
router.use("/events", eventRoutes);

router.get("/", (_req, res) => {
  res.status(200).json({ status: "Api is working" });
});

export default router;
