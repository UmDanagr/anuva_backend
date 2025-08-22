import { Router } from "express";
import { get_patient_all_data_controller, get_patients_forms_controller } from "../controllers/admin.controller.js";
import {
  is_admin_logged_in,
  admin_role_middleware,
} from "../middlewares/authMiddleware.js";

const adminRouter = Router();

adminRouter.use(is_admin_logged_in, admin_role_middleware(true));

adminRouter.get("/patients", get_patients_forms_controller);
adminRouter.get("/patients-forms-info/:id", get_patient_all_data_controller);

export default adminRouter;
