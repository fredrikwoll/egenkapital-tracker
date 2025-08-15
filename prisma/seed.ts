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

  // Create historical Account Records with dates spanning several months
  const currentDate = new Date();
  
  const records = [];
  
  // Generate historical data for the last 12 weeks
  for (let weeksAgo = 12; weeksAgo >= 0; weeksAgo--) {
    const recordDate = new Date(currentDate);
    recordDate.setDate(recordDate.getDate() - (weeksAgo * 7));
    
    // Emergency Fund - Weekly deposits with some variation
    if (weeksAgo % 4 === 0) { // Monthly deposits
      records.push({
        accountId: savingsAccount.id,
        type: 'DEPOSIT',
        amount: 15000 + Math.random() * 5000, // 15k-20k variation
        description: `Monthly emergency fund deposit`,
        date: recordDate,
      });
    }
    
    // Checking Account - Regular income and expenses
    if (weeksAgo % 2 === 0) { // Bi-weekly salary
      records.push({
        accountId: checkingAccount.id,
        type: 'DEPOSIT',
        amount: 30000 + Math.random() * 5000, // Salary variation
        description: `Salary deposit`,
        date: recordDate,
      });
    }
    
    // Weekly expenses
    if (weeksAgo > 0) {
      records.push({
        accountId: checkingAccount.id,
        type: 'WITHDRAWAL',
        amount: 2000 + Math.random() * 1000, // Random weekly expenses
        description: `Weekly expenses`,
        date: recordDate,
      });
    }
    
    // Investment Account - Monthly contributions
    if (weeksAgo % 4 === 0 && weeksAgo > 0) {
      records.push({
        accountId: investmentAccount.id,
        type: 'DEPOSIT',
        amount: 20000 + Math.random() * 10000, // Investment variation
        description: `Monthly investment`,
        date: recordDate,
      });
    }
    
    // Stock Savings - Quarterly deposits and some gains
    if (weeksAgo % 12 === 0) {
      records.push({
        accountId: stockSavingsAccount.id,
        type: 'DEPOSIT',
        amount: 50000,
        description: `Quarterly ASK contribution`,
        date: recordDate,
      });
    }
    
    if (weeksAgo % 8 === 0 && weeksAgo > 0) {
      records.push({
        accountId: stockSavingsAccount.id,
        type: 'INTEREST',
        amount: 1000 + Math.random() * 2000, // Market gains/interest
        description: `Stock market gains`,
        date: recordDate,
      });
    }
  }
  
  // Add some specific transactions for variety
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  const twoMonthsAgo = new Date(currentDate);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
  records.push(
    // Emergency withdrawal
    {
      accountId: savingsAccount.id,
      type: 'WITHDRAWAL',
      amount: 8000,
      description: 'Car repair emergency',
      date: oneMonthAgo,
    },
    // Large investment
    {
      accountId: investmentAccount.id,
      type: 'DEPOSIT',
      amount: 100000,
      description: 'Bonus investment',
      date: twoMonthsAgo,
    },
    // Credit card payment
    {
      accountId: checkingAccount.id,
      type: 'WITHDRAWAL',
      amount: 15000,
      description: 'Credit card payment',
      date: oneMonthAgo,
    }
  );
  
  await prisma.accountRecord.createMany({
    data: records,
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
  console.log(`   - ${records.length} account records (spanning 12 weeks)`)
  console.log(`   - 3 income sources`)
  console.log(`   - 4 debt items`)
  console.log(`🎯 Dashboard features tested:`)
  console.log(`   - Historical capital progress (12 weeks)`)
  console.log(`   - Monthly growth calculations`)
  console.log(`   - Asset allocation (capital vs debt)`)
  console.log(`   - Various transaction types (deposits, withdrawals, interest)`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })