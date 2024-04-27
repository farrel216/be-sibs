import { User } from "@prisma/client";
import prismaClient from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, UpdateUserRequest, UserResponse } from "../model/user-model";
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
        const user = await prismaClient.user.create({
            data: registerRequest
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

        const token = jwt.sign({ userId: user.userId, role: user.role }, "rahasia", { expiresIn: '1h' })

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

        return response
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        if (updateRequest.name) {
            user.name = updateRequest.name;
        }
        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10);
        }
        if (updateRequest.role) {
            user.role = updateRequest.role;
        }

        const result = await prismaClient.user.update({
            where: {
                userId: user.userId
            },
            data: user
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