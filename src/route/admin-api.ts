import express from 'express';
import { TransactionController } from '../controller/transaction-controller';
import { adminMiddleware } from '../middleware/admin-middleware';
import { CategoryController } from '../controller/category-controller';
import { ProductController } from '../controller/product-controller';

export const adminRouter = express.Router();
adminRouter.use(adminMiddleware);

// Category API
adminRouter.post("/api/categories", CategoryController.create)
adminRouter.put("/api/categories/:categoryId", CategoryController.update)
adminRouter.delete("/api/categories/:categoryId", CategoryController.delete)

// Product API

adminRouter.post("/api/products", ProductController.create)
adminRouter.put("/api/products/:productId", ProductController.update)
adminRouter.delete("/api/products/:productId", ProductController.delete)

// Transaction API
adminRouter.post("/api/transactions/:userId", TransactionController.create)
adminRouter.delete("/api/transactions/:transactionId", TransactionController.delete)
adminRouter.get("/api/transactions/:transactionId", TransactionController.getTransactionById)
adminRouter.get("/api/transactions/user/:userId", TransactionController.getTransactionByUserId)