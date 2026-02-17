import { prisma } from "../../prisma";

const getAll = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return users;
};

export const UserService = {
  getAll,
};
