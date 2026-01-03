import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { signupSchema, loginSchema } from "../validation/user.schema";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/auth";

export const verifyAuth = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await userModel.findById(req.user.id).select("-password -otp");

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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Auth verification failed",
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const validated = signupSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validated.error.format(),
      });
    }

    const { name, email, password } = validated.data;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = await userModel.create({
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
  } catch (error) {
    return res.status(500).json({
      message: "Signup failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validated = loginSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validated.error.format(),
      });
    }

    const { email, password } = validated.data;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET as jwt.Secret,
      { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
    );

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
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    // it is handle by frontend
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
