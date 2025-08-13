import "express-session";

declare module "express-session" {
  interface SessionData {
    token?: string;
    userId?: string;
    patientId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    isAuthenticated?: boolean;
    loginTime?: number;
    userRole?: 'user' | 'admin';
    sessionId?: string;
  }
}