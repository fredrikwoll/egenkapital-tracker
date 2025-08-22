import { z } from "zod";
import { HouseholdType } from "@prisma/client";

const baseSettingSchema = z.object({
    currency: z.string().min(1, "Currency is required"),
    dateFormat: z.string().min(1, "Date Format is required"),
    numberFormat: z.string().min(1, "Number Format is required"),
    currencyDisplay: z.string().min(1, "Currency Display is required"),
    capitalGoal: z.number().min(0, "Capital goal must be positive"),
    
    //household
    houseHoldType: z.nativeEnum(HouseholdType),
    childrenUnder6: z.number().min(0, "SIFO couple must be positive"),
    childrenOver6: z.number().min(0, "SIFO child under 6 must be positive"),

    // SIFO living expenses (in kroner for display)
    sifoSingleAdult: z.number().min(0, "SIFO single adult must be positive"),
    sifoCouple: z.number().min(0, "SIFO couple must be positive"),
    sifoChildUnder6: z.number().min(0, "SIFO child under 6 must be positive"),
    sifoChildOver6: z.number().min(0, "SIFO child over 6 must be positive"),
    
    // Loan calculation parameters (as percentages for display)
    maxDebtRatio: z.number().min(0.1, "Max debt ratio must be at least 0.1").max(10, "Max debt ratio cannot exceed 10"),
    maxLtvRatio: z.number().min(0.1, "Max LTV ratio must be at least 0.1").max(1, "Max LTV ratio cannot exceed 1"),
    stressTestRate: z.number().min(0, "Stress test rate must be positive").max(0.2, "Stress test rate cannot exceed 20%"),
    defaultLoanTerm: z.number().min(1, "Loan term must be at least 1 year").max(50, "Loan term cannot exceed 50 years"),
    defaultInterestRate: z.number().min(0, "Interest rate must be positive").max(0.5, "Interest rate cannot exceed 50%"),
    minDownPayment: z.number().min(0.01, "Min down payment must be at least 1%").max(1, "Min down payment cannot exceed 100%")
});

export const createSettingSchema = baseSettingSchema;
export const editSettingSchema = baseSettingSchema;


export type CreateSettingData = z.infer<typeof createSettingSchema>;
export type EditSettingData = z.infer<typeof editSettingSchema>;