import express from "express";
import authRoutes from "./auth";
import companyRoutes from "./company";
import userRoutes from "./user.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/companies", companyRoutes);
router.use("/users", userRoutes);

router.get("/", (_req, res) => {
  res.status(200).json({ status: "Api is working" });
});

export default router;
