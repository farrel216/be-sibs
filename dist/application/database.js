"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices
exports.prismaClient = new client_1.PrismaClient();
// export const prismaClient = new PrismaClient({
//     log: [
//         {
//             emit: 'event',
//             level: 'query',
//         },
//         {
//             emit: 'event',
//             level: 'info',
//         },
//         {
//             emit: 'event',
//             level: 'warn',
//         },
//         {
//             emit: 'event',
//             level: 'error',
//         },
//     ]
// })
// prismaClient.$on("error", e => {
//     logger.error(e)
// })
// prismaClient.$on("warn", e => {
//     logger.warn(e)
// })
// prismaClient.$on("info", e => {
//     logger.info(e)
// })
// prismaClient.$on("query", e => {
//     logger.info(e)
// })
exports.default = exports.prismaClient;
