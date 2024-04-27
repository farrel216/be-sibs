import { NextFunction, Request, Response } from "express";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../model/category-model";
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
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = req.params.categoryId;
            const response = await CategoryService.getById(categoryId);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Retrieve category data successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UpdateCategoryRequest = req.body as UpdateCategoryRequest;
            request.categoryId = req.params.categoryId;
            const response = await CategoryService.update(request);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Update category successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = req.params.categoryId;
            await CategoryService.delete(categoryId);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Delete category successfully",
                data: "ok"
            });
        }
        catch (error) {
            next(error);
        }
    }
}