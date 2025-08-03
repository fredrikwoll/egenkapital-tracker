import { z } from "zod";
import { AccountType } from "@prisma/client";

const baseAccountSchema = z.object({
    name: z.string().min(1, "Account name is required"),
    type: z.nativeEnum(AccountType)
});

export const createAccountSchema = baseAccountSchema.extend({
    initialAmount: z.coerce.number().min(0, "Amount must be positive")
});

export const editAccountSchema = baseAccountSchema;

export type CreateAccountData = z.infer<typeof createAccountSchema>;
export type EditAccountData = z.infer<typeof editAccountSchema>;