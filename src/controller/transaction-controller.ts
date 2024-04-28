import { NextFunction, Request, Response } from "express";
import { CreateTransactionRequest } from "../model/transaction-model";
import { TransactionService } from "../service/transaction-service";

export class TransactionController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateTransactionRequest = {
                userId: req.params.userId,
                transactionItems: req.body.transactionItems
            };
            const response = await TransactionService.create(request);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Transaction created successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
}