import express from "express";
import { DriverController } from "../controllers/driverController";
import { authMiddleware } from "../middleware/auth";
const router = express.Router();

// Todas las rutas de conductores requieren estar autenticado
router.use(authMiddleware);

router.get("/", DriverController.getAll);
router.get("/active", DriverController.getAllActive); // solo conductores activos
router.get("/:id", DriverController.getDriverById);
router.post("/", DriverController.createDriver);
router.put("/:id", DriverController.updateDriver);
router.delete("/:id", DriverController.deleteDriver); // soft delete

export default router;
