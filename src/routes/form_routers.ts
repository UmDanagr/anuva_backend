import { Router } from "express";
import {
  createAdditionalSymptomsForm_controller,
  createInjuryForm_controller,
  createPatientInfoForm_controller,
  createSymptomChecklistForm_controller,
  headachForm_controller,
  bodyPainForm_controller,
  sleepDisturbanceForm_controller,
} from "../controllers/forms.controller.js";

const router = Router();

router.post("/patient-info-form", createPatientInfoForm_controller);
router.post("/injury-form", createInjuryForm_controller);
router.post("/symptom-checklist", createSymptomChecklistForm_controller);
router.post("/additional-symptoms", createAdditionalSymptomsForm_controller);
router.post("/headache-form", headachForm_controller);
router.post("/sleep-disturbance-form", sleepDisturbanceForm_controller);
router.post("/body-pain-form", bodyPainForm_controller);

export default router;
