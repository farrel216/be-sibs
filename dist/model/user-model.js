"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
function toUserResponse(user) {
    return {
        username: user.username,
        role: user.role,
        name: user.name,
        balance: user.balance
    };
}
exports.toUserResponse = toUserResponse;
