import { Balance, User } from "@prisma/client";

export type AccountModel = {
    username: string;
    balance?: Balance;
    name: string;
    role: "admin" | "member";
}

export type UserResponse = {
    username: string;
    role: "admin" | "member";
    name: string;
    token?: string;
}

export type AccountResponse = {
    username: string;
    balance?: number;
    name: string;
    role: "admin" | "member";
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
}

export function toUserResponse(user: User): UserResponse {
    return {
        username: user.username,
        role: user.role,
        name: user.name
    }
}

export function toAccountResponse(account: AccountModel): AccountResponse {
    return {
        username: account.username,
        balance: account.balance?.balance,
        name: account.name,
        role: account.role
    }
}