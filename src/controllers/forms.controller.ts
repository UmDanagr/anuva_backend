import { Request, Response } from "express";
import { storage } from "../storage.js";
import patientInfoFormModel from "../modules/patient_info_form.js";
import userModel from "../modules/user.model.js";
import injuryModel from "../modules/injury.model.js";
import {
  createAdditionalSymptomsFormSchema,
  createInjuryFormSchema,
  createPatientInfoFormSchema,
  createSymptomChecklistSchema,
} from "../validations/form.validations.js";
import symptom_checklistModel from "../modules/symptom_checklist.model.js";
import additionalSymptomsModel from "../modules/additional.symptoms.model.js";

export const createPatientInfoForm_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;

    const existform = await userModel.findById(userId);
    if (existform?.isPatientInfoFormCompleted) {
      return res.status(400).json({
        status: false,
        message: "Patient info form already exists",
      });
    }

    const patientInfoFormData = createPatientInfoFormSchema.parse(req.body);

    const patientInfoForm = new patientInfoFormModel({
      ...patientInfoFormData,
      userId,
      patientId: res.locals.user.patientId,
      adminId: res.locals.user.adminId,
    });

    await patientInfoForm.save();
    patientInfoForm.decryptFieldsSync();

    await storage.updateUser(userId, {
      isPatientInfoFormCompleted: true,
    });
    return res.status(200).json({
      status: true,
      message: "Patient info form created successfully...🎉",
      patientInfoForm,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: "Something went wrong...🚨",
      validationError: error?.errors,
      error: error,
    });
  }
};

export const createInjuryForm_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;
    const existform = await userModel.findById(userId);
    if (existform?.isInjuryFormCompleted) {
      return res.status(400).json({
        status: false,
        message: "Injury form already exists",
      });
    }
    const injuryFormData = createInjuryFormSchema.parse(req.body);

    const injuryId = Math.floor(100000 + Math.random() * 900000 + 1);
    const injuryForm = new injuryModel({
      ...injuryFormData,
      userId,
      patientId: res.locals.user.patientId,
      injuryId,
      adminId: res.locals.user.adminId,
    });

    await injuryForm.save();
    injuryForm.decryptFieldsSync();

    await storage.updateUser(userId, {
      isInjuryFormCompleted: true,
      injuryId: injuryId.toString(),
    });
    return res.status(200).json({
      status: true,
      message: "Injury form created successfully...🎉",
      injuryForm,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: "Something went wrong...🚨",
      validationError: error?.errors,
      error: error,
    });
  }
};

export const createSymptomChecklistForm_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = createSymptomChecklistSchema.parse(req.body);

    const existform = await userModel.findById(res.locals.user._id);
    if (existform?.isSymptomChecklistFormCompleted) {
      return res.status(400).json({
        status: false,
        message: "Symptom checklist form already exists",
      });
    }

    const userId = res.locals.user._id;
    const adminId = res.locals.user.adminId;
    const symptomChecklistId = Math.floor(100000 + Math.random() * 900000 + 1);
    const patientId = res.locals.user.patientId;
    const injuryId = res.locals.user.injuryId;

    const symptomFields = [
      "headache",
      "pressureInHead",
      "neckPain",
      "troubleFallingAsleep",
      "drowsiness",
      "nauseaOrVomiting",
      "fatigueOrLowEnergy",
      "dizziness",
      "blurredVision",
      "balanceProblems",
      "sensitivityToLight",
      "sensitivityToNoise",
      "feelingSlowedDown",
      "feelingInAFog",
      "dontFeelRight",
      "difficultyConcentrating",
      "difficultyRemembering",
      "confusion",
      "moreEmotional",
      "irritability",
      "sadnessOrDepression",
      "nervousOrAnxious",
    ];

    let totalSymptoms = 0;
    let symptomSeverityScore = 0;

    symptomFields.forEach((field) => {
      const value = validatedData[
        field as keyof typeof validatedData
      ] as number;
      if (value && value > 0) {
        totalSymptoms++;
        symptomSeverityScore += value;
      }
    });

    const symptomChecklistData = {
      symptomChecklistId,
      patientId,
      injuryId,
      userId,
      adminId,
      ...validatedData,
      totalSymptoms,
      symptomSeverityScore,
    };

    const symptomChecklist = new symptom_checklistModel(symptomChecklistData);
    await symptomChecklist.save();
    symptomChecklist.decryptFieldsSync();

    await storage.updateUser(userId, {
      isSymptomChecklistFormCompleted: true,
    });

    return res.status(201).send({
      status: true,
      message: "Symptom checklist created successfully...🎉",
      symptomChecklist,
    });
  } catch (error: any) {
    return res.status(400).send({
      status: false,
      message: "Something went wrong...🚨",
      validationError: error?.errors,
      error: error,
    });
  }
};

export const createAdditionalSymptomsForm_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = createAdditionalSymptomsFormSchema.parse(req.body);

    const existform = await userModel.findById(res.locals.user._id);
    if (existform?.isAdditionalSymptomFormCompleted) {
      return res.status(400).json({
        status: false,
        message: "Additional symptoms form already exists",
      });
    }

    const userId = res.locals.user._id;
    const adminId = res.locals.user.adminId;
    const additionalSymptomsId = Math.floor(
      100000 + Math.random() * 900000 + 1
    );
    const patientId = res.locals.user.patientId;
    const injuryId = res.locals.user.injuryId;

    const additionalSymptomsFields = [
      "generalSomatic",
      "painLocation",
      "painInOtherParts",
      "problemsWithSleeping",
      "primaryNeurologicalSymptoms",
      "gaitOrBalanceProblems",
      "visionLossOrChange",
      "hearingLossOrChange",
      "lossOfSmellOrTaste",
      "speechChanges",
      "weakness",
      "tremors",
      "bowelOrBladderDisturbances",
      "sexualDysfunction",
      "difficultyPlanningAndOrganizing",
      "difficultyAnticipatingConsequences",
      "wordFindingDifficulties",
      "difficultyUnderstandingConversations",
      "lostInFamiliarEnvironment",
      "lossOfAppetite",
      "suicidalOrHomicidalThoughts",
      "verballyOrPhysicallyAggressive",
      "personalityChanges",
      "disInhibition",
      "avoidanceBehaviors",
      "intrusiveDistressingThoughts",
      "repetitiveMotorActivity",
      "worseWithPhysicalActivity",
      "worseWithMentalActivity",
    ];

    let totalSymptoms = 0;
    let symptomSeverityScore = 0;

    additionalSymptomsFields.forEach((field) => {
      const value = validatedData[
        field as keyof typeof validatedData
      ] as number;
      if (value && value > 0) {
        totalSymptoms++;
        symptomSeverityScore += value;
      }
    });

    const additionalSymptomsData = {
      additionalSymptomsId,
      patientId,
      injuryId,
      userId,
      adminId,
      ...validatedData,
      totalSymptoms,
      symptomSeverityScore,
    };

    const additionalSymptoms = new additionalSymptomsModel(
      additionalSymptomsData
    );
    await additionalSymptoms.save();
    additionalSymptoms.decryptFieldsSync();

    await storage.updateUser(userId, {
      isAdditionalSymptomFormCompleted: true,
    });

    return res.status(201).send({
      status: true,
      message: "Additional symptoms form created successfully...🎉",
      additionalSymptoms,
    });
  } catch (error: any) {
    return res.status(400).send({
      status: false,
      message: "Something went wrong...🚨",
      validationError: error?.errors,
      error: error,
    });
  }
};
