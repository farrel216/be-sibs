import { Category } from "@prisma/client";
import prismaClient from "../application/database";
import { ResponseError } from "../error/response-error";
import { CategoryResponse, UpdateCategoryRequest, toCategoryResponse, CreateCategoryRequest } from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";
import { Validation } from "../validation/validation";

export class CategoryService {
    static async create(request: CreateCategoryRequest): Promise<CategoryResponse> {
        const categoryRequest = Validation.validate(CategoryValidation.CREATE, request);

        const uniqueCategory = await prismaClient.category.count({
            where: {
                name: categoryRequest.name
            }
        })

        if (uniqueCategory > 0) {
            throw new ResponseError(400, "Category already exists");
        }

        const category = await prismaClient.category.create({
            data: categoryRequest
        });
        return toCategoryResponse(category);
    }

    static async getAll(): Promise<CategoryResponse[]> {
        const categories = await prismaClient.category.findMany();
        return categories.map(category => toCategoryResponse(category));
    }


    static async checkCategoryExist(categoryId: string): Promise<Category> {
        const category = await prismaClient.category.findUnique({
            where: {
                categoryId
            }
        });
        if (!category) {
            throw new ResponseError(404, "Category not found");
        }
        return category;;
    }

    static async getById(categoryId: string): Promise<CategoryResponse> {
        const category = await this.checkCategoryExist(categoryId);
        return toCategoryResponse(category);
    }

    static async update(request: UpdateCategoryRequest): Promise<CategoryResponse> {
        const categoryRequest = Validation.validate(CategoryValidation.UPDATE, request);
        await this.checkCategoryExist(categoryRequest.categoryId);
        const category = await prismaClient.category.update({
            where: {
                categoryId: categoryRequest.categoryId
            },
            data: categoryRequest
        });
        return toCategoryResponse(category);
    }

    static async delete(categoryId: string): Promise<CategoryResponse> {
        await this.checkCategoryExist(categoryId);
        const category = await prismaClient.category.delete({
            where: {
                categoryId
            }
        });

        return toCategoryResponse(category);
    }

}