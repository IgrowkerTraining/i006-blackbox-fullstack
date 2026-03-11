export interface CreateInspectionDto {
  vehicleId: string;
  driverId: string;
  typeInspection?: string;
  documentationVerified?: boolean;
  lightsOk?: boolean;
  tiresOk?: boolean;
  brakesOk?: boolean;
  safetyElementsOk?: boolean;
  eSignature?: string;
  isConfirmed?: boolean;
}

export interface CreateAccidentDto {
  vehicleId: string;
  driverId: string;
  eventDatetime: string;
  location?: string;
  severity?: string; // MINOR, MODERATE, SEVERE, CRITICAL
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
  eventDatetime: string;
  severity?: string; // MINOR, MODERATE, SEVERE, CRITICAL
  cost?: number;
  mileage?: number;
  nextServiceDate?: string;
  maintenanceType?: string; // PREVENTIVE, CORRECTIVE, EMERGENCY
  serviceType?: string;
  serviceProvider?: string;
  finalObservations?: string;
  eSignature?: string;
}

export interface CreateOtherEventDto {
  vehicleId?: string;
  driverId?: string;
  eventDatetime: string;
  location?: string;
  eventTitle?: string;
  eventDescription?: string;
  finalObservations?: string;
  eSignature?: string;
}

export interface EventFilters {
  eventType?: string;
  severity?: string;
  vehicleId?: string;
  driverId?: string;
  startDate?: string;
  endDate?: string;
  limit: number;
  offset: number;
}
