"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const public_api_1 = require("../route/public-api");
const error_middleware_1 = require("../middleware/error-middleware");
const cors_1 = __importDefault(require("cors"));
exports.server = (0, express_1.default)();
exports.server.use((0, cors_1.default)());
exports.server.use(express_1.default.json());
exports.server.use(express_1.default.urlencoded({ extended: true }));
exports.server.use(public_api_1.publicRouter);
exports.server.use(error_middleware_1.errorMiddleware);
