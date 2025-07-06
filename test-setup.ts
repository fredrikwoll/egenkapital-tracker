import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'

// Load test environment variables
config({ path: '.env.test' })


const prisma = new PrismaClient()

beforeEach(async () => {
    // Clean database before each test
    await prisma.accountRecord.deleteMany()
    await prisma.account.deleteMany()
    await prisma.debt.deleteMany()
    await prisma.income.deleteMany()
})

// Close connection after all tests
process.on('beforeExit', async () => {
    await prisma.$disconnect()
})
