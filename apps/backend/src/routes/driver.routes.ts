import express from "express";
import { DriverController } from "../controllers/driverController.js"; // Añadí .js por tu migración a ESM
import { authMiddleware } from "../middleware/auth.js"; // Añadí .js por tu migración a ESM
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
