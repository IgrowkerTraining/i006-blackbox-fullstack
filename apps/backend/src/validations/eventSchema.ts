import { z } from "zod";
import {
  TypeInspection,
  InspectionStatus,
  LocationType,
  EventSeverity,
  EventType,
} from "../../generated/prisma/enums";

export const CreateInspectionSchema = z.object({
  vehicleId: z.uuid("Invalid vehicle ID format"),
  driverId: z.uuid("Invalid driver ID format"),
  typeInspection: z
    .enum(TypeInspection, {
      message: "Invalid inspection type. Must be ARRIVAL or DEPARTURE",
    })
    .optional(),
  documentationVerified: z.boolean().optional(),
  vehicleCondition: z.enum(InspectionStatus).optional(),
  lightsOk: z.boolean().optional(),
  tiresOk: z.boolean().optional(),
  brakesOk: z.boolean().optional(),
  safetyElementsOk: z.boolean().optional(),
  eSignature: z.string().optional(),
  isConfirmed: z.boolean().optional(),
  // Campos extra opcionales
  location: z.enum(LocationType).optional(),
  mileage: z.number().int().positive().optional(),
});

export const CreateAccidentSchema = z.object({
  vehicleId: z.uuid("Invalid vehicle ID format"),
  driverId: z.uuid("Invalid driver ID format"),
  // Mantener como Date - el servicio lo convierte
  eventDatetime: z.coerce.date({
    message: "Invalid datetime format",
  }),
  location: z.enum(LocationType).optional(),
  severity: z.enum(EventSeverity).optional(),
  injuriesReported: z.boolean().optional(),
  cost: z.number().positive("Cost must be positive").optional(),
  mileage: z.number().int().positive("Mileage must be positive").optional(),
  // Campos que van en final_observations JSON
  locationDetails: z.string().optional(),
  description: z.string().optional(),
  finalObservations: z.string().optional(),
  eSignature: z.string().optional(),
});

export const CreateMaintenanceSchema = z.object({
  vehicleId: z.uuid("Invalid vehicle ID format"),
  driverId: z.uuid("Invalid driver ID format").optional(),
  eventDatetime: z.coerce.date({
    message: "Invalid datetime format",
  }),
  severity: z.enum(EventSeverity).optional(),
  cost: z.number().positive("Cost must be positive").optional(),
  mileage: z.number().int().positive("Mileage must be positive").optional(),
  nextServiceDate: z.coerce.date().optional(),
  // Campos que van en final_observations JSON
  maintenanceType: z.enum(["PREVENTIVE", "CORRECTIVE", "EMERGENCY"]).optional(),
  serviceType: z.string().optional(),
  serviceProvider: z.string().optional(),
  finalObservations: z.string().optional(),
  eSignature: z.string().optional(),
});

export const CreateOtherEventSchema = z.object({
  vehicleId: z.uuid().optional(),
  driverId: z.uuid().optional(),
  eventDatetime: z.coerce.date({
    message: "Invalid datetime format",
  }),
  location: z.enum(LocationType).optional(),
  // Campos que van en final_observations JSON
  eventTitle: z.string().min(1, "Event title is required"),
  eventDescription: z.string().optional(),
  finalObservations: z.string().optional(),
  eSignature: z.string().optional(),
});

export const GetEventsFilterSchema = z.object({
  eventType: z.enum(EventType).optional(),
  severity: z.enum(EventSeverity).optional(),
  vehicleId: z.uuid().optional(),
  driverId: z.uuid().optional(),
  startDate: z.string().optional(), // Mantener como string - el servicio lo convierte
  endDate: z.string().optional(), // Mantener como string - el servicio lo convierte
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

// Exportar los tipos inferidos (estos reemplazan las interfaces manuales)
export type CreateInspectionDTO = z.infer<typeof CreateInspectionSchema>;
export type CreateAccidentDTO = z.infer<typeof CreateAccidentSchema>;
export type CreateMaintenanceDTO = z.infer<typeof CreateMaintenanceSchema>;
export type CreateOtherEventDTO = z.infer<typeof CreateOtherEventSchema>;
export type GetEventsFilterDTO = z.infer<typeof GetEventsFilterSchema>;
