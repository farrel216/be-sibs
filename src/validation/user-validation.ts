import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(50),
        password: z.string().min(1).max(50),
        name: z.string().min(1).max(100),
        role: z.string().min(1).max(50).optional()
    })

    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(1).max(50),
        password: z.string().min(1).max(50)
    })

    static readonly UPDATE: ZodType = z.object({
        password: z.string().min(1).max(50).optional(),
        name: z.string().min(1).max(100).optional(),
        role: z.string().min(1).max(50).optional()
    })
}