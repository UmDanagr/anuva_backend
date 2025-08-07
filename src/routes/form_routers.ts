import { Router } from "express";
import {
  createInjuryForm_controller,
  createPatientInfoForm_controller,
} from "../controllers/forms.controller.js";

const router = Router();

router.post("/patient-info-form", createPatientInfoForm_controller);
router.post("/injury-form", createInjuryForm_controller);

export default router;
