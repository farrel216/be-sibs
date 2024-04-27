import { User } from "@prisma/client";

export type UserResponse = {
    username: string;
    role: "admin" | "member";
    name: string;
    balance: number;
    token?: string;
}

export type CreateUserRequest = {
    username: string;
    password: string;
    name: string;
    role?: "admin" | "member";
}

export type LoginUserRequest = {
    username: string;
    password: string;
}

export type UpdateUserRequest = {
    password?: string;
    name?: string;
    role?: "admin" | "member";
}

export function toUserResponse(user: User): UserResponse {
    return {
        username: user.username,
        role: user.role,
        name: user.name,
        balance: user.balance
    }
}