import * as express from "express";
const router = express.Router();
import {
  admin_login_controller,
  admin_signup_controller,
  get_admin_users_controller,
  getUser,
  login,
  // signup,
  get_all_users_controller,
  create_user_controller,
  reset_password_controller,
} from "../controllers/auth.controller.js";
import {
  admin_role_middleware,
  is_logged_in,
  is_admin_logged_in,
} from "../middlewares/authMiddleware.js";

// router.post("/signup", signup);
router.post("/login", login);
router.get("/user", is_logged_in, getUser);
router.post("/admin/signup", admin_signup_controller);
router.post("/admin/login", admin_login_controller);
router.post("/reset-password", reset_password_controller);
router.use(is_admin_logged_in, admin_role_middleware(true));
router.get("/admin/user", get_admin_users_controller);
router.get("/admin/users", get_all_users_controller);
router.post("/admin/create-user", create_user_controller);
export default router;
