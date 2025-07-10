import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { afterAll, afterEach, beforeEach } from 'vitest'

// Load test environment variables
config({ path: '.env.test' })


const prisma = new PrismaClient()

afterAll(async () => {
    // Clean database before each test
    //console.log('🧹 GLOBAL CLEANUP: Starting database cleanup...')
    await prisma.accountRecord.deleteMany()
    await prisma.account.deleteMany()
    await prisma.debt.deleteMany()
    await prisma.income.deleteMany()
    //console.log('🧹 GLOBAL CLEANUP: Finished database cleanup')
})

// Close connection after all tests
process.on('beforeExit', async () => {
    await prisma.$disconnect()
})
