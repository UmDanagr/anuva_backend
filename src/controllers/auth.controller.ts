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
      return res.status(400).json({
        status: false,
        message: "User with this email already exists",
      });
    }

    const password = await bcrypt.hash(userData.password, 12);

    const user = await storage.createUser({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.dateOfBirth,
      phoneNumber: userData.phoneNumber,
      password,
      profileImageUrl: null,
    });
    const token = generateToken(res, user._id as Types.ObjectId);

    return res.status(201).json({
      status: "success",
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
    return res.status(400).json({
      status: false,
      message: "Invalid signup data",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await storage.getUserByEmail(email);
    if (!user || !user.password) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(res, user._id as Types.ObjectId);

    return res.status(200).json({
      status: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(400).json({
      status: false,
      message: "Invalid login data",
    });
  }
};
export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    expires: new Date(0),
  });
  res.status(200).json({
    status: true,
    message: "Logged out successfully",
  });
};

export const getUser = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user) {
      return res.status(401).json({
        status: false,
        message: "Not authenticated",
      });
    }

    const user = await storage.getUser(res.locals.user._id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Not authenticated",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get user",
    });
  }
};

export const admin_signup_controller = async (req: Request, res: Response) => {
  try {
    const userData = admin_signup_schema.parse(req.body);
    const existingUser = await storage.getAdminUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User with this email already exists",
      });
    }
    const password = await bcrypt.hash(userData.password, 12);
    const user = await storage.createAdminUser({
      userName: userData.userName,
      email: userData.email,
      fullName: userData.fullName,
      phoneNumber: userData.phoneNumber,
      password,
      profileImageUrl: null,
    });

    const token = generateToken(res, user._id as Types.ObjectId);
    return res.status(201).json({
      status: true,
      message: "Account created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log("Admin signup error:", error);
    return res.status(400).json({
      status: false,
      message: "Invalid signup data",
    });
  }
};

export const admin_login_controller = async (req: Request, res: Response) => {
  try {
    const { userName, password } = admin_login_schema.parse(req.body);
    const user = await storage.getAdminUserByUsername(userName);
    if (!user || !user.password) {
      return res.status(401).json({
        status: false,
        message: "Invalid username or password",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: false,
        message: "Invalid username or password",
      });
    }
    const token = generateToken(res, user._id as Types.ObjectId);
    return res.status(200).json({
      status: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.log("Admin login error:", error);
    return res.status(400).json({
      status: false,
      message: "Invalid login data",
    });
  }
};

export const get_admin_users_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await storage.getAdminUserByUsername(
      res.locals.user.userName as string
    );
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "No users found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Get admin users error:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to get admin users",
    });
  }
};

export const get_all_users_controller = async (req: Request, res: Response) => {
  try {
    const users = await storage.getUsers();
    return res.status(200).json({
      status: true,
      message: "User fetched successfully",
      users,
    });
  } catch (error) {
    console.log("Get all users error:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to get all users",
    });
  }
};

export const create_user_controller = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await storage.getUserByEmail(userData.email);
    if (user) {
      return res.status(400).json({
        status: false,
        message: "User with this email already exists",
      });
    }
    const password = await bcrypt.hash(userData.password, 12);
    const newUser = await storage.createUser({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.dateOfBirth,
      phoneNumber: userData.phoneNumber,
      password,
      profileImageUrl: null,
      insuranceProvider: userData.insuranceProvider,
    });

    return res.status(201).json({
      status: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Create user error:", error);
    return res.status(400).json({
      status: false,
      message: "Invalid user data",
    });
  }
};
