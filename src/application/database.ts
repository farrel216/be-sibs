import { PrismaClient } from '@prisma/client'
import { logger } from './logging'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices


// export const prismaClient = new PrismaClient()
export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
        {
            emit: 'event',
            level: 'error',
        },
    ]
})

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

export default prismaClient