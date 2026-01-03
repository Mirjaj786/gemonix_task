"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
exports.JWT_SECRET = JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
exports.JWT_EXPIRES_IN = JWT_EXPIRES_IN;
if (!process.env.JWT_SECRET) {
    console.warn("Warning: process.env.JWT_SECRET is not set — using fallback secret. Set JWT_SECRET in production.");
}
