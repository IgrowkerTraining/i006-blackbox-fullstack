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

/**
 * @swagger
 * /api/events/accident:
 *   post:
 *     summary: Create a new accident event
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
 *               - eventDatetime
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 format: uuid
 *               driverId:
 *                 type: string
 *                 format: uuid
 *               eventDatetime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-06T14:30:00Z"
 *               location:
 *                 type: string
 *                 enum: [GPS, ADDRESS]
 *                 example: "ADDRESS"
 *               locationDetails:
 *                 type: string
 *                 example: "I-35 Exit 245, Dallas, TX"
 *               severity:
 *                 type: string
 *                 enum: [MINOR, MODERATE, SEVERE]
 *                 example: "MODERATE"
 *               description:
 *                 type: string
 *                 example: "Rear-end collision at traffic light"
 *               injuriesReported:
 *                 type: boolean
 *                 example: false
 *               policeReportNumber:
 *                 type: string
 *                 example: "DPD-2025-001234"
 *               finalObservations:
 *                 type: string
 *               eSignature:
 *                 type: string
 *     responses:
 *       201:
 *         description: Accident event created successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Failed to create accident event
 */
const createAccident = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    const userId = req.user?.id;

    if (!companyId || !userId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const accident = await EventServices.createAccident(
      req.body,
      companyId,
      userId,
    );

    if (!accident) {
      return res.status(400).json({ error: "Failed to create accident event" });
    }

    return res.status(201).json({
      success: true,
      message: "Accident event created successfully",
      data: accident,
    });
  } catch (error) {
    console.error("Create accident error:", error);
    return res.status(500).json({ error: "Failed to create accident event" });
  }
};

/**
 * @swagger
 * /api/events/maintenance:
 *   post:
 *     summary: Create a new maintenance event
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
 *               - eventDatetime
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 format: uuid
 *               driverId:
 *                 type: string
 *                 format: uuid
 *                 description: Optional - driver who reported the issue
 *               eventDatetime:
 *                 type: string
 *                 format: date-time
 *               maintenanceType:
 *                 type: string
 *                 enum: [PREVENTIVE, CORRECTIVE, EMERGENCY]
 *                 example: "PREVENTIVE"
 *               serviceType:
 *                 type: string
 *                 example: "Oil change and brake inspection"
 *               mileage:
 *                 type: number
 *                 example: 45000
 *               cost:
 *                 type: number
 *                 example: 350.50
 *               serviceProvider:
 *                 type: string
 *                 example: "Dallas Auto Service Center"
 *               nextServiceDue:
 *                 type: string
 *                 format: date-time
 *               finalObservations:
 *                 type: string
 *               eSignature:
 *                 type: string
 *     responses:
 *       201:
 *         description: Maintenance event created successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Failed to create maintenance event
 */
const createMaintenance = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    const userId = req.user?.id;

    if (!companyId || !userId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const maintenance = await EventServices.createMaintenance(
      req.body,
      companyId,
      userId,
    );

    if (!maintenance) {
      return res
        .status(400)
        .json({ error: "Failed to create maintenance event" });
    }

    return res.status(201).json({
      success: true,
      message: "Maintenance event created successfully",
      data: maintenance,
    });
  } catch (error) {
    console.error("Create maintenance error:", error);
    return res
      .status(500)
      .json({ error: "Failed to create maintenance event" });
  }
};

/**
 * @swagger
 * /api/events/other:
 *   post:
 *     summary: Create a generic operational event
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
 *               - eventDatetime
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 format: uuid
 *               driverId:
 *                 type: string
 *                 format: uuid
 *               eventDatetime:
 *                 type: string
 *                 format: date-time
 *               eventTitle:
 *                 type: string
 *                 example: "Fuel purchase"
 *               eventDescription:
 *                 type: string
 *                 example: "Refueled at Love's Travel Stop"
 *               location:
 *                 type: string
 *                 enum: [GPS, ADDRESS]
 *               finalObservations:
 *                 type: string
 *               eSignature:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Failed to create event
 */
const createOtherEvent = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    const userId = req.user?.id;

    if (!companyId || !userId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const event = await EventServices.createOtherEvent(
      req.body,
      companyId,
      userId,
    );

    if (!event) {
      return res.status(400).json({ error: "Failed to create event" });
    }

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("Create other event error:", error);
    return res.status(500).json({ error: "Failed to create event" });
  }
};

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events with optional filters
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: eventType
 *         schema:
 *           type: string
 *           enum: [INSPECTION, ACCIDENT, MAINTENANCE, OTHER]
 *         description: Filter by event type
 *       - in: query
 *         name: vehicleId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by vehicle
 *       - in: query
 *         name: driverId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by driver
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of results per page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Offset for pagination
 *     responses:
 *       200:
 *         description: List of events
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Failed to fetch events
 */
const getAllEvents = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const filters = {
      eventType: req.query.eventType as string,
      vehicleId: req.query.vehicleId as string,
      driverId: req.query.driverId as string,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      limit: parseInt(req.query.limit as string) || 50,
      offset: parseInt(req.query.offset as string) || 0,
    };

    const events = await EventServices.getAllEvents(companyId, filters);

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get all events error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get a specific event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Event details
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to fetch event
 */
const getEventById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;

    if (!companyId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const event = await EventServices.getEventById(id as string, companyId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Get event error:", error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

export const EventController = {
  createInspection,
  getCurrentDriver,
  getDriverHistory,
  getVehicleHistory,
  getEventById,
  getAllEvents,
  createOtherEvent,
  createMaintenance,
  createAccident,
};
