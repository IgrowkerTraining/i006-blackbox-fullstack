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
        create: {
          type_inspection: data.typeInspection,
          documentation_verified: data.documentationVerified,
          lights_ok: data.lightsOk,
          safety_elements_ok: data.safetyElementsOk,
        },
      },
    },
  });
};

export const EventServices = {
  createInspection,
};
