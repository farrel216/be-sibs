import prismaClient from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { CreateProductRequest, ProductResponse, SearchProductRequest, toProductResponse, UpdateProductRequest } from "../model/product-model";
import { ProductValidation } from "../validation/product-validation";
import { Validation } from "../validation/validation";
import { CategoryService } from "./category-service";

export class ProductService {
    static async create(request: CreateProductRequest): Promise<ProductResponse> {
        const createRequest = Validation.validate(ProductValidation.CREATE, request);
        const uniqueProduct = await prismaClient.product.count({
            where: {
                name: createRequest.name
            }
        })

        if (uniqueProduct > 0) {
            throw new ResponseError(400, "Product already exists");
        }

        await CategoryService.checkCategoryExist(createRequest.categoryId);

        const product = await prismaClient.product.create({
            data: createRequest,
            include: {
                category: true
            }
        });
        return toProductResponse(product);
    }

    static async search(request: SearchProductRequest): Promise<Pageable<ProductResponse>> {
        const searchRequest = Validation.validate(ProductValidation.SEARCH, request);
        const products = await prismaClient.product.findMany({
            where: {
                name: {
                    contains: searchRequest.name,
                    mode: "insensitive"
                },
                categoryId: searchRequest.categoryId
            },
            include: {
                category: true
            },
            orderBy: {
                name: "asc",
            },
            skip: (searchRequest.page - 1) * searchRequest.size,
            take: searchRequest.size
        });

        const total = await prismaClient.product.count({
            where: {
                name: {
                    contains: searchRequest.name
                }
            }
        });

        const data = products.map(product => toProductResponse(product));
        return {
            data,
            paging: {
                currentPage: searchRequest.page,
                totalPage: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }

    static async checkProductExist(productId: string) {
        const product = await prismaClient.product.findUnique({
            where: {
                productId
            }
        });

        if (!product) {
            throw new ResponseError(400, "Product not found");
        }

        return product;
    }

    static async update(request: UpdateProductRequest): Promise<ProductResponse> {
        const updateRequest = Validation.validate(ProductValidation.UPDATE, request);
        await this.checkProductExist(updateRequest.productId);
        await CategoryService.checkCategoryExist(updateRequest.categoryId);

        const product = await prismaClient.product.update({
            where: {
                productId: updateRequest.productId
            },
            data: updateRequest,
            include: {
                category: true
            }
        });
        return toProductResponse(product);
    }
    static async delete(productId: string): Promise<ProductResponse> {
        await this.checkProductExist(productId);
        const product = await prismaClient.product.delete({
            where: {
                productId
            },
            include: {
                category: true
            }
        });
        return toProductResponse(product);
    }
}