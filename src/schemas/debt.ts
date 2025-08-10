import { z } from "zod";
import { DebtType } from "@prisma/client";

const baseDebtSchema = z.object({
    name: z.string().min(1, "Debt name is required"),
    type: z.nativeEnum(DebtType),
    amount: z.coerce.number().min(0, "Amount must be positive"),
});

export const createDebtSchema = baseDebtSchema;
export const editDebtSchema = baseDebtSchema;


export type CreateDebtData = z.infer<typeof createDebtSchema>;
export type EditDebtData = z.infer<typeof editDebtSchema>;