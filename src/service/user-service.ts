import { User } from "@prisma/client";
import prismaClient from "../application/database";
import { ResponseError } from "../error/response-error";
import { AccountModel, AccountResponse, CreateUserRequest, LoginUserRequest, toAccountResponse, toUserResponse, UpdateUserRequest, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const uniqueUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if (uniqueUsername > 0) {
            throw new ResponseError(400, "Username already exists")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)
        let user = await prismaClient.user.create({
            data: {
                ...registerRequest,
                balance: { create: { balance: 0 } }
            }
        })
        return toUserResponse(user)
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        })

        if (!user) {
            throw new ResponseError(400, "Username or password is incorrect")
        }

        const passwordMatch = await bcrypt.compare(loginRequest.password, user.password)

        if (!passwordMatch) {
            throw new ResponseError(400, "Username or password is incorrect")
        }

        const jwtSecret = process.env.JWT_SECRET || "secret"
        const token = jwt.sign({ userId: user.userId, role: user.role }, jwtSecret, { expiresIn: '1d' })

        user = await prismaClient.user.update({
            where: {
                userId: user.userId
            },
            data: {
                token
            }
        })

        const response = toUserResponse(user)
        response.token = token;
        console.log(response)
        return response
    }

    static async get(user: AccountModel): Promise<AccountResponse> {
        return toAccountResponse(user)
    }

    static async getById(userId: string): Promise<UserResponse> {
        const user = await prismaClient.user.findUnique({
            where: {
                userId
            }
        })

        if (!user) {
            throw new ResponseError(404, "User not found")
        }

        return toUserResponse(user)
    }

    static async getAll() {
        const users = await prismaClient.user.findMany({
            include: {
                balance: true
            }
        })

        if (!users) {
            throw new ResponseError(400, "No users found")
        }

        return users.map(user => {
            return {
                userId: user.userId,
                username: user.username,
                balance: user.balance?.balance,
                name: user.name,
                role: user.role
            }
        })
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);
        if (updateRequest.name) {
            user.name = updateRequest.name;
        }
        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10);
        }

        const result = await prismaClient.user.update({
            where: {
                userId: user.userId
            },
            data: {
                name: user.name,
                password: user.password
            }
        })

        return toUserResponse(result)
    }

    static async updateById(userId: string, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        let user = await prismaClient.user.findUnique({
            where: {
                userId
            }
        })

        if (!user) {
            throw new ResponseError(404, "User not found")
        }

        if (updateRequest.name) {
            user.name = updateRequest.name;
        }
        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10);
        }

        const result = await prismaClient.user.update({
            where: {
                userId
            },
            data: {
                name: user.name,
                password: user.password
            }
        })

        return toUserResponse(result)
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                userId: user.userId
            },
            data: {
                token: null
            }
        })

        return toUserResponse(result)
    }
}