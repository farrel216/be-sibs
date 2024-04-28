import { Transaction } from "@prisma/client";

export type TransactionItemModel = {
    productId: string;
    quantity: number;
    itemBuyPrice: number;
}

export type TransactionModel = {
    transactionId: string;
    status: string;
    date: Date;
    userId: string;
    transactionItem: TransactionItemModel[];
}

export type TransactionResponse = {
    transactionId: string;
    status: string;
    date: Date;
    userId: string;
    transactionItems: TransactionItemModel[];
}

export type CreateTransactionRequest = {
    userId: string;
    transactionItems: TransactionItemModel[];
}

export function toTransactionResponse(transaction: TransactionModel): TransactionResponse {
    return {
        transactionId: transaction.transactionId,
        status: transaction.status,
        date: transaction.date,
        userId: transaction.userId,
        transactionItems: transaction.transactionItem.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            itemBuyPrice: item.itemBuyPrice
        }))
    }
}