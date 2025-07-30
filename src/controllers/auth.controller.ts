import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { Request, Response } from "express";
import { Types } from "mongoose";
import {
  signupSchema,
  loginSchema,
  admin_signup_schema,
  admin_login_schema,
} from "../validations/user.validation.js";
import { storage } from "../storage.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const userData = signupSchema.parse(req.body);

    const existingUser = await storage.getUserByEmail(userData.email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(userData.password, 12);

    const user = await storage.createUser({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.dateOfBirth,
      phoneNumber: userData.phoneNumber,
      passwordHash,
      profileImageUrl: null,
      isAdmin: false,
    });
    const token = generateToken(res, user._id as Types.ObjectId);

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(400).json({ message: "Invalid signup data" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await storage.getUserByEmail(email);
    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(res, user._id as Types.ObjectId);

    return res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(400).json({ message: "Invalid login data" });
  }
};
export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getUser = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(res.locals.user._id);
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get user" });
  }
};

export const admin_signup_controller = async (req: Request, res: Response) => {
  try {
    const userData = admin_signup_schema.parse(req.body);
    const existingUser = await storage.getUserByEmail(userData.email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const passwordHash = await bcrypt.hash(userData.password, 12);
    const user = await storage.createUser({
      username: userData.username,
      email: userData.email,
      fullName: userData.fullName,
      passwordHash,
      profileImageUrl: null,
      isAdmin: true,
    });

    const token = generateToken(res, user._id as Types.ObjectId);
    return res.status(201).json({
      status: "success",
      message: "Account created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log("Admin signup error:", error);
    return res.status(400).json({ message: "Invalid signup data" });
  }
};

export const admin_login_controller = async (req: Request, res: Response) => {
  try {
    const { username, password } = admin_login_schema.parse(req.body);
    const user = await storage.getUserByUsername(username);
    if (!user || !user.passwordHash || !user.isAdmin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = generateToken(res, user._id as Types.ObjectId);
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.log("Admin login error:", error);
    return res.status(400).json({ message: "Invalid login data" });
  }
};

export const get_admin_users_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await storage.getUserByUsername(res.locals.user.username);
    if (!user || !user.isAdmin) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Get admin users error:", error);
    return res.status(500).json({ message: "Failed to get admin users" });
  }
};
