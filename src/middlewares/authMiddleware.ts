import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../modules/user.model.js";
import adminUserModel, { IAdminUser } from "../modules/admin.users.js";

export const is_logged_in = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "unauthorized" });
    }
    res.locals.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "unauthorized" });
  }
};

export const is_admin_logged_in = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await adminUserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "unauthorized" });
    }
    res.locals.admin_user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "unauthorized" });
  }
};

export const admin_role_middleware = (isAdmin: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.admin_user as IAdminUser;
    if (user?.isAdmin !== isAdmin) {
      return res.status(403).json({ error: "forbidden" });
    }
    next();
  };
};
