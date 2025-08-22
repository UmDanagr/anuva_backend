import { Request, Response } from "express";
import mongoose from "mongoose";
import userModel from "../modules/user.model.js";
import AdditionalSymptoms from "../modules/additional.symptoms.model.js";
import PatientInfoForm from "../modules/patient_info_form.js";
import SymptomChecklist from "../modules/symptom_checklist.model.js";
import Allergies from "../modules/allergies.model.js";
import BodyPain from "../modules/bodyPain.model.js";
import ConcussionDetails from "../modules/concussionDetails.model.js";
import CurrentMedications from "../modules/currentMedications.model.js";
import DevelopmentalHistory from "../modules/developmentalHistory.model.js";
import FamilyHistory from "../modules/familyHistory.model.js";
import Headache from "../modules/headache.model.js";
import Injury from "../modules/injury.model.js";
import PastMedications from "../modules/pastMedications.model.js";
import PreviousHeadInjuries from "../modules/previousHeadInjuries.model.js";
import PreviousTests from "../modules/previousTests.model.js";
import SleepDisturbance from "../modules/sleepDisturbance.model.js";
import SurgicalHistory from "../modules/surgicalHistory.model.js";
import SubstanceUseHistory from "../modules/substanceUseHistory.model.js";
import SeizureHistory from "../modules/seizureHistory.model.js";

export const get_patients_forms_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const patientsData = await userModel.aggregate([
      {
        $match: {
          adminId: new mongoose.Types.ObjectId(res.locals.admin_user._id),
        },
      },
      {
        $lookup: {
          from: "injuries",
          localField: "_id",
          foreignField: "userId",
          as: "injury",
        },
      },
      {
        $lookup:{
          from:"patientinfoforms",
          localField:"_id",
          foreignField:"userId",
          as:"patientInfoForm",
        }
      }
    ]);

    const processedPatientsData = await Promise.all(
      patientsData.map(async (patient) => {
        const userDoc = await userModel.findById(patient._id);
        const decryptedUserData = userDoc ? userDoc.getDecryptedData() : patient;
        
        const userDataWithId = {
          _id: patient._id,
          ...decryptedUserData
        };

        let decryptedInjuryData = null;
        if (patient.injury && patient.injury.length > 0) {
          const injuryDoc = await Injury.findById(patient.injury[0]._id);
          if (injuryDoc) {
            decryptedInjuryData = injuryDoc.getDecryptedData();
            decryptedInjuryData.dateOfInjury = injuryDoc.dateOfInjury;
          }
        }

        let decryptedPatientInfoData = null;
        if (patient.patientInfoForm && patient.patientInfoForm.length > 0) {
          const patientInfoDoc = await PatientInfoForm.findById(patient.patientInfoForm[0]._id);
          if (patientInfoDoc) {
            decryptedPatientInfoData = patientInfoDoc.getDecryptedData();
          }
        }

        return {
          ...userDataWithId,
          dateOfInjury: decryptedInjuryData?.dateOfInjury || null,
          school: decryptedPatientInfoData?.school || null,
        };
      })
    );

    return res.status(200).json({
      status: true,
      message: "Patients forms fetched successfully...✅",
      patientsData: processedPatientsData,
    });
  } catch (error) {
    console.error("Error fetching patient forms:", error);
    return res.status(400).json({
      status: false,
      message: "Something went wrong...🚨",
    });
  }
};

