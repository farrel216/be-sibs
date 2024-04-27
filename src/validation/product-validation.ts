import { z, ZodType } from "zod";

export class ProductValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(50),
        buyPrice: z.number().min(1).positive(),
        sellPrice: z.number().min(1).positive(),
        categoryId: z.string().uuid()
    })
    static readonly SEARCH: ZodType = z.object({
        name: z.string().max(50).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
        categoryId: z.string().uuid().optional()
    })
    static readonly UPDATE: ZodType = z.object({
        productId: z.string().uuid(),
        name: z.string().min(1).max(50),
        buyPrice: z.number().min(1).positive(),
        sellPrice: z.number().min(1).positive(),
        categoryId: z.string().uuid()
    })
}