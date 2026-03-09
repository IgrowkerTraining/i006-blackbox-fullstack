import { Response } from "express";
import { EventServices } from "../services/eventServices";
import { AuthRequest } from "../types/auth";

/**
 * @swagger
 * components:
 *   schemas:
 *     OperationalEvent:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         company_id:
 *           type: string
 *           format: uuid
 *         vehicle_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         driver_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         event_type:
 *           type: string
 *           enum: [UNKNOWN, ACCIDENT, MAINTENANCE, INSPECTION, OTHER]
 *         event_datetime:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *           enum: [UNKNOWN, GPS, ADDRESS]
 *           nullable: true
 *         context:
 *           type: string
 *           enum: [UNKNOWN, MANUAL, AUTOMATIC, SENSOR]
 *           nullable: true
 *         general_result:
 *           type: string
 *           enum: [WITH_OBS, WITHOUT_OBS]
 *           nullable: true
 *         e_signature:
 *           type: string
 *           nullable: true
 *         final_observations:
 *           type: string
 *           nullable: true
 *         is_confirmed:
 *           type: boolean
 *           nullable: true
 *         created_by_user_id:
 *           type: string
 *           format: uuid
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     InspectionDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         event_id:
 *           type: string
 *           format: uuid
 *         type_inspection:
 *           type: string
 *           enum: [ARRIVAL, DEPARTURE]
 *           nullable: true
 *         documentation_verified:
 *           type: boolean
 *           nullable: true
 *         vehicle_condition:
 *           type: string
 *           enum: [ACCEPTABLE, NOT_ACCEPTABLE]
 *           nullable: true
 *         lights_ok:
 *           type: boolean
 *           nullable: true
 *         tires_ok:
 *           type: boolean
 *           nullable: true
 *         brakes_ok:
 *           type: boolean
 *           nullable: true
 *         safety_elements_ok:
 *           type: boolean
 *           nullable: true
 */

/**
 * @swagger
 * /api/events/inspection:
 *   post:
 *     summary: Create a new inspection event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleId
 *               - driverId
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               driverId:
 *                 type: string
 *                 format: uuid
 *                 example: "660e8400-e29b-41d4-a716-446655440001"
 *               typeInspection:
 *                 type: string
 *                 enum: [ARRIVAL, DEPARTURE]
 *                 example: "DEPARTURE"
 *               documentationVerified:
 *                 type: boolean
 *                 example: true
 *               lightsOk:
 *                 type: boolean
 *                 example: true
 *               tiresOk:
 *                 type: boolean
 *                 example: true
 *               brakesOk:
 *                 type: boolean
 *                 example: true
 *               safetyElementsOk:
 *                 type: boolean
 *                 example: true
 *               eSignature:
 *                 type: string
 *                 example: "Mario Hernández"
 *               isConfirmed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Inspection created successfully
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
 *                   example: "Inspection created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OperationalEvent'
 *       400:
 *         description: Failed to create inspection
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Failed to create inspection
 */
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

/**
 * @swagger
 * /api/events/vehicle/{vehicleId}/history:
 *   get:
 *     summary: Get event history for a specific vehicle
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle event history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     vehicle:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         unit_number:
 *                           type: string
 *                         plate:
 *                           type: string
 *                     events:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/OperationalEvent'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Failed to fetch vehicle history
 */
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

/**
 * @swagger
 * /api/events/driver/{driverId}/history:
 *   get:
 *     summary: Get event history for a specific driver
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Driver event history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     driver:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         license_number:
 *                           type: string
 *                     events:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/OperationalEvent'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Failed to fetch driver history
 */
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

/**
 * @swagger
 * /api/events/vehicle/{vehicleId}/current-driver:
 *   get:
 *     summary: Get the current driver of a vehicle (based on last event)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Current driver information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentDriver:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         license_number:
 *                           type: string
 *                     lastEventDate:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                     message:
 *                       type: string
 *                       example: "No driver assigned to this vehicle"
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Failed to fetch current driver
 */
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
