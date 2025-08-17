import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all accounts
    const accounts = await prisma.account.findMany();
    
    // Fetch all account records
    const accountRecords = await prisma.accountRecord.findMany({
      orderBy: { date: 'desc' }
    });

    // Fetch all debts
    const debts = await prisma.debt.findMany();

    // Calculate total current capital (sum of all account balances)
    let totalCapital = 0;
    accounts.forEach(account => {
      const accountBalance = accountRecords
        .filter(record => record.accountId === account.id)
        .reduce((sum, record) => {
          if (record.type === 'DEPOSIT' || record.type === 'INTEREST') {
            return sum + record.amount;
          } else if (record.type === 'WITHDRAWAL' || record.type === 'TRANSFER') {
            return sum - record.amount;
          }
          return sum;
        }, 0);
      totalCapital += accountBalance;
    });

    // Calculate total debt
    const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);

    // Calculate net worth (capital - debt)
    const netWorth = totalCapital - totalDebt;

    // Calculate monthly growth (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentRecords = accountRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= thirtyDaysAgo;
    });
    const monthlyGrowth = recentRecords.reduce((sum, record) => {
      if (record.type === 'DEPOSIT' || record.type === 'INTEREST') {
        return sum + record.amount;
      } else if (record.type === 'WITHDRAWAL' || record.type === 'TRANSFER') {
        return sum - record.amount;
      }
      return sum;
    }, 0);

    // Calculate weekly capital changes for the last 10 weeks
    const capitalHistory: Array<{week: string, value: number, change: number}> = [];
    const currentDate = new Date();
    let runningTotal = 0;
    
    for (let i = 9; i >= 0; i--) {
      const weekStartDate = new Date(currentDate);
      weekStartDate.setDate(weekStartDate.getDate() - (i * 7 + 6)); // Start of week
      const weekEndDate = new Date(currentDate);
      weekEndDate.setDate(weekEndDate.getDate() - (i * 7)); // End of week
      
      // Get records for this specific week only
      const weekRecords = accountRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= weekStartDate && recordDate <= weekEndDate;
      });
      
      // Calculate net change for this week
      const weeklyChange = weekRecords.reduce((sum, record) => {
        if (record.type === 'DEPOSIT' || record.type === 'INTEREST') {
          return sum + record.amount;
        } else if (record.type === 'WITHDRAWAL' || record.type === 'TRANSFER') {
          return sum - record.amount;
        }
        return sum;
      }, 0);

      // Calculate running total up to this week
      runningTotal += weeklyChange;
      
      // Calculate percentage change from previous week
      const previousTotal = runningTotal - weeklyChange;
      let percentageChange = 0;
      if (previousTotal !== 0) {
        percentageChange = (weeklyChange / Math.abs(previousTotal)) * 100;
      } else if (weeklyChange !== 0) {
        percentageChange = 100; // If starting from 0, consider it 100% change
      }

      const weekNumber = Math.ceil((weekEndDate.getTime() - new Date(weekEndDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
      
      capitalHistory.push({
        week: `Uke ${weekNumber}`,
        value: runningTotal / 100, // Convert øre to kr - cumulative total
        change: percentageChange // Actual percentage change
      });
    }

    // Asset allocation calculation
    const totalAssets = totalCapital + totalDebt;
    const assetAllocation = [
      { 
        name: 'Egenkapital', 
        value: totalAssets > 0 ? Math.round((totalCapital / totalAssets) * 100) : 0, 
        color: '#10B981' 
      },
      { 
        name: 'Gjeld', 
        value: totalAssets > 0 ? Math.round((totalDebt / totalAssets) * 100) : 0, 
        color: '#EF4444' 
      }
    ];

    // Goal calculation (example: 1,000,000 kr goal)
    const capitalGoal = 100000000; // 1,000,000 kr in øre
    const remaining = Math.max(0, capitalGoal - totalCapital);
    const progressPercentage = Math.min(100, Math.round((totalCapital / capitalGoal) * 100));

    const dashboardData = {
      monthlyGrowth: monthlyGrowth / 100, // Convert øre to kr
      totalCapital: totalCapital / 100, // Convert øre to kr
      totalDebt: totalDebt / 100, // Convert øre to kr
      netWorth: netWorth / 100, // Convert øre to kr
      capitalGoal: capitalGoal / 100, // Convert øre to kr
      remaining: remaining / 100, // Convert øre to kr
      progressPercentage,
      assetAllocation,
      capitalHistory
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}