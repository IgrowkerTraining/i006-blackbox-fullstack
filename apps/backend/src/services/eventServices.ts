import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";
import {
  CreateAccidentDto,
  CreateInspectionDto,
  CreateMaintenanceDto,
  CreateOtherEventDto,
  EventFilters,
} from "../types/events";

const createInspection = (
  data: CreateInspectionDto,
  companyId: string,
  userId: string,
) => {
  return prisma.operationalEvent.create({
    data: {
      company_id: companyId,
      vehicle_id: data.vehicleId,
      driver_id: data.driverId,
      event_type: "INSPECTION",
      event_datetime: new Date(),
      created_by_user_id: userId,
      e_signature: data.eSignature,
      is_confirmed: data.isConfirmed,
      inspection_details: {
        create: {
          type_inspection: data.typeInspection as any,
          documentation_verified: data.documentationVerified,
          lights_ok: data.lightsOk,
          safety_elements_ok: data.safetyElementsOk,
        },
      },
    },
  });
};

const createAccident = async (
  data: CreateAccidentDto,
  companyId: string,
  userId: string,
) => {
  return prisma.operationalEvent.create({
    data: {
      company_id: companyId,
      vehicle_id: data.vehicleId,
      driver_id: data.driverId,
      event_type: "ACCIDENT",
      event_datetime: new Date(data.eventDatetime),
      location: data.location as any,
      severity: data.severity as any,
      injuries_reported: data.injuriesReported,
      cost: data.cost ? new Prisma.Decimal(data.cost) : null,
      mileage: data.mileage,
      final_observations: JSON.stringify({
        locationDetails: data.locationDetails,
        description: data.description,
        additionalNotes: data.finalObservations,
      }),
      e_signature: data.eSignature,
      is_confirmed: true,
      created_by_user_id: userId,
    },
    include: {
      vehicle: true,
      driver: true,
      createdBy: {
        select: { name: true, email: true },
      },
    },
  });
};

const createMaintenance = async (
  data: CreateMaintenanceDto,
  companyId: string,
  userId: string,
) => {
  return prisma.operationalEvent.create({
    data: {
      company_id: companyId,
      vehicle_id: data.vehicleId,
      driver_id: data.driverId || null,
      event_type: "MAINTENANCE",
      event_datetime: new Date(data.eventDatetime),
      severity: data.severity as any,
      cost: data.cost ? new Prisma.Decimal(data.cost) : null,
      mileage: data.mileage,
      next_service_date: data.nextServiceDate
        ? new Date(data.nextServiceDate)
        : null,
      final_observations: JSON.stringify({
        maintenanceType: data.maintenanceType,
        serviceType: data.serviceType,
        serviceProvider: data.serviceProvider,
        additionalNotes: data.finalObservations,
      }),
      e_signature: data.eSignature,
      is_confirmed: true,
      created_by_user_id: userId,
    },
    include: {
      vehicle: true,
      driver: true,
      createdBy: {
        select: { name: true, email: true },
      },
    },
  });
};

const createOtherEvent = async (
  data: CreateOtherEventDto,
  companyId: string,
  userId: string,
) => {
  return prisma.operationalEvent.create({
    data: {
      company_id: companyId,
      vehicle_id: data.vehicleId || null,
      driver_id: data.driverId || null,
      event_type: "OTHER",
      event_datetime: new Date(data.eventDatetime),
      location: data.location as any,
      final_observations: JSON.stringify({
        title: data.eventTitle,
        description: data.eventDescription,
        additionalNotes: data.finalObservations,
      }),
      e_signature: data.eSignature,
      created_by_user_id: userId,
    },
    include: {
      vehicle: true,
      driver: true,
      createdBy: {
        select: { name: true, email: true },
      },
    },
  });
};

const getAllEvents = async (companyId: string, filters: EventFilters) => {
  const where: any = {
    company_id: companyId,
  };

  if (filters.eventType) {
    where.event_type = filters.eventType;
  }

  if (filters.severity) {
    where.severity = filters.severity;
  }

  if (filters.vehicleId) {
    where.vehicle_id = filters.vehicleId;
  }

  if (filters.driverId) {
    where.driver_id = filters.driverId;
  }

  if (filters.startDate || filters.endDate) {
    where.event_datetime = {};
    if (filters.startDate) {
      where.event_datetime.gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      where.event_datetime.lte = new Date(filters.endDate);
    }
  }

  const [events, total] = await Promise.all([
    prisma.operationalEvent.findMany({
      where,
      include: {
        vehicle: true,
        driver: true,
        createdBy: {
          select: { name: true, email: true },
        },
        inspection_details: true,
      },
      orderBy: { event_datetime: "desc" },
      take: filters.limit,
      skip: filters.offset,
    }),
    prisma.operationalEvent.count({ where }),
  ]);

  return {
    events,
    total,
    limit: filters.limit,
    offset: filters.offset,
  };
};

const getEventById = async (id: string, companyId: string) => {
  return prisma.operationalEvent.findFirst({
    where: {
      id,
      company_id: companyId,
    },
    include: {
      vehicle: true,
      driver: true,
      createdBy: {
        select: { name: true, email: true },
      },
      inspection_details: true,
    },
  });
};

const getVehicleHistory = async (vehicleId: string, companyId: string) => {
  const vehicle = await prisma.vehicle.findFirst({
    where: { id: vehicleId, companyId },
  });

  if (!vehicle) {
    return null;
  }

  const events = await prisma.operationalEvent.findMany({
    where: {
      vehicle_id: vehicleId,
      company_id: companyId,
    },
    include: {
      driver: true,
      createdBy: {
        select: { name: true, email: true },
      },
    },
    orderBy: { event_datetime: "desc" },
  });

  return {
    vehicle,
    events,
  };
};

const getDriverHistory = async (driverId: string, companyId: string) => {
  const driver = await prisma.driver.findFirst({
    where: { id: driverId, companyId },
  });

  if (!driver) {
    return null;
  }

  const events = await prisma.operationalEvent.findMany({
    where: {
      driver_id: driverId,
      company_id: companyId,
    },
    include: {
      vehicle: true,
      createdBy: {
        select: { name: true, email: true },
      },
    },
    orderBy: { event_datetime: "desc" },
  });

  return {
    driver,
    events,
  };
};

const getCurrentDriver = async (vehicleId: string, companyId: string) => {
  const lastEvent = await prisma.operationalEvent.findFirst({
    where: {
      vehicle_id: vehicleId,
      company_id: companyId,
      driver_id: { not: null },
    },
    include: {
      driver: true,
    },
    orderBy: { event_datetime: "desc" },
  });

  if (!lastEvent) {
    return {
      currentDriver: null,
      message: "No driver assigned to this vehicle",
    };
  }

  return {
    currentDriver: lastEvent.driver,
    lastEventDate: lastEvent.event_datetime,
  };
};

export const EventServices = {
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
