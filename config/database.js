import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";

configDotenv();

let prisma = null;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.__prisma) {
        global.__prisma = new PrismaClient();
    }
    prisma = global.__prisma;
}

export { prisma };