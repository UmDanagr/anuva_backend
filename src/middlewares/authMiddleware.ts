import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../modules/user.model.js";

export const is_logged_in = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    res.locals.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const admin_role_middleware = (role: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user as IUser;
    if (user?.isAdmin !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};
