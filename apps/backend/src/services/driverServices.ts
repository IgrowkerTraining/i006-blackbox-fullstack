import { prisma } from "../../prisma";

// DTOs para Conductores
interface CreateDriverDto {
  name: string;
  license_number: string;
}

interface UpdateDriverDto {
  name?: string;
  license_number?: string;
  is_active?: boolean;
}

// Configuración de selección común para incluir el vehículo
const driverSelect = {
  id: true,
  name: true,
  license_number: true,
  is_active: true,
  created_at: true,
  vehicle: {
    select: {
      unit_number: true,
    },
  },
};

// Obtener todos los conductores de una compañía
const getAll = async (companyId: string) => {
  return await prisma.driver.findMany({
    where: { companyId },
    select: driverSelect,
    orderBy: { created_at: "desc" },
  });
};

// Obtener conductores activos
const getAllActive = async (companyId: string) => {
  return await prisma.driver.findMany({
    where: {
      companyId,
      is_active: true,
    },
    select: driverSelect,
    orderBy: { created_at: "desc" },
  });
};

// Obtener un conductor por ID
const getById = async (id: string, companyId: string) => {
  return await prisma.driver.findFirst({
    where: { id, companyId },
    select: driverSelect,
  });
};

// Crear conductor
const create = async (data: CreateDriverDto, companyId: string) => {
  // Verificar si ya existe un conductor con esa licencia en ESTA empresa
  const existingDriver = await prisma.driver.findFirst({
    where: { companyId: companyId, license_number: data.license_number },
  });

  if (existingDriver) {
    if (existingDriver.is_active) {
      throw new Error("LICENSE_EXISTS");
    }
    throw new Error("DRIVER_INACTIVE");
  }

  return await prisma.driver.create({
    data: {
      name: data.name,
      license_number: data.license_number,
      companyId: companyId,
      is_active: true,
    },
    select: driverSelect,
  });
};

// Actualizar conductor
const update = async (id: string, data: UpdateDriverDto, companyId: string) => {
  const existingDriver = await prisma.driver.findFirst({
    where: { id, companyId },
  });

  if (!existingDriver) {
    throw new Error("Driver not found or access denied");
  }

  if (
    data.license_number &&
    data.license_number !== existingDriver.license_number
  ) {
    const duplicate = await prisma.driver.findFirst({
      where: {
        companyId,
        license_number: data.license_number,
        id: { not: id },
      },
    });

    if (duplicate) throw new Error("LICENSE_EXISTS");
  }

  return await prisma.driver.update({
    where: { id },
    data: {
      name: data.name,
      license_number: data.license_number,
      is_active: data.is_active,
    },
    select: driverSelect, // Aseguramos que devuelva la info completa tras actualizar
  });
};

// Eliminar conductor (SOFT DELETE)
const remove = async (id: string, companyId: string) => {
  const existingDriver = await prisma.driver.findFirst({
    where: { id, companyId },
  });

  if (!existingDriver) {
    throw new Error("Driver not found");
  }

  return await prisma.driver.update({
    where: { id },
    data: {
      is_active: false,
    },
  });
};

export const DriverService = {
  getAll,
  getAllActive,
  getById,
  create,
  update,
  remove,
};
