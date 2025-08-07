import { Request, Response } from "express";
import { storage } from "../storage.js";
import patientInfoFormModel from "../modules/patient_info_form.js";
import userModel from "../modules/user.model.js";
import injuryModel from "../modules/injury.model.js";

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

    const patientInfoForm = new patientInfoFormModel({
      ...req.body,
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

    const injuryId = Math.floor(100000 + Math.random() * 900000 + 1);
    const injuryForm = new injuryModel({
      ...req.body,
      userId,
      patientId: res.locals.user.patientId,
      injuryId,
      adminId: res.locals.user.adminId,
    });

    await injuryForm.save();
    injuryForm.decryptFieldsSync();

    await storage.updateUser(userId, {
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
    });
  }
};
