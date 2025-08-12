import { Router } from "express";
import {
  createAdditionalSymptomsForm_controller,
  createInjuryForm_controller,
  createPatientInfoForm_controller,
  createSymptomChecklistForm_controller,
  headacheForm_controller,
  bodyPainForm_controller,
  sleepDisturbanceForm_controller,
  createPreviousHeadInjuriesForm,
  createConcussionDetailsForm_controller,
  createDevelopmentalHistoryForm_controller,
  createSurgicalHistoryForm_controller,
  createCurrentMedicationsForm_controller,
} from "../controllers/forms.controller.js";

const router = Router();

router.post("/patient-info-form", createPatientInfoForm_controller);
router.post("/injury-form", createInjuryForm_controller);
router.post("/symptom-checklist", createSymptomChecklistForm_controller);
router.post("/additional-symptoms", createAdditionalSymptomsForm_controller);
router.post("/headache-form", headacheForm_controller);
router.post("/sleep-disturbance-form", sleepDisturbanceForm_controller);
router.post("/body-pain-form", bodyPainForm_controller);
router.post("/previous-head-injuries-form", createPreviousHeadInjuriesForm);
router.post("/concussion-details-form", createConcussionDetailsForm_controller);
router.post("/developmental-history-form", createDevelopmentalHistoryForm_controller);
router.post("/surgical-history-form", createSurgicalHistoryForm_controller);
router.post("/current-medications-form", createCurrentMedicationsForm_controller);

export default router;
