import { Request, Response } from "express";
import { VehicleService } from "../services/vehicleServices";
import { AuthRequest } from "../types/auth";

export const createVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const vehicleData = { ...req.body, companyId };
    const vehicle = await VehicleService.create(vehicleData);

    res.status(201).json({ success: true, data: vehicle });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getVehicles = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const vehicles = await VehicleService.getAll(companyId);
    res.json({ success: true, data: vehicles });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getVehicleById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const vehicle = await VehicleService.getById(String(id), companyId);
    if (!vehicle) {
      return res.status(404).json({ success: false, error: "Vehicle not found" });
    }
    res.json({ success: true, data: vehicle });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const updated = await VehicleService.update(String(id), companyId, req.body);
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    await VehicleService.delete(String(id), companyId);
    res.json({ success: true, message: "Vehicle deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
