export type ProductResponse = {
    id: number;
    name: string;
    buyPrice: number;
    sellPrice: number;
    category: string;
}

export type CreateProductRequest = {
    name: string;
    buyPrice: number;
    sellPrice: number;
    categoryId: number;
}