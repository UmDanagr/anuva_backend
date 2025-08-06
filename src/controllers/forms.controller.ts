import { Request, Response } from "express";
import { storage } from "../storage.js";
import patientInfoFormModel from "../modules/patient_info_form.js";
import userModel from "../modules/user.model.js";

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

    const patientInfoForm = await patientInfoFormModel.create({
      ...req.body,
      userId,
      patientId: res.locals.user.patientId,
    });
    await storage.updateUser(userId, {
      isPatientInfoFormCompleted: true,
    });
    return res.status(200).json({
      status: true,
      message: "Patient info form created successfully",
      patientInfoForm,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
    });
  }
};
