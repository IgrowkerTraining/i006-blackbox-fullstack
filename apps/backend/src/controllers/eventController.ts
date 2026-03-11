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
 *         severity:
 *           type: string
 *           enum: [MINOR, MODERATE, SEVERE, CRITICAL]
 *           nullable: true
 *         cost:
 *           type: number
 *           nullable: true
 *         mileage:
 *           type: integer
 *           nullable: true
 *         next_service_date:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         injuries_reported:
 *           type: boolean
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
 *               driverId:
 *                 type: string
 *                 format: uuid
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
    const newInspection = await EventServices.createInspection(
      req.body,
      companyId,
      userId,
    );
    if (!newInspection) {
      return res.status(400).json({ error: "Failed to create inspection" });
    }
    return res.status(201).json({
      success: true,
      message: "Inspection created successfully",
      data: newInspection,
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
 *                 enum: [UNKNOWN, GPS, ADDRESS]
 *                 example: "ADDRESS"
 *               severity:
 *                 type: string
 *                 enum: [MINOR, MODERATE, SEVERE, CRITICAL]
 *                 example: "MODERATE"
 *               injuriesReported:
 *                 type: boolean
 *                 example: false
 *               cost:
 *                 type: number
 *                 example: 2500.00
 *               mileage:
 *                 type: integer
 *                 example: 45000
 *               locationDetails:
 *                 type: string
 *                 description: Stored in final_observations JSON
 *                 example: "I-35 Exit 245, Dallas, TX"
 *               description:
 *                 type: string
 *                 description: Stored in final_observations JSON
 *                 example: "Rear-end collision at traffic light"
 *               policeReportNumber:
 *                 type: string
 *                 description: Stored in final_observations JSON
 *                 example: "DPD-2025-001234"
 *               finalObservations:
 *                 type: string
 *                 description: Additional notes
 *               eSignature:
 *                 type: string
 *                 example: "Mario Hernández"
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
 *                 example: "2025-03-06T10:00:00Z"
 *               severity:
 *                 type: string
 *                 enum: [MINOR, MODERATE, SEVERE, CRITICAL]
 *                 example: "MINOR"
 *               cost:
 *                 type: number
 *                 example: 350.50
 *               mileage:
 *                 type: integer
 *                 example: 45000
 *               nextServiceDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-06T10:00:00Z"
 *               maintenanceType:
 *                 type: string
 *                 description: Stored in final_observations JSON
 *                 enum: [PREVENTIVE, CORRECTIVE, EMERGENCY]
 *                 example: "PREVENTIVE"
 *               serviceType:
 *                 type: string
 *                 description: Stored in final_observations JSON
 *                 example: "Oil change and brake inspection"
 *               serviceProvider:
 *                 type: string
 *                 description: Stored in final_observations JSON
 *                 example: "Dallas Auto Service Center"
 *               finalObservations:
 *                 type: string
 *               eSignature:
 *                 type: string
 *                 example: "Rick Ramirez"
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
 *                 description: Optional
 *               driverId:
 *                 type: string
 *                 format: uuid
 *                 description: Optional
 *               eventDatetime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-06T16:00:00Z"
 *               location:
 *                 type: string
 *                 enum: [UNKNOWN, GPS, ADDRESS]
 *                 example: "GPS"
 *               eventTitle:
 *                 type: string
 *                 description: Stored in final_observations JSON
 *                 example: "Fuel purchase"
 *               eventDescription:
 *                 type: string
 *                 description: Stored in final_observations JSON
 *                 example: "Refueled at Love's Travel Stop"
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
 *           enum: [UNKNOWN, INSPECTION, ACCIDENT, MAINTENANCE, OTHER]
 *         description: Filter by event type
 *       - in: query
 *         name: severity
 *         schema:
 *           type: string
 *           enum: [MINOR, MODERATE, SEVERE, CRITICAL]
 *         description: Filter by severity
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
 *         description: List of events with pagination info
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
      severity: req.query.severity as string,
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
  createAccident,
  createMaintenance,
  createOtherEvent,
  getAllEvents,
  getEventById,
  getVehicleHistory,
  getDriverHistory,
  getCurrentDriver,
};
