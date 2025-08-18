import { prisma } from "@/lib/prisma";

export async function checkSetupStatus(): Promise<{ needsSetup: boolean }> {
  try {
    // Check if user has any accounts - this is the primary indicator
    const accountCount = await prisma.account.count();
    
    // If no accounts exist, they need to go through setup
    if (accountCount === 0) {
      return { needsSetup: true };
    }
    
    // If they have accounts, check if settings exist
    const settings = await prisma.settings.findFirst();
    
    // If no settings exist, they still need setup
    if (!settings) {
      return { needsSetup: true };
    }
    
    return { needsSetup: false };
  } catch (error) {
    console.error('Error checking setup status:', error);
    // Default to not needing setup to avoid blocking access
    return { needsSetup: false };
  }
}