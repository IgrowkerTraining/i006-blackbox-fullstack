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

const register = async (companyData: {
  name: string;
  usdotNumber: string;
  state: string;
}) => {
  const company = await prisma.company.create({
    data: companyData,
  });
  return company;
};

const count = async () => {
  return await prisma.company.count();
};

export const CompanyServices = {
  getAll,
  getVehiclesById,
  register,
  count,
};
