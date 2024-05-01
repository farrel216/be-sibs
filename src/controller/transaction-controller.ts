import { NextFunction, Request, Response } from "express";
import { CreateTransactionRequest } from "../model/transaction-model";
import { TransactionService } from "../service/transaction-service";
import { UserRequest } from "../type/user-request";

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

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const transactionId = req.params.transactionId;
            await TransactionService.delete(transactionId);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Transaction deleted successfully"
            });
        }
        catch (error) {
            next(error);
        }
    }

    static async getCurrentUserTransaction(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.userId;
            const response = await TransactionService.getTransactionByUserId(userId);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Retrieve transaction data successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }

    static async getTransactionByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const response = await TransactionService.getTransactionByUserId(userId);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Retrieve transaction data successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }

    static async getTransactionById(req: Request, res: Response, next: NextFunction) {
        try {
            const transactionId = req.params.transactionId;
            const response = await TransactionService.getTransactionById(transactionId);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Retrieve transaction data successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
}