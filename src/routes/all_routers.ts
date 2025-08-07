import { is_logged_in } from "../middlewares/authMiddleware.js";
import authRoutes from "./auth.routes.js";
import intakeRoutes from "./intake.route.js";
import phoneVerificationRoutes from "./phoneVerification.routes.js";
import { Router } from "express";
import formRoutes from "./form_routers.js";
import adminRouter from "./admin.router.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRouter);
router.use("/phone-verification", phoneVerificationRoutes);
router.use(is_logged_in);
router.use("/intake", intakeRoutes);
router.use("/forms", formRoutes);

export default router;
