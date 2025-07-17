import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data
  await prisma.accountRecord.deleteMany()
  await prisma.account.deleteMany()
  await prisma.debt.deleteMany()
  await prisma.income.deleteMany()

  // Create Accounts
  const savingsAccount = await prisma.account.create({
    data: {
      name: 'Emergency Fund',
      type: 'SAVINGS',
    },
  })

  const checkingAccount = await prisma.account.create({
    data: {
      name: 'Daily Spending',
      type: 'CHECKING',
    },
  })

  const investmentAccount = await prisma.account.create({
    data: {
      name: 'Stock Portfolio',
      type: 'INVESTMENT',
    },
  })

  const stockSavingsAccount = await prisma.account.create({
    data: {
      name: 'ASK (Aksjesparekonto)',
      type: 'STOCK_SAVINGS',
    },
  })

  // Create Account Records
  await prisma.accountRecord.createMany({
    data: [
      // Emergency Fund records
      {
        accountId: savingsAccount.id,
        type: 'DEPOSIT',
        amount: 50000,
        description: 'Initial emergency fund deposit',
      },
      {
        accountId: savingsAccount.id,
        type: 'DEPOSIT',
        amount: 15000,
        description: 'Monthly savings',
      },
      {
        accountId: savingsAccount.id,
        type: 'WITHDRAWAL',
        amount: 5000, // ← Positive number, type handles direction
        description: 'Car repair emergency',
      },

      // Checking Account records
      {
        accountId: checkingAccount.id,
        type: 'DEPOSIT',
        amount: 25000,
        description: 'Salary deposit',
      },
      {
        accountId: checkingAccount.id,
        type: 'WITHDRAWAL',
        amount: 8000,
        description: 'Rent payment',
      },
      {
        accountId: checkingAccount.id,
        type: 'WITHDRAWAL',
        amount: 3500,
        description: 'Groceries and utilities',
      },

      // Investment records
      {
        accountId: investmentAccount.id,
        type: 'DEPOSIT',
        amount: 100000,
        description: 'Initial investment',
      },
      {
        accountId: investmentAccount.id,
        type: 'DEPOSIT',
        amount: 20000,
        description: 'Monthly investment',
      },

      // Stock Savings Account
      {
        accountId: stockSavingsAccount.id,
        type: 'DEPOSIT',
        amount: 75000,
        description: 'ASK contribution',
      },
      {
        accountId: stockSavingsAccount.id,
        type: 'INTEREST',
        amount: 2500,
        description: 'Stock gains',
      },
    ],
  })

  // Create Income entries
  await prisma.income.createMany({
    data: [
      {
        name: 'Software Developer Salary',
        amount: 650000, // 650k NOK annually
      },
      {
        name: 'Freelance Projects',
        amount: 120000, // 120k NOK annually
      },
      {
        name: 'Investment Dividends',
        amount: 25000, // 25k NOK annually
      },
    ],
  })

  // Create Debt entries - FIXED TYPES
  await prisma.debt.createMany({
    data: [
      {
        name: 'Student Loan',
        amount: 350000,
        type: 'STUDENT_LOAN', // ✅ Valid
      },
      {
        name: 'Car Loan',
        amount: 180000,
        type: 'CONSUMER_LOAN', // ✅ Changed from CAR_LOAN
      },
      {
        name: 'Credit Card',
        amount: 25000,
        type: 'CREDIT_CARD', // ✅ Valid
      },
      {
        name: 'Home Mortgage',
        amount: 2500000,
        type: 'MORTGAGE', // ✅ Valid
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - 4 accounts`)
  console.log(`   - 10 account records`)
  console.log(`   - 3 income sources`)
  console.log(`   - 4 debt items`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })