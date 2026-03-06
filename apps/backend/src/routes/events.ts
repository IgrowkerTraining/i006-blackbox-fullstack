import express from "express";
import { EventController } from "../controllers/eventController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.use(authMiddleware);

router.post("/inspection", authMiddleware, EventController.createInspection);
router.get("/vehicle/:vehicleId/history", EventController.getVehicleHistory);
router.get("/driver/:driverId/history", EventController.getDriverHistory);
router.get(
  "/vehicle/:vehicleId/current-driver",
  EventController.getCurrentDriver,
);

export default router;
