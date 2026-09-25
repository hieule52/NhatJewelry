import { PrismaClient } from "@prisma/client";

const NEON_DB_URL =
  "postgresql://neondb_owner:npg_gISxJDVr1lT7@ep-small-morning-axsykazq-pooler.c-4.us-east-2.aws.neon.tech/jewerly?sslmode=require&channel_binding=require";

// Ensure process.env.DATABASE_URL is never pointing to dead localhost
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("localhost")) {
  process.env.DATABASE_URL = NEON_DB_URL;
}

const dbUrl = process.env.DATABASE_URL || NEON_DB_URL;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// If an existing prisma instance was connected to localhost, discard it
if (globalForPrisma.prisma && (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("localhost"))) {
  globalForPrisma.prisma = undefined;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

