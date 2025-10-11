import { PrismaClient } from "@prisma/client";
import sampledata from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: sampledata.products });

  console.log("Database seeded successfully!");
}

main();
