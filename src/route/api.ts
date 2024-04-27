import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { UserController } from '../controller/user-controller';
import { CategoryController } from '../controller/category-controller';

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)

// Category API
apiRouter.get("/api/categories", CategoryController.getAll)
apiRouter.post("/api/categories", CategoryController.create)
apiRouter.get("/api/categories/:categoryId", CategoryController.getById)
apiRouter.patch("/api/categories/:categoryId", CategoryController.update)
apiRouter.delete("/api/categories/:categoryId", CategoryController.delete)
