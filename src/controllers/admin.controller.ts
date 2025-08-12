import { Request, Response } from "express";
import patientInfoFormModel from "../modules/patient_info_form.js";

export const get_patients_forms_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const patientsData = await patientInfoFormModel.find({
      adminId: res.locals.admin_user._id,
    }).lean();

    const patients = patientsData.map((patientDoc: any) => {
      const patient = new patientInfoFormModel(patientDoc);
      patient.decryptFieldsSync();

      const decryptedObj = patient.toObject();
      return Object.fromEntries(
        Object.entries(decryptedObj).filter(([key]) => !key.startsWith("__enc_"))
      );
    });

    return res.status(200).json({
      status: true,
      message: "Patients forms fetched successfully...��",
      patients,
    });

  } catch (error) {
    console.error("Error fetching patient forms:", error);
    return res.status(400).json({
      status: false,
      message: "Something went wrong...🚨",
    });
  }
};
