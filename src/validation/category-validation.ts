import { z, ZodType } from "zod";

export class CategoryValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(50)
    })
    static readonly UPDATE: ZodType = z.object({
        categoryId: z.string().uuid(),
        name: z.string().min(1).max(50)
    })
    static readonly SEARCH: ZodType = z.object({
        name: z.string().max(50).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}