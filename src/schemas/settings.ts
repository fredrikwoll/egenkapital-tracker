import { z } from "zod";

const baseSettingSchema = z.object({
    currency: z.string().min(1, "Currency is required"),
    dateFormat: z.string().min(1, "Date Format is required"),
    numberFormat: z.string().min(1, "Number Format is required"),
    currencyDisplay: z.string().min(1, "Currency Display is required")
});

export const createSettingSchema = baseSettingSchema;
export const editSettingSchema = baseSettingSchema;


export type CreateSettingData = z.infer<typeof createSettingSchema>;
export type EditSettingData = z.infer<typeof editSettingSchema>;