import { z } from "zod";
import { RecordType } from "@prisma/client";

const baseRecordSchema = z.object({
    accountId: z.string(),
    type: z.nativeEnum(RecordType),
    amount: z.coerce.number(),
    description: z.string()
});

export const createRecordSchema = baseRecordSchema;

export const editRecordSchema = baseRecordSchema;

export type CreateRecordData = z.infer<typeof createRecordSchema>;
export type EditRecordData = z.infer<typeof editRecordSchema>;