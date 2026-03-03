import express from "express";
import { EventController } from "../controllers/eventController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/inspection", authMiddleware, EventController.createInspection);

export default router;
