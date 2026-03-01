import { prisma } from "../../prisma";

interface CreateVehicleDto {
  companyId: string;
  unit_number?: string;
  plate?: string;
  is_active?: boolean;
  driverId?: string;
}

interface UpdateVehicleDto {
  unit_number?: string;
  plate?: string;
  is_active?: boolean;
  driverId?: string;
}

const create = async (data: CreateVehicleDto) => {
  return await prisma.vehicle.create({
    data,
  });
};

const getAll = async (companyId: string) => {
  return await prisma.vehicle.findMany({
    where: { companyId },
    include: {
      driver: true,
    },
  });
};

const getById = async (id: string, companyId: string) => {
  return await prisma.vehicle.findFirst({
    where: { id, companyId },
    include: {
      driver: true,
    },
  });
};

const update = async (
  id: string,
  companyId: string,
  data: UpdateVehicleDto,
) => {
  const vehicle = await prisma.vehicle.findFirst({ where: { id, companyId } });
  if (!vehicle) {
    throw new Error("Vehicle not found or access denied");
  }

  return await prisma.vehicle.update({
    where: { id },
    data,
  });
};

const deleteVehicle = async (id: string, companyId: string) => {
  const vehicle = await prisma.vehicle.findFirst({ where: { id, companyId } });
  if (!vehicle) {
    throw new Error("Vehicle not found or access denied");
  }

  return await prisma.vehicle.delete({
    where: { id },
  });
};

export const VehicleService = {
  create,
  getAll,
  getById,
  update,
  delete: deleteVehicle,
};
