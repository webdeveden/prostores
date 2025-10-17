import { PrismaClient } from "@prisma/client";
import sampledata from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampledata.products });
  await prisma.user.createMany({ data: sampledata.users });

  console.log("Database seeded successfully!");
}

main();