export const get_patient_all_data_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const patientData = await userModel.aggregate([
      {
        $match: {
          $and: [
            {
              adminId: new mongoose.Types.ObjectId(res.locals.admin_user._id),
            },
            { _id: new mongoose.Types.ObjectId(id) },
          ],
        },
      },
      {
        $lookup: {
          from: "additionalsymptoms",
          localField: "_id",
          foreignField: "userId",
          as: "additionalSymptoms",
        },
      },
      {
        $lookup: {
          from: "patientinfoforms",
          localField: "_id",
          foreignField: "userId",
          as: "patientInfoForm",
        },
      },
      {
        $lookup: {
          from: "symptomchecklists",
          localField: "_id",
          foreignField: "userId",
          as: "symptomChecklist",
        },
      },
      {
        $lookup: {
          from: "allergies",
          localField: "_id",
          foreignField: "userId",
          as: "allergies",
        },
      },
      {
        $lookup: {
          from: "bodypains",
          localField: "_id",
          foreignField: "userId",
          as: "bodyPains",
        },
      },
      {
        $lookup: {
          from: "concussiondetails",
          localField: "_id",
          foreignField: "userId",
          as: "concussionDetails",
        },
      },
      {
        $lookup: {
          from: "currentmedications",
          localField: "_id",
          foreignField: "userId",
          as: "currentMedications",
        },
      },
      {
        $lookup: {
          from: "developmentalhistories",
          localField: "_id",
          foreignField: "userId",
          as: "developmentalHistory",
        },
      },
      {
        $lookup: {
          from: "familyhistories",
          localField: "_id",
          foreignField: "userId",
          as: "familyHistory",
        },
      },
      {
        $lookup: {
          from: "headaches",
          localField: "_id",
          foreignField: "userId",
          as: "headache",
        },
      },
      {
        $lookup: {
          from: "injuries",
          localField: "_id",
          foreignField: "userId",
          as: "injury",
        },
      },
      {
        $lookup: {
          from: "pastmedications",
          localField: "_id",
          foreignField: "userId",
          as: "pastMedications",
        },
      },
      {
        $lookup: {
          from: "previousheadinjuries",
          localField: "_id",
          foreignField: "userId",
          as: "previousHeadInjury",
        },
      },
      {
        $lookup: {
          from: "previoustests",
          localField: "_id",
          foreignField: "userId",
          as: "previousTest",
        },
      },
      {
        $lookup: {
          from: "sleepdisturbances",
          localField: "_id",
          foreignField: "userId",
          as: "sleepDisturbance",
        },
      },
      {
        $lookup: {
          from: "surgicalhistories",
          localField: "_id",
          foreignField: "userId",
          as: "surgicalHistory",
        },
      },
      {
        $lookup: {
          from: "substanceusehistories",
          localField: "_id",
          foreignField: "userId",
          as: "substanceUseHistory",
        },
      },
      {
        $lookup: {
          from: "seizurehistories",
          localField: "_id",
          foreignField: "userId",
          as: "seizureHistory",
        },
      },
    ]);

    if (patientData.length > 0) {
      const patient = patientData[0];

      const userDoc = await userModel.findById(id);
      const decryptedUserData = userDoc ? userDoc.getDecryptedData() : patient;

      const decryptArray = async (docs: any[], Model: any) => {
        if (!docs || docs.length === 0) return [];
        return await Promise.all(
          docs.map(async (doc) => {
            const modelDoc = await Model.findById(doc._id);
            return modelDoc ? modelDoc.getDecryptedData() : doc;
          })
        );
      };

      const decryptedData = {
        ...decryptedUserData,
        additionalSymptoms: await decryptArray(
          patient.additionalSymptoms,
          AdditionalSymptoms
        ),
        patientInfoForm: await decryptArray(
          patient.patientInfoForm,
          PatientInfoForm
        ),
        symptomChecklist: await decryptArray(
          patient.symptomChecklist,
          SymptomChecklist
        ),
        allergies: await decryptArray(patient.allergies, Allergies),
        bodyPains: await decryptArray(patient.bodyPains, BodyPain),
        concussionDetails: await decryptArray(
          patient.concussionDetails,
          ConcussionDetails
        ),
        currentMedications: await decryptArray(
          patient.currentMedications,
          CurrentMedications
        ),
        developmentalHistory: await decryptArray(
          patient.developmentalHistory,
          DevelopmentalHistory
        ),
        familyHistory: await decryptArray(patient.familyHistory, FamilyHistory),
        headache: await decryptArray(patient.headache, Headache),
        injury: await decryptArray(patient.injury, Injury),
        pastMedications: await decryptArray(
          patient.pastMedications,
          PastMedications
        ),
        previousHeadInjury: await decryptArray(
          patient.previousHeadInjury,
          PreviousHeadInjuries
        ),
        previousTest: await decryptArray(patient.previousTest, PreviousTests),
        sleepDisturbance: await decryptArray(
          patient.sleepDisturbance,
          SleepDisturbance
        ),
        surgicalHistory: await decryptArray(
          patient.surgicalHistory,
          SurgicalHistory
        ),
        substanceUseHistory: await decryptArray(
          patient.substanceUseHistory,
          SubstanceUseHistory
        ),
        seizureHistory: await decryptArray(
          patient.seizureHistory,
          SeizureHistory
        ),
      };

      return res.status(200).json({
        status: true,
        message: "Patient all data fetched successfully...✅",
        patient: decryptedData,
      });
    }

    return res.status(404).json({
      status: false,
      message: "Patient not found...🚨",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong...🚨",
    });
  }
};
