import { z } from "zod";
import { IncomeFrequency } from "@prisma/client";

const baseIncomeSchema = z.object({
    name: z.string().min(1, "Income name is required"),
    frequency: z.nativeEnum(IncomeFrequency),
    amount: z.coerce.number().min(0, "Amount must be positive"),
});

export const createIncomeSchema = baseIncomeSchema;
export const editIncomeSchema = baseIncomeSchema;


export type CreateIncomeData = z.infer<typeof createIncomeSchema>;
export type EditIncomeData = z.infer<typeof editIncomeSchema>;