import { Router } from "express";
import { DriverController } from "../controllers/driverController";
import { authMiddleware } from "../middleware/auth";
const router = Router();

router.use(authMiddleware);

router.get("/", DriverController.getAll);
router.get("/active", DriverController.getAllActive); // solo conductores activos
router.get("/:id", DriverController.getDriverById);
router.post("/", DriverController.createDriver);
router.put("/:id", DriverController.updateDriver);
router.delete("/:id", DriverController.deleteDriver); // soft delete, solo marca inactivo

export default router;
