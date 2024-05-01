import { Category, Product } from "@prisma/client";

export type ProductModel = {
    productId: string;
    name: string;
    buyPrice: number;
    sellPrice: number;
    category: Category;
}

export type ProductResponse = {
    productId: string;
    name: string;
    buyPrice: number;
    sellPrice: number;
    category: Category;
}

export type CreateProductRequest = {
    name: string;
    buyPrice: number;
    sellPrice: number;
    categoryId: string;
}

export type UpdateProductRequest = {
    productId: string;
    name: string;
    buyPrice: number;
    sellPrice: number;
    categoryId: string;
}

export type SearchProductRequest = {
    name?: string;
    categoryId?: string;
    page: number;
    size: number;
}

export function toProductResponse(product: ProductModel): ProductResponse {
    return {
        productId: product.productId,
        name: product.name,
        buyPrice: product.buyPrice,
        sellPrice: product.sellPrice,
        category: product.category
    }
}