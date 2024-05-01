import { Transaction } from "@prisma/client";

export type TransactionItemModel = {
    productName: string;
    weight: number;
    rate: number;
    total: number;
}

export type TransactionModel = {
    transactionId: string;
    date: Date;
    userId: string;
    transactionItem: TransactionItemModel[];
}

export type TransactionResponse = {
    transactionId: string;
    date: Date;
    userId: string;
    transactionItem: TransactionItemModel[];
}

export type CreateTransactionRequest = {
    userId: string;
    transactionItems: [
        { productId: string, weight: number }
    ];
}

export function toTransactionResponse(transaction: TransactionModel): TransactionResponse {
    return {
        transactionId: transaction.transactionId,
        date: transaction.date,
        userId: transaction.userId,
        transactionItem: transaction.transactionItem.map(item => ({
            productName: item.productName,
            weight: item.weight,
            rate: item.rate,
            total: item.total
        }))
    }
}