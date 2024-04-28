import { CreateTransactionRequest, toTransactionResponse, TransactionResponse } from "../model/transaction-model";
import { TransactionValidation } from "../validation/transaction-validation";
import { Validation } from "../validation/validation";
import prismaClient from "../application/database";

export class TransactionService {
    static async create(request: CreateTransactionRequest): Promise<TransactionResponse> {
        const transactionRequest = Validation.validate(TransactionValidation.CREATE, request);

        const transaction = await prismaClient.$transaction(async (tx) => {
            const transactionProcess = await tx.transaction.create({
                data: {
                    userId: transactionRequest.userId,
                    status: "success",
                    date: new Date(),
                    transactionItem: {
                        createMany: {
                            data: transactionRequest.transactionItems.map(item => ({
                                productId: item.productId,
                                quantity: item.quantity,
                                itemBuyPrice: item.itemBuyPrice
                            }))
                        }
                    }
                },
                include: {
                    transactionItem: true
                }
            });
            await tx.user.update({
                where: {
                    userId: transactionRequest.userId
                },
                data: {
                    balance: {
                        increment: transactionRequest.transactionItems.reduce((total, item) => total + item.quantity * item.itemBuyPrice, 0)
                    }
                }
            })
            return transactionProcess;
        })
        return toTransactionResponse(transaction);
    }
}