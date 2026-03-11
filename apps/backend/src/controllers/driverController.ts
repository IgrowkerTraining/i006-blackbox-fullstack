import { Response } from "express";
import { DriverService } from "../services/driverServices";
import { AuthRequest } from "../types/auth";
import { UserRole } from "../../generated/prisma/enums";

/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         companyId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: "Mario Hernández"
 *         license_number:
 *           type: string
 *           example: "TX-DL-001234"
 *         is_active:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/drivers:
 *   get:
 *     summary: Get all drivers for the authenticated company
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Driver'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /api/drivers/active:
 *   get:
 *     summary: Get only active drivers for the authenticated company
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Driver'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /api/drivers/{id}:
 *   get:
 *     summary: Get a specific driver by ID
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Driver details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Error fetching driver
 */
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

/**
 * @swagger
 * /api/drivers:
 *   post:
 *     summary: Create a new driver (Admin only)
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - license_number
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mario Hernández"
 *               license_number:
 *                 type: string
 *                 example: "TX-DL-001234"
 *     responses:
 *       201:
 *         description: Driver created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       400:
 *         description: Name and License Number are required
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Only Admins can create drivers
 *       409:
 *         description: License number already exists or driver is inactive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "A driver with this license number already exists in your company."
 *       500:
 *         description: Error creating driver
 */
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

/**
 * @swagger
 * /api/drivers/{id}:
 *   put:
 *     summary: Update a driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Driver ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mario Hernández"
 *               license_number:
 *                 type: string
 *                 example: "TX-DL-001234"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Driver updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Driver not found
 *       409:
 *         description: License number already in use by another driver
 *       500:
 *         description: Error updating driver
 */
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

/**
 * @swagger
 * /api/drivers/{id}:
 *   delete:
 *     summary: Delete a driver (soft delete - Admin only)
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Driver ID
 *     responses:
 *       204:
 *         description: Driver deleted successfully (no content)
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Only Admins can delete drivers
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Error deleting driver
 */
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
