import { Request, Response } from "express";
import {
  verifyPhoneNumber,
  checkVerificationCode,
  isNumberVerified,
} from "../services/twilio.js";

// Send verification code to phone number
export const sendVerificationCode = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const result = await verifyPhoneNumber(phoneNumber);

    return res.status(200).json({
      success: true,
      message: "Verification code sent successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Send verification code error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to send verification code",
    });
  }
};

// Verify the code sent to phone number
export const verifyCode = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({
        success: false,
        message: "Phone number and verification code are required",
      });
    }

    const result = await checkVerificationCode(phoneNumber, code);

    if (result.verified) {
      return res.status(200).json({
        success: true,
        message: "Phone number verified successfully",
        verified: true,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
        verified: false,
      });
    }
  } catch (error: any) {
    console.error("Verify code error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to verify code",
    });
  }
};

// Check if a phone number is verified
export const checkNumberVerification = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const isVerified = await isNumberVerified(phoneNumber);

    return res.status(200).json({
      success: true,
      verified: isVerified,
      message: isVerified
        ? "Phone number is verified"
        : "Phone number is not verified",
    });
  } catch (error: any) {
    console.error("Check verification error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to check verification status",
    });
  }
};
