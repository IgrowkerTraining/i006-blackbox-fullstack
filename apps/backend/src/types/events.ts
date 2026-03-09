enum TypeInspection {
  ARRIVAL = "ARRIVAL",
  DEPARTURE = "DEPARTURE",
}

export type CreateInspectionDto = {
  vehicleId: string;
  driverId: string;
  typeInspection: TypeInspection;
  documentationVerified: boolean;
  lightsOk: boolean;
  safetyElementsOk: boolean;
  eSignature: string;
  isConfirmed: boolean;
};

export interface CreateAccidentDto {
  vehicleId: string;
  driverId: string;
  eventDatetime: string;
  location?: string;
  locationDetails?: string;
  severity?: string;
  description?: string;
  injuriesReported?: boolean;
  policeReportNumber?: string;
  finalObservations?: string;
  eSignature?: string;
}

export interface CreateMaintenanceDto {
  vehicleId: string;
  driverId?: string;
  eventDatetime: string;
  maintenanceType?: string;
  serviceType?: string;
  mileage?: number;
  cost?: number;
  serviceProvider?: string;
  nextServiceDue?: string;
  finalObservations?: string;
  eSignature?: string;
}

export interface CreateOtherEventDto {
  vehicleId?: string;
  driverId?: string;
  eventDatetime: string;
  eventTitle?: string;
  eventDescription?: string;
  location?: string;
  finalObservations?: string;
  eSignature?: string;
}

export interface EventFilters {
  eventType?: string;
  vehicleId?: string;
  driverId?: string;
  startDate?: string;
  endDate?: string;
  limit: number;
  offset: number;
}
