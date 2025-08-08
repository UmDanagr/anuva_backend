import { Request, Response } from "express";
import patientInfoFormModel from "../modules/patient_info_form.js";

export const get_patients_forms_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const patients = await patientInfoFormModel.find({
      adminId: res.locals.admin_user._id,
    });
    for (const patient of patients) {
      patient.decryptFieldsSync();
    }
    return res.status(200).json({
      status: true,
      message: "Patients forms fetched successfully...🎉",
      patients,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong...🚨",
    });
  }
};
