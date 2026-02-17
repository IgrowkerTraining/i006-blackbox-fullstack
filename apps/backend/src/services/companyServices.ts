import { prisma } from "../../prisma";

const getAll = async () => {
  const companies = await prisma.companies.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return companies;
};

export const CompanyServices = {
  getAll,
};
