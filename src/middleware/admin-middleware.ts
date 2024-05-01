import { NextFunction, Response } from "express";
import prismaClient from "../application/database";
import { UserRequest } from "../type/user-request";

export const adminMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const tokenHeader = req.get('Authorization');

    if (tokenHeader) {
        const token = tokenHeader.replace('Bearer ', '');
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            },
            include: {
                balance: true
            }
        })
        if (user && user.role === 'admin') {
            req.user = user;
            next();
            return;
        }
    }

    res.status(401).json({
        statusCode: 401,
        success: false,
        message: 'Unauthorized'
    }).end()
}