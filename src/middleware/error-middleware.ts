import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        res.status(400).json({
            statusCode: 400,
            success: false,
            errors: error,
            message: 'Bad request'
        })
    }
    else if (error instanceof ResponseError) {
        res.status(error.status).json({
            statusCode: error.status,
            success: false,
            errors: error.message,
            message: 'Response error'
        })
    }
    else {
        res.status(500).json({
            statusCode: 500,
            success: false,
            errors: error,
            message: 'Internal server error'
        })
    }
}