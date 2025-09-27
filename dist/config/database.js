"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
let prisma;
if (process.env.NODE_ENV === "production") {
    exports.prisma = prisma = new client_1.PrismaClient();
}
else {
    if (!global.__prisma) {
        global.__prisma = new client_1.PrismaClient();
    }
    exports.prisma = prisma = global.__prisma;
}
//# sourceMappingURL=database.js.map