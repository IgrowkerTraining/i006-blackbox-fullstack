import { prisma } from "../../prisma";

const getAll = async () => {
  const vehicles = await prisma.vehicle.findMany({
    select: {
      id: true,
      unit_number: true,
      plate: true,
      is_active: true,
    },
  });
  return vehicles;
};

export const VehicleService = {
  getAll,
};
