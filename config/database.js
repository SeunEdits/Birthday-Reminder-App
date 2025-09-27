import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";

configDotenv();

if (process.env.NODE_ENV === "production") {
    const prisma = new PrismaClient();
} else {
    if (!global.__prisma) {
        global.__prisma = new PrismaClient();
    }
    prisma = global.__prisma;
}

export { prisma };