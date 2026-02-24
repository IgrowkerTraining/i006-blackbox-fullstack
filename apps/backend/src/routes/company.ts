import express from "express";
import { getAll, getVehiclesById } from "../controllers/companyController";

const router = express.Router();

router.get("/", getAll);
router.get("/:id/vehicles", getVehiclesById);

export default router;
