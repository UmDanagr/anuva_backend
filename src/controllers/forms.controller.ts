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
  createHeadacheFormSchema,
  createSleepDisturbanceFormSchema,
  createBodyPainFormSchema,
  createPreviousHeadInjuriesFormSchema,
  createConcussionDetailsFormSchema,
} from "../validations/form.validations.js";
import symptom_checklistModel from "../modules/symptom_checklist.model.js";
import additionalSymptomsModel from "../modules/additional.symptoms.model.js";
import headacheModel from "../modules/headache.model.js";
import sleepDisturbanceModel from "../modules/sleepDisturbance.model.js";
import bodyPainModel from "../modules/bodyPain.model.js";
import previousHeadInjuriesModel from "../modules/previousHeadInjuries.model.js";
import concussionDetailsModel from "../modules/concussionDetails.model.js";

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

export const headachForm_controller = async (req: Request, res: Response) => {
  try {
    const validatedData = createHeadacheFormSchema.parse(req.body);

    const existform = await userModel.findById(res.locals.user._id);
    if (existform?.isHeadacheFormCompleted) {
      return res.status(400).json({
        status: false,
        message: "Headache form already exists",
      });
    }

    const userId = res.locals.user._id;
    const adminId = res.locals.user.adminId;
    const headacheId = Math.floor(100000 + Math.random() * 900000 + 1);
    const patientId = res.locals.user.patientId;
    const injuryId = res.locals.user.injuryId;

    const headacheData = {
      headacheId,
      patientId,
      injuryId,
      userId,
      adminId,
      ...validatedData,
    };

    const headache = new headacheModel(headacheData);
    await headache.save();
    headache.decryptFieldsSync();

    await storage.updateUser(userId, {
      isHeadacheFormCompleted: true,
    });

    return res.status(201).send({
      status: true,
      message: "Headache form created successfully...🎉",
      headache,
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

export const sleepDisturbanceForm_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = createSleepDisturbanceFormSchema.parse(req.body);

    const existform = await userModel.findById(res.locals.user._id);
    if (existform?.isSleepDisturbanceFormCompleted) {
      return res.status(400).json({
        status: false,
        message: "Sleep disturbance form already exists",
      });
    }

    const userId = res.locals.user._id;
    const adminId = res.locals.user.adminId;
    const sleepDisturbanceId = Math.floor(100000 + Math.random() * 900000 + 1);
    const patientId = res.locals.user.patientId;
    const injuryId = res.locals.user.injuryId;

    const sleepDisturbanceData = {
      sleepDisturbanceId,
      patientId,
      injuryId,
      userId,
      adminId,
      ...validatedData,
    };

    const sleepDisturbance = new sleepDisturbanceModel(sleepDisturbanceData);
    await sleepDisturbance.save();
    sleepDisturbance.decryptFieldsSync();

    await storage.updateUser(userId, {
      isSleepDisturbanceFormCompleted: true,
    });

    return res.status(201).send({
      status: true,
      message: "Sleep disturbance form created successfully...🎉",
      sleepDisturbance,
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

export const bodyPainForm_controller = async (req: Request, res: Response) => {
  try {
    const validatedData = createBodyPainFormSchema.parse(req.body);

    const existform = await userModel.findById(res.locals.user._id);
    if (existform?.isBodyPainFormCompleted) {
      return res.status(400).json({
        status: false,
        message: "Body pain form already exists",
      });
    }

    const userId = res.locals.user._id;
    const adminId = res.locals.user.adminId;
    const bodyPainId = Math.floor(100000 + Math.random() * 900000 + 1);
    const patientId = res.locals.user.patientId;

    const bodyPainData = {
      bodyPainId,
      patientId,
      userId,
      adminId,
      ...validatedData,
    };

    const bodyPain = new bodyPainModel(bodyPainData);
    await bodyPain.save();
    bodyPain.decryptFieldsSync();

    await storage.updateUser(userId, {
      isBodyPainFormCompleted: true,
    });

    return res.status(201).send({
      status: true,
      message: "Body pain form created successfully...🎉",
      bodyPain,
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

export const createPreviousHeadInjuriesForm = async (req: Request, res: Response) => {
  try {
    const validatedData = createPreviousHeadInjuriesFormSchema.parse(req.body);

    const existform = await userModel.findById(res.locals.user._id);
    if (existform?.isPreviousHeadInjuriesFormCompleted) {
      return res.status(400).json({
        status: false,
        message: "Previous head injuries form already exists",
      });
    }

    const userId = res.locals.user._id;
    const adminId = res.locals.user.adminId;
    const previousInjuryID = res.locals.user.injuryId;
    const patientId = res.locals.user.patientId;

    const previousHeadInjuriesData = {
      previousInjuryID,
      patientId,
      userId,
      adminId,
      ...validatedData,
    };

    const previousHeadInjuries = new previousHeadInjuriesModel(previousHeadInjuriesData);
    await previousHeadInjuries.save();
    previousHeadInjuries.decryptFieldsSync();

    await storage.updateUser(userId, {
      isPreviousHeadInjuriesFormCompleted: true,
    });

    return res.status(201).send({
      status: true,
      message: "Previous head injuries form created successfully...🎉",
      previousHeadInjuries,
    });

  } catch (error: any) {
    console.log(error);
    return res.status(400).send({
      status: false,
      message: "Something went wrong...🚨",
      validationError: error?.errors,
      error: error,
    });
  }
}

export const createConcussionDetailsForm_controller = async (req: Request, res: Response) => {
  try {
    const validatedData = createConcussionDetailsFormSchema.parse(req.body);

    const existform = await userModel.findById(res.locals.user._id);
    if (existform?.isConcussionDetailsFormCompleted) {
      return res.status(400).json({
        status: false,
        message: "Concussion details form already exists",
      });
    }

    const userId = res.locals.user._id;
    const adminId = res.locals.user.adminId;
    const previousInjuryID = res.locals.user.injuryId;
    const patientId = res.locals.user.patientId;
    const concussionDetailID = Math.floor(100000 + Math.random() * 900000 + 1);
    
    const concussionDetailsData = {
      concussionDetailID,
      previousInjuryID,
      patientId,
      userId,
      adminId,
      ...validatedData,
    };

    const concussionDetails = new concussionDetailsModel(concussionDetailsData);
    await concussionDetails.save();
    concussionDetails.decryptFieldsSync();

    await storage.updateUser(userId, {
      isConcussionDetailsFormCompleted: true,
    });

    return res.status(201).send({
      status: true,
      message: "Concussion details form created successfully...🎉",
      concussionDetails,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({
      status: false,
      message: "Something went wrong...🚨",
      validationError: error?.errors,
      error: error,
    });
  }
}