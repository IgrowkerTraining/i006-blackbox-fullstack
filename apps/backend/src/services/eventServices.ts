import { prisma } from "../../prisma";
import { CreateInspectionDto } from "../types/events";

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
        create: [
          {
            type_inspection: data.typeInspection,
            documentation_verified: data.documentationVerified,
            lights_ok: data.lightsOk,
            safety_elements_ok: data.safetyElementsOk,
          },
        ],
      },
    },
  });
};

const getVehicleHistory = async (vehicleId: string, companyId: string) => {
  // Verificar que el vehículo pertenezca a la empresa
  const vehicle = await prisma.vehicle.findFirst({
    where: { id: vehicleId, companyId },
  });

  if (!vehicle) {
    return null;
  }

  // Obtener eventos del vehículo
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
  // Verificar que el conductor pertenezca a la empresa
  const driver = await prisma.driver.findFirst({
    where: { id: driverId, companyId },
  });

  if (!driver) {
    return null;
  }

  // Obtener eventos del conductor
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
  // Buscar último evento con conductor asignado
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
  getVehicleHistory,
  getDriverHistory,
  getCurrentDriver,
};
