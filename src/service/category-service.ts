import prismaClient from "../application/database";
import { ResponseError } from "../error/response-error";
import { CategoryResponse, CreateCategoryRequest, toCategoryResponse } from "../model/category-model";
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
            data: {
                name: categoryRequest.name
            }
        });
        return toCategoryResponse(category);
    }

    static async getAll(): Promise<CategoryResponse[]> {
        const categories = await prismaClient.category.findMany();
        return categories.map(category => toCategoryResponse(category));
    }

}