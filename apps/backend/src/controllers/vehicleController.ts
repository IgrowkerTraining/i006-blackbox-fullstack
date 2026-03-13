import { Request, Response } from "express";
import { VehicleService } from "../services/vehicleServices";
import { AuthRequest } from "../types/auth";
import {
  CreateVehicleSchema,
  UpdateVehicleSchema,
} from "../validations/vehicleSchema";
import { ZodError } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         companyId:
 *           type: string
 *           format: uuid
 *         driverId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         unit_number:
 *           type: string
 *           nullable: true
 *           example: "TRUCK-042"
 *         plate:
 *           type: string
 *           nullable: true
 *           example: "TX-ABC-1234"
 *         is_active:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unit_number:
 *                 type: string
 *                 maxLength: 50
 *                 example: "TRUCK-042"
 *               plate:
 *                 type: string
 *                 maxLength: 20
 *                 pattern: "^[A-Z0-9-]+$"
 *                 example: "TX-ABC-1234"
 *               is_active:
 *                 type: boolean
 *                 default: true
 *               driverId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not authorized"
 *       500:
 *         description: Server error
 */
export const createVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    // Validación con Zod
    const validatedData = CreateVehicleSchema.parse(req.body);

    const vehicleData = { ...validatedData, companyId };
    const vehicle = await VehicleService.create(vehicleData);

    res.status(201).json({ success: true, data: vehicle });
  } catch (error: any) {
    // Manejo de errores de Zod
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    console.error(error);
    res.status(500).json({
      success: false,
      error: error?.message,
      code: error?.code,
    });
  }
};

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles for the authenticated company
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
export const getVehicles = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const vehicles = await VehicleService.getAll(companyId);
    res.json({ success: true, data: vehicles });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error?.message,
      code: error?.code,
    });
  }
};

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get a specific vehicle by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Vehicle not found"
 *       500:
 *         description: Server error
 */
export const getVehicleById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const vehicle = await VehicleService.getById(String(id), companyId);
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, error: "Vehicle not found" });
    }
    res.json({ success: true, data: vehicle });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error?.message,
      code: error?.code,
    });
  }
};

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update a vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unit_number:
 *                 type: string
 *                 maxLength: 50
 *                 example: "TRUCK-042-UPDATED"
 *               plate:
 *                 type: string
 *                 maxLength: 20
 *                 pattern: "^[A-Z0-9-]+$"
 *                 example: "TX-NEW-9999"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               driverId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */
export const updateVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    // Validación con Zod
    const validatedData = UpdateVehicleSchema.parse(req.body);

    const updated = await VehicleService.update(
      String(id),
      companyId,
      validatedData,
    );
    res.json({ success: true, data: updated });
  } catch (error: any) {
    // Manejo de errores de Zod
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Vehicle deleted"
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */
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
