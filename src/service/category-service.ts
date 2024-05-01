import { Category } from "@prisma/client";
import prismaClient from "../application/database";
import { ResponseError } from "../error/response-error";
import { CategoryResponse, UpdateCategoryRequest, toCategoryResponse, CreateCategoryRequest, SearchCategoryRequest } from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";
import { Validation } from "../validation/validation";
import { Pageable } from "../model/page";

export class CategoryService {

    static async checkCategoryNotExist(name: string): Promise<boolean> {
        const uniqueCategory = await prismaClient.category.count({
            where: {
                name
            }
        })
        return uniqueCategory == 0;
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

    static async create(request: CreateCategoryRequest): Promise<CategoryResponse> {
        const categoryRequest = Validation.validate(CategoryValidation.CREATE, request);

        const uniqueCategory = await this.checkCategoryNotExist(categoryRequest.name);

        if (!uniqueCategory) {
            throw new ResponseError(400, "Category already exists");
        }

        const category = await prismaClient.category.create({
            data: categoryRequest
        });

        return toCategoryResponse(category);
    }


    static async getById(categoryId: string): Promise<CategoryResponse> {
        const category = await this.checkCategoryExist(categoryId);
        return toCategoryResponse(category);
    }

    static async update(request: UpdateCategoryRequest): Promise<CategoryResponse> {
        const categoryRequest = Validation.validate(CategoryValidation.UPDATE, request);
        await this.checkCategoryExist(categoryRequest.categoryId);
        const uniqueCategory = await this.checkCategoryNotExist(categoryRequest.name);

        if (!uniqueCategory) {
            throw new ResponseError(400, "Category already exists");
        }

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
        const dependentProduct = await prismaClient.product.count({
            where: {
                categoryId
            }
        })
        if (dependentProduct > 0) {
            throw new ResponseError(400, "Category has dependent product");
        }
        const category = await prismaClient.category.delete({
            where: {
                categoryId
            }
        });

        return toCategoryResponse(category);
    }

    static async search(request: SearchCategoryRequest): Promise<Pageable<CategoryResponse>> {
        const searchRequest = Validation.validate(CategoryValidation.SEARCH, request);

        const categories = await prismaClient.category.findMany({
            where: {
                name: {
                    contains: searchRequest.name,
                    mode: "insensitive"
                }
            },
            orderBy: {
                name: "asc",
            },
            skip: (searchRequest.page - 1) * searchRequest.size,
            take: searchRequest.size
        });

        const total = await prismaClient.category.count({
            where: {
                name: {
                    contains: searchRequest.name
                }
            }
        });

        const data = categories.map(category => toCategoryResponse(category));
        return {
            data,
            paging: {
                currentPage: searchRequest.page,
                totalPage: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }
}