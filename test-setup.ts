import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { beforeAll, afterAll, vi } from 'vitest'

// Load test environment
config({ path: '.env.test', override: true })

// Verify environment
if (!process.env.DATABASE_URL?.includes('egenkapital_tracker_test')) {
throw new Error('❌ Test DATABASE_URL not loaded correctly')
}

  // Clear module cache
vi.doMock('@/lib/prisma', () => ({
    prisma: new PrismaClient()
}))

const testPrisma = new PrismaClient()
export { testPrisma as prisma }

beforeAll(async () => {
    try {
        await testPrisma.accountRecord.deleteMany()
        await testPrisma.account.deleteMany()
        await testPrisma.debt.deleteMany()
        await testPrisma.income.deleteMany()
    } catch (error) {
        console.log('Cleanup failed:', error.message)
    }
})

afterAll(async () => {
    await testPrisma.$disconnect()
})

// Close connection after all tests
process.on('beforeExit', async () => {
    await testPrisma.$disconnect()
})
