import { z } from "zod";
import { RecordType } from "@prisma/client";

const baseRecordSchema = z.object({
    accountId: z.string(),
    type: z.nativeEnum(RecordType),
    amount: z.coerce.number(),
    description: z.string(),
    date: z.union([z.string(), z.date()]).transform((val) => {
        return typeof val === 'string' ? new Date(val) : val;
    })
});

export const createRecordSchema = baseRecordSchema;

export const editRecordSchema = baseRecordSchema;

export type CreateRecordData = z.infer<typeof createRecordSchema>;
export type EditRecordData = z.infer<typeof editRecordSchema>;