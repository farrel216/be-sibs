import { CreateTransactionRequest, toTransactionResponse, TransactionResponse } from "../model/transaction-model";
import { TransactionValidation } from "../validation/transaction-validation";
import { Validation } from "../validation/validation";
import prismaClient from "../application/database";
import { ResponseError } from "../error/response-error";
import { Transaction } from "@prisma/client";

export class TransactionService {
    static async create(request: CreateTransactionRequest): Promise<TransactionResponse> {
        const transactionRequest = Validation.validate(TransactionValidation.CREATE, request);

        const itemName = await Promise.all(transactionRequest.transactionItems.map(async item => {
            const product = await prismaClient.product.findUnique({
                where: {
                    productId: item.productId
                }
            })
            if (!product) {
                throw new ResponseError(404, `Product with ID ${item.productId} not found`)
            }
            return { ...item, productName: product.name, rate: product.buyPrice }
        }))

        const transaction = await prismaClient.$transaction(async (tx) => {
            const transactionProcess = await tx.transaction.create({
                data: {
                    userId: transactionRequest.userId,
                    date: new Date(),
                    transactionItem: {
                        createMany: {
                            data: itemName.map(item => ({
                                productId: item.productId,
                                productName: item.productName,
                                weight: item.weight,
                                rate: item.rate,
                                total: item.weight * item.rate
                            }))
                        }
                    }
                },
                include: {
                    transactionItem: true
                }
            })


            await tx.balance.update({
                where: {
                    userId: transactionRequest.userId
                },
                data: {
                    balance: {
                        increment: transactionProcess.transactionItem.reduce((acc, item) => acc + item.total, 0)
                    }
                }
            })
            return transactionProcess;
        })
        return toTransactionResponse(transaction)
    }

    static async getTransactionByUserId(userId: string): Promise<TransactionResponse[]> {
        const transactions = await prismaClient.transaction.findMany({
            where: {
                userId
            },
            include: {
                transactionItem: true
            }
        })
        return transactions.map(transaction => toTransactionResponse(transaction))
    }

    static async getTransactionById(transactionId: string): Promise<TransactionResponse> {
        const transaction = await prismaClient.transaction.findUnique({
            where: {
                transactionId
            },
            include: {
                transactionItem: true
            }
        })

        if (!transaction) {
            throw new ResponseError(404, "Transaction not found")
        }

        return toTransactionResponse(transaction)
    }

    static async delete(transactionId: string) {
        const transaction = await prismaClient.transaction.findUnique({
            where: {
                transactionId
            },
            include: {
                transactionItem: true
            }
        })

        if (!transaction) {
            throw new ResponseError(404, "Transaction not found")
        }

        await prismaClient.$transaction(async (tx) => {
            await tx.transactionItem.deleteMany({
                where: {
                    transactionId
                }
            })

            await tx.balance.update({
                where: {
                    userId: transaction.userId
                },
                data: {
                    balance: {
                        decrement: transaction.transactionItem.reduce((acc, item) => acc + item.total, 0)
                    }
                }
            })

            await tx.transaction.delete({
                where: {
                    transactionId
                }
            })
        })
        return transaction
    }
}