import { prisma } from "../../prisma";

const getAll = async () => {
  const companies = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return companies;
};

const getVehiclesById = async (id: string) => {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      companyId: id,
    },
    select: {
      id: true,
      unit_number: true,
      is_active: true,
      driver: {
        select: {
          name: true,
        },
      },
    },
  });

  return vehicles;
};

export const CompanyServices = {
  getAll,
  getVehiclesById,
};
