import { NextFunction, Request, Response } from "express";
import { CreateCategoryRequest } from "../model/category-model";
import { CategoryService } from "../service/category-service";

export class CategoryController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
            const response = await CategoryService.create(request);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Category created successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await CategoryService.getAll();
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Retrieve all categories successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
}