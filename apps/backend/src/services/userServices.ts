import { prisma } from "../../prisma";

// interfaz tipo de usuario
interface CreateUserDto {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
}

// todos los usuarios de una compania
const getAll = async (companyId: string) => {
  const users = await prisma.user.findMany({
    where: { companyId: companyId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  if (!users) return null;
  return users;
};

// un solo usuario de una compania
const getByUserId = async (id: string, companyId: string) => {
  const user = await prisma.user.findFirst({
    where: { id: id, companyId: companyId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  if (!user) return null;
  return user;
};

// crear un usuario de una compania

const create = async (data: CreateUserDto, companyId: string) => {
  await prisma.user.create({
    data: { ...data, companyId: companyId },
  });
};

// actualizar un usuario de una compania
const update = async (id: string, data: UpdateUserDto, companyId: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { id: companyId },
    });
    if (!existingUser) throw new Error("User not found");

    return await prisma.user.update({
      where: { id: id },
      data,
    });
  } catch (error) {
    throw error;
  }
};

const remove = async (id: string, companyId: string) => {
  const existingUser = await prisma.user.findFirst({
    where: { id, companyId },
  });
  if (!existingUser) throw new Error("User not found");

  return await prisma.user.delete({
    where: { id },
  });
};

export const UserService = {
  getAll,
  getByUserId,
  create,
  update,
  remove,
};
