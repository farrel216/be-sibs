import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { UserController } from '../controller/user-controller';
import { CategoryController } from '../controller/category-controller';
import { ProductController } from '../controller/product-controller';
import { TransactionController } from '../controller/transaction-controller';

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)

// Category API
apiRouter.get("/api/categories", CategoryController.search)
apiRouter.get("/api/categories/:categoryId", CategoryController.getById)

// Product API
apiRouter.get("/api/products/:productId", ProductController.getById)
apiRouter.get("/api/products", ProductController.search)
apiRouter.get("/api/products/category/:categoryId", ProductController.getByCategoryId)

// Transaction API
apiRouter.get("/api/transactions", TransactionController.getCurrentUserTransaction)


