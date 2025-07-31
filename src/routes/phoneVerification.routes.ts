import express from "express";
import {
  sendVerificationCode,
  verifyCode,
  checkNumberVerification,
} from "../controllers/phoneVerification.controller.js";
import {
  is_logged_in,
  admin_role_middleware,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(is_logged_in, admin_role_middleware(true));
// Send verification code to phone number
router.post("/send-code", sendVerificationCode);

// Verify the code sent to phone number
router.post("/verify-code", verifyCode);

// Check if a phone number is verified
router.get("/check/:phoneNumber", checkNumberVerification);

export default router;
