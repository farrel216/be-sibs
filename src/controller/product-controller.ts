import { NextFunction, Request, Response } from "express";
import { CreateProductRequest, SearchProductRequest, UpdateProductRequest } from "../model/product-model";
import { ProductService } from "../service/product-service";

export class ProductController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateProductRequest = req.body as CreateProductRequest;
            const response = await ProductService.create(request);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Product created successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const request: SearchProductRequest = {
                name: req.query.name as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
                categoryId: req.query.categoryId as string
            };
            const response = await ProductService.search(request);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Search category successfully",
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UpdateProductRequest = req.body as UpdateProductRequest;
            request.productId = req.params.productId;
            const response = await ProductService.update(request);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Update product successfully",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId;
            await ProductService.delete(productId);
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Delete product successfully",
                data: "ok"
            });
        } catch (error) {
            next(error);
        }
    }
}