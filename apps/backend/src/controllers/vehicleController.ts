import { Request, Response } from "express";
import { VehicleService } from "../services/vehicleServices";


export const createVehicle = async (req: Request, res: Response) => {
  try {
    const companyId = req.body.companyId;
    const vehicle = await VehicleService.create(req.body);
    res.status(201).json({ success: true, data: vehicle });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.query; // Temporal: obtener de query o body
    if (!companyId) {
      // Idealmente del usuario autenticado. usando un fallback o error.
      // Por ahora, asumamos que se pasa en la query para pruebas.
      return res.status(400).json({ success: false, message: "companyId is required" });
    }

    const vehicles = await VehicleService.getAll(String(companyId));
    res.json({ success: true, data: vehicles });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { companyId } = req.query; // Temporal

    if (!companyId) {
      return res.status(400).json({ success: false, message: "companyId is required" });
    }

    const vehicle = await VehicleService.getById(String(id), String(companyId));
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }
    res.json({ success: true, data: vehicle });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { companyId, ...updateData } = req.body; // Extraer companyId si está en el cuerpo

    const updated = await VehicleService.update(String(id), String(companyId), updateData);
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { companyId } = req.query; // Temporal

    if (!companyId) {
      return res.status(400).json({ success: false, message: "companyId is required" });
    }

    await VehicleService.delete(String(id), String(companyId));
    res.json({ success: true, message: "Vehicle deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
