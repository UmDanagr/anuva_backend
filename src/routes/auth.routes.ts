import * as express from "express";
const router = express.Router();
import {
  admin_login_controller,
  admin_signup_controller,
  get_admin_users_controller,
  getUser,
  login,
  signup,
} from "../controllers/auth.controller.js";
import {
  admin_role_middleware,
  is_logged_in,
} from "../middlewares/authMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", is_logged_in, getUser);
router.post("/admin/signup", admin_signup_controller);
router.post("/admin/login", admin_login_controller);
router.get(
  "/admin/user",
  is_logged_in,
  admin_role_middleware(true),
  get_admin_users_controller
);
export default router;
