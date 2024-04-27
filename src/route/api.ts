import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { UserController } from '../controller/user-controller';
import { CategoryController } from '../controller/category-controller';
import { ProductController } from '../controller/product-controller';

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)

// Category API
apiRouter.get("/api/categories", CategoryController.search)
apiRouter.post("/api/categories", CategoryController.create)
apiRouter.get("/api/categories/:categoryId", CategoryController.getById)
apiRouter.put("/api/categories/:categoryId", CategoryController.update)
apiRouter.delete("/api/categories/:categoryId", CategoryController.delete)

// Product API
apiRouter.get("/api/products", ProductController.search)
apiRouter.post("/api/products", ProductController.create)
