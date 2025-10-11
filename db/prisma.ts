import { Pool, neonConfig, PoolConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

// Sets up WebSocket connections for Neon
neonConfig.webSocketConstructor = ws;

// Define the PoolConfig object
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
};

// Instantiates the Prisma adapter using the PoolConfig
const adapter = new PrismaNeon(poolConfig);

// Extends the PrismaClient with a custom result transformer
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
