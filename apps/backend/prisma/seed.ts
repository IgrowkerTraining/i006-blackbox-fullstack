import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const defaultCompany = await prisma.company.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' }, // ID predecible para pruebas
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: "Default Test Company",
      usdotNumber: "1234567",
    },
  });

  console.log({ defaultCompany });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
