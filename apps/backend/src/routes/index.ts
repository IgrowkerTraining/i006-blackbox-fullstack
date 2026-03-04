import express from "express";
import authRoutes from "./auth";
import companyRoutes from "./company";
import vehicleRoutes from "./vehicle";
import userRoutes from "./user.routes";
import eventRoutes from "./events";
import driverRoutes from "./driver.routes";

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
