import { Request, Response, NextFunction } from "express";
import { SessionService } from "../services/session.service.js";

export const is_logged_in = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await SessionService.validateSessionAndGetUser(req);
    if (!user) {
      return res.status(401).json({ 
        error: "unauthorized",
        message: "Authentication required. Please log in.",
        code: "SESSION_EXPIRED"
      });
    }
    
    res.locals.user = user;
    next();
  } catch (error) {
    console.error('Session validation error:', error);
    return res.status(401).json({ 
      error: "unauthorized",
      message: "Authentication failed.",
      code: "SESSION_ERROR"
    });
  }
};

export const is_admin_logged_in = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await SessionService.validateSessionAndGetUser(req);
    if (!user) {
      return res.status(401).json({ 
        error: "unauthorized",
        message: "Authentication required. Please log in.",
        code: "SESSION_EXPIRED"
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ 
        error: "forbidden",
        message: "Admin access required.",
        code: "INSUFFICIENT_PERMISSIONS"
      });
    }
    
    res.locals.admin_user = user;
    next();
  } catch (error) {
    console.error('Admin session validation error:', error);
    return res.status(401).json({ 
      error: "unauthorized",
      message: "Authentication failed.",
      code: "SESSION_ERROR"
    });
  }
};

export const admin_role_middleware = (isAdmin: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.admin_user;
    if (user?.role !== 'admin') {
      return res.status(403).json({ 
        error: "forbidden",
        message: "Insufficient permissions.",
        code: "INSUFFICIENT_PERMISSIONS"
      });
    }
    next();
  };
};
