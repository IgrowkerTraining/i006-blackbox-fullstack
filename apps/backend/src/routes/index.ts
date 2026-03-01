import express from "express";
import authRoutes from "./auth";
import companyRoutes from "./company";
import vehicleRoutes from "./vehicle";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/companies", companyRoutes);
router.use("/vehicles", vehicleRoutes);

router.get("/", (_req, res) => {
  res.status(200).json({ status: "Api is working" });
});

export default router;
