"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = exports.verifyAuth = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_schema_1 = require("../validation/user.schema");
const auth_1 = require("../config/auth");
const verifyAuth = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated",
            });
        }
        const user = await user_model_1.default.findById(req.user.id).select("-password -otp");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User verified",
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Auth verification failed",
        });
    }
};
exports.verifyAuth = verifyAuth;
const signup = async (req, res) => {
    try {
        const validated = user_schema_1.signupSchema.safeParse(req.body);
        if (!validated.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validated.error.format(),
            });
        }
        const { name, email, password } = validated.data;
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const user = await user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
            otp,
        });
        return res.status(201).json({
            success: true,
            message: "Signup successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Signup failed",
        });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const validated = user_schema_1.loginSchema.safeParse(req.body);
        if (!validated.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validated.error.format(),
            });
        }
        const { email, password } = validated.data;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), email: user.email }, auth_1.JWT_SECRET, { expiresIn: auth_1.JWT_EXPIRES_IN });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gems: user.gems,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Login failed",
        });
    }
};
exports.login = login;
const logout = async (_req, res) => {
    try {
        // it is handle by frontend
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Logout failed",
        });
    }
};
exports.logout = logout;
