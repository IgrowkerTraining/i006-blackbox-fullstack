import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "../../prisma";

// interfaz tipo de usuario
interface CreateUserDto {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
  isActive?: boolean;
  role?: UserRole;
}

// todos los usuarios de una compañia
const getAll = async (companyId: string) => {
  const users = await prisma.user.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
  return users;
};

// un solo usuario de una compañia
const getByUserId = async (id: string, companyId: string) => {
  const user = await prisma.user.findFirst({
    where: { id, companyId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
  return user;
};

// crear un usuario de una compañia
const create = async (data: CreateUserDto, companyId: string) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role,
      companyId: companyId, // empresa del admin
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
};

// actualizar un usuario de una compañia
const update = async (id: string, data: UpdateUserDto, companyId: string) => {
  // verificar que no exista
  if (data.email) {
    const emailExists = await prisma.user.findFirst({
      where: {
        email: data.email,
        id: { not: id }, // Excluir al usuario actual
      },
    });

    if (emailExists) {
      throw new Error("Email already in use");
    }
  }
  // Verificar que el usuario pertenece a la empresa
  const existingUser = await prisma.user.findFirst({
    where: {
      id: id,
      companyId: companyId,
    },
  });

  if (!existingUser) {
    throw new Error("User not found or access denied");
  }

  return await prisma.user.update({
    where: {
      id,
      companyId,
    },
    data,
  });
};

// eliminar usuario de una compañia
const remove = async (id: string, companyId: string) => {
  // Misma verificacion
  const existingUser = await prisma.user.findFirst({
    where: { id, companyId },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  return await prisma.user.delete({
    where: { id },
  });
};

const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const UserService = {
  getAll,
  getByUserId,
  create,
  update,
  remove,
  findByEmail,
};
