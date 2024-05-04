import express from 'express';
import { UserController } from '../controller/user-controller';
export const publicRouter = express.Router();
publicRouter.get("/api", (req, res) => {
    res.send("Hello World Testing Gnti!");
})
publicRouter.post("/api/auth/register", UserController.register);
publicRouter.post("/api/auth/login", UserController.login);