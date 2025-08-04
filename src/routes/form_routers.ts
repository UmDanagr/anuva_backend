import { Router } from "express";
import { createPatientInfoForm_controller } from "../controllers/forms.controller.js";

const router = Router();

router.post("/patient-info-form", createPatientInfoForm_controller);

export default router;
