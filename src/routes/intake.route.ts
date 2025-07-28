import { Router } from "express";
import {
  createIntakeForm_controller,
  getIntakeForms_controller,
  completeIntakeForm_controller,
} from "../controllers/intakeForm.controller.js";

const router = Router();

router.post("/intake-forms", createIntakeForm_controller);
router.get("/intake-forms", getIntakeForms_controller);
router.put("/intake-forms/:id/complete", completeIntakeForm_controller);

export default router;
