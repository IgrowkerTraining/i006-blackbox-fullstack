import { Response } from "express";
import { EventServices } from "../services/eventServices";
import { AuthRequest } from "../types/auth";

export const createInspection = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    const userId = req.user?.id;

    if (!companyId || !userId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const newInpsection = await EventServices.createInspection(
      req.body,
      companyId,
      userId,
    );

    if (!newInpsection) {
      return res.status(400).json({ error: "Failed to create inspection" });
    }

    return res.status(201).json({
      success: true,
      message: "Inspection created successfully",
      data: newInpsection,
    });
  } catch (error) {
    console.error("Create inspection error:", error);
    return res.status(500).json({ error: "Failed to create inspection" });
  }
};

// Obtener historial de un vehículo
const getVehicleHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const companyId = req.user?.companyId;

    if (!companyId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const history = await EventServices.getVehicleHistory(
      vehicleId as string,
      companyId,
    );

    if (!history) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error("Get vehicle history error:", error);
    res.status(500).json({ error: "Failed to fetch vehicle history" });
  }
};

// Obtener historial de un conductor
const getDriverHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { driverId } = req.params;
    const companyId = req.user?.companyId;

    if (!companyId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const history = await EventServices.getDriverHistory(
      driverId as string,
      companyId,
    );

    if (!history) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error("Get driver history error:", error);
    res.status(500).json({ error: "Failed to fetch driver history" });
  }
};

// Obtener quién maneja actualmente un vehículo
const getCurrentDriver = async (req: AuthRequest, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const companyId = req.user?.companyId;

    if (!companyId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const currentDriver = await EventServices.getCurrentDriver(
      vehicleId as string,
      companyId,
    );

    res.json({
      success: true,
      data: currentDriver,
    });
  } catch (error) {
    console.error("Get current driver error:", error);
    res.status(500).json({ error: "Failed to fetch current driver" });
  }
};

export const EventController = {
  createInspection,
  getCurrentDriver,
  getDriverHistory,
  getVehicleHistory,
};
