import { Response } from "express";
import { DriverService } from "../services/driverServices";
import { AuthRequest } from "../types/auth";
import { UserRole } from "../../generated/prisma/enums";

// OBTENER TODOS LOS CONDUCTORES DE UNA COMPAÑIA
const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const drivers = await DriverService.getAll(companyId);
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllActive = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const drivers = await DriverService.getAllActive(companyId);
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// OBTENER UN CONDUCTOR
const getDriverById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const driver = await DriverService.getById(id as string, companyId);

    if (!driver) return res.status(404).json({ error: "Driver not found" });
    res.json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching driver" });
  }
};

// CREAR CONDUCTOR
const createDriver = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    const userRole = req.user?.role;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    if (userRole !== UserRole.ADMIN)
      return res.status(403).json({ error: "Only Admins can create drivers" });

    // Validación básica de campos
    const { name, license_number } = req.body;
    if (!name || !license_number) {
      return res
        .status(400)
        .json({ message: "Name and License Number are required" });
    }

    const newDriver = await DriverService.create(
      {
        name,
        license_number,
      },
      companyId,
    );

    res.status(201).json(newDriver);
  } catch (error: any) {
    if (error.message === "LICENSE_EXISTS") {
      return res.status(409).json({
        message:
          "A driver with this license number already exists in your company.",
      });
    }

    if (error.message === "DRIVER_INACTIVE") {
      return res.status(409).json({
        message:
          "This driver exists but is inactive. Please reactivate them instead of creating a new one.",
      });
    }
    console.error(error);
    res.status(500).json({ error: "Error creating driver" });
  }
};

// ACTUALIZAR CONDUCTOR
const updateDriver = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;

    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const dataToUpdate = req.body; // Debería ser validado con Zod idealmente

    const updatedDriver = await DriverService.update(
      id as string,
      dataToUpdate,
      companyId,
    );

    res.status(200).json(updatedDriver);
  } catch (error: any) {
    if (error.message === "LICENSE_EXISTS") {
      return res
        .status(409)
        .json({ message: "License number already in use by another driver." });
    }
    console.error(error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(500).json({ error: "Error updating driver" });
  }
};

// ELIMINAR CONDUCTOR (SOFT DELETE)
const deleteDriver = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    const currentUserRole = req.user?.role;

    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    // Solo ADMIN puede "borrar" conductores
    if (currentUserRole !== UserRole.ADMIN) {
      return res.status(403).json({ error: "Only Admins can delete drivers" });
    }

    await DriverService.remove(id as string, companyId);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(500).json({ error: "Error deleting driver" });
  }
};

export const DriverController = {
  getAll,
  getAllActive,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};
