import { Request, Response } from 'express';
import User from '../modules/user.model.js';

export interface SessionUser {
  userId: string;
  patientId: string;
  email: string;
  firstName: string;
  lastName: string;
  userRole: 'user' | 'admin';
}

export class SessionService {
  /**
   * Create a new session for a user
   */
  static createSession(req: Request, user: any, token?: string): void {
    // Set session data directly
    req.session.userId = user._id.toString();
    req.session.patientId = user.patientId;
    req.session.email = user.email;
    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
    req.session.userRole = user.role || 'user';
    req.session.isAuthenticated = true;
    req.session.loginTime = Date.now();
    req.session.sessionId = req.sessionID;
    
    // Store JWT token in session if provided
    if (token) {
      req.session.token = token;
    }

    console.log('Session created for user:', {
      email: user.email,
      userId: user._id.toString(),
      sessionID: req.sessionID,
      isAuthenticated: req.session.isAuthenticated,
      hasToken: !!token
    });
  }

  /**
   * Check if session is valid
   */
  static isSessionValid(req: Request): boolean {
    return req.session.isAuthenticated === true;
  }

  /**
   * Get JWT token from session
   */
  static getTokenFromSession(req: Request): string | null {
    return req.session.token || null;
  }

  /**
   * Validate session and get user from database
   */
  static async validateSessionAndGetUser(req: Request): Promise<any> {
    console.log('Session validation - Session data:', {
      isAuthenticated: req.session.isAuthenticated,
      userId: req.session.userId,
      sessionID: req.sessionID,
      hasToken: !!req.session.token
    });

    if (!this.isSessionValid(req)) {
      console.log('Session validation failed - isAuthenticated is not true');
      return null;
    }

    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        console.log('Session validation failed - user not found in database');
        return null;
      }

      console.log('Session validation successful for user:', user.email);
      return user;
    } catch (error) {
      console.error('Error validating session:', error);
      return null;
    }
  }
}
