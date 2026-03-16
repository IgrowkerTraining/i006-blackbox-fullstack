import {
  TypeInspection,
  InspectionStatus,
  EventSeverity,
  LocationType,
} from "../../generated/prisma/client";

export interface CreateInspectionDto {
  vehicleId: string;
  driverId: string;
  typeInspection?: TypeInspection;
  documentationVerified?: boolean;
  lightsOk?: boolean;
  tiresOk?: boolean;
  brakesOk?: boolean;
  vehicleCondition?: InspectionStatus;
  safetyElementsOk?: boolean;
  eSignature?: string;
  isConfirmed?: boolean;
}

export interface CreateAccidentDto {
  vehicleId: string;
  driverId: string;
  eventDatetime: Date;
  location?: LocationType;
  severity?: EventSeverity;
  injuriesReported?: boolean;
  cost?: number;
  mileage?: number;
  locationDetails?: string;
  description?: string;
  policeReportNumber?: string;
  finalObservations?: string;
  eSignature?: string;
}

export interface CreateMaintenanceDto {
  vehicleId: string;
  driverId?: string;
  eventDatetime: Date;
  severity?: EventSeverity;
  cost?: number;
  mileage?: number;
  nextServiceDate?: Date;
  maintenanceType?: TypeInspection;
  serviceType?: string;
  serviceProvider?: string;
  finalObservations?: string;
  eSignature?: string;
}

export interface CreateOtherEventDto {
  vehicleId?: string;
  driverId?: string;
  eventDatetime: Date;
  location?: LocationType;
  eventTitle?: string;
  eventDescription?: string;
  finalObservations?: string;
  eSignature?: string;
}

export interface EventFilters {
  eventType?: string;
  severity?: EventSeverity;
  vehicleId?: string;
  driverId?: string;
  startDate?: string;
  endDate?: string;
  limit: number;
  offset: number;
}
