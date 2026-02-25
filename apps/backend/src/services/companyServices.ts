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

const getVehiclesById = async (
  id: string,
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;

  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({
      where: {
        companyId: id,
      },
      skip,
      take: limit,
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
    }),
    prisma.vehicle.count({
      where: {
        companyId: id,
      },
    }),
  ]);

  return {
    vehicles,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const register = async (companyData: {
  name: string;
  usdotNumber?: string;
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
