import { z, ZodType } from "zod";

export class TransactionValidation {
    static readonly CREATE: ZodType = z.object({
        userId: z.string().uuid(),
        transactionItems: z.array(z.object({
            productId: z.string().uuid(),
            weight: z.number().min(1).positive()
        }))
    })
}