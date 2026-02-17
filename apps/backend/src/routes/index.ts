import express from "express";
import authRoutes from "./auth";

const router = express.Router();

router.use("/auth", authRoutes);

router.get("/", (_req, res) => {
  res.status(200).json({ status: "Api is working" });
});

export default router;
