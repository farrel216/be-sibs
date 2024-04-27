import { Category } from "@prisma/client";

export type CategoryResponse = {
    categoryId: string;
    name: string;
}

export type CreateCategoryRequest = {
    name: string;
}

export function toCategoryResponse(category: Category): CategoryResponse {
    return {
        categoryId: category.categoryId,
        name: category.name
    }
}
