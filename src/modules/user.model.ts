import mongoose, { Document, Schema, Types } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import dotenv from "dotenv";

dotenv.config();

export interface IUser extends Document {
  patientId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  password?: string;
  profileImageUrl?: string;
  insuranceProvider?: string;
  isIntakeFormFilled?: boolean;
  isPatientInfoFormCompleted?: boolean;
  isInjuryFormCompleted?: boolean;
  isSymptomChecklistFormCompleted?: boolean;
  isAdditionalSymptomFormCompleted?: boolean;
  isHeadacheFormCompleted?: boolean;
  isSleepDisturbanceFormCompleted?: boolean;
  isBodyPainFormCompleted?: boolean;
  isPreviousHeadInjuriesFormCompleted?: boolean;
  isConcussionDetailsFormCompleted?: boolean;
  isDevelopmentalHistoryFormCompleted?: boolean;
  isSurgicalHistoryFormCompleted?: boolean;
  isCurrentMedicationsFormCompleted?: boolean;
  isPastMedicationsFormCompleted?: boolean;
  isAllergiesFormCompleted?: boolean;
  isSeizureHistoryFormCompleted?: boolean;
  isFamilyHistoryFormCompleted?: boolean;
  isSubstanceUseHistoryFormCompleted?: boolean;
  isPreviousTestsFormCompleted?: boolean;
  medicationID?: string;
  injuryId?: string;
  adminId: Types.ObjectId;
  decryptFieldsSync: () => void;
}

const userSchema = new Schema<IUser>(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    insuranceProvider: {
      type: String,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminUsers",
    },
    injuryId: {
      type: String,
    },
    isIntakeFormFilled: {
      type: Boolean,
      default: false,
    },
    isPatientInfoFormCompleted: {
      type: Boolean,
      default: false,
    },
    isInjuryFormCompleted: {
      type: Boolean,
      default: false,
    },
    isSymptomChecklistFormCompleted: {
      type: Boolean,
      default: false,
    },
    isAdditionalSymptomFormCompleted: {
      type: Boolean,
      default: false,
    },
    isHeadacheFormCompleted: {
      type: Boolean,
      default: false,
    },
    isSleepDisturbanceFormCompleted: {
      type: Boolean,
      default: false,
    },
    isBodyPainFormCompleted: {
      type: Boolean,
      default: false,
    },
    isPreviousHeadInjuriesFormCompleted: {
      type: Boolean,
      default: false,
    },
    isConcussionDetailsFormCompleted: {
      type: Boolean,
      default: false,
    },
    isDevelopmentalHistoryFormCompleted: {
      type: Boolean,
      default: false,
    },
    isSurgicalHistoryFormCompleted: {
      type: Boolean,
      default: false,
    },
    isCurrentMedicationsFormCompleted: {
      type: Boolean,
      default: false,
    },
    isPastMedicationsFormCompleted: {
      type: Boolean,
      default: false,
    },
    isAllergiesFormCompleted: {
      type: Boolean,
      default: false,
    },
    isSeizureHistoryFormCompleted: {
      type: Boolean,
      default: false,
    },
    isFamilyHistoryFormCompleted: {
      type: Boolean,
      default: false,
    },
    isSubstanceUseHistoryFormCompleted: {
      type: Boolean,
      default: false,
    },
    isPreviousTestsFormCompleted: {
      type: Boolean,
      default: false,
    },
    medicationID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const encryptionKey = process.env.ENCRYPTION_SECRET;

userSchema.plugin(fieldEncryption, {
  fields: [
    "email",
    "phoneNumber",
    "dateOfBirth",
    "firstName",
    "lastName",
    "profileImageUrl",
    "insuranceProvider",
  ],
  secret: encryptionKey,
  saltGenerator: () => "1234567890abcdef",
});

userSchema.methods.getDecryptedData = function () {
  try {
    this.decryptFieldsSync();
    return {
      patientId: this.patientId,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber,
      profileImageUrl: this.profileImageUrl,
      insuranceProvider: this.insuranceProvider,
      isIntakeFormFilled: this.isIntakeFormFilled,
      isPatientInfoFormCompleted: this.isPatientInfoFormCompleted,
      isInjuryFormCompleted: this.isInjuryFormCompleted,
      isSymptomChecklistFormCompleted: this.isSymptomChecklistFormCompleted,
      isAdditionalSymptomFormCompleted: this.isAdditionalSymptomFormCompleted,
      isHeadacheFormCompleted: this.isHeadacheFormCompleted,
      isSleepDisturbanceFormCompleted: this.isSleepDisturbanceFormCompleted,
      isBodyPainFormCompleted: this.isBodyPainFormCompleted,
      isPreviousHeadInjuriesFormCompleted: this.isPreviousHeadInjuriesFormCompleted,
      isConcussionDetailsFormCompleted: this.isConcussionDetailsFormCompleted,
      isDevelopmentalHistoryFormCompleted: this.isDevelopmentalHistoryFormCompleted,
      isSurgicalHistoryFormCompleted: this.isSurgicalHistoryFormCompleted,
      isCurrentMedicationsFormCompleted: this.isCurrentMedicationsFormCompleted,
      isPastMedicationsFormCompleted: this.isPastMedicationsFormCompleted,
      isAllergiesFormCompleted: this.isAllergiesFormCompleted,
      isSeizureHistoryFormCompleted: this.isSeizureHistoryFormCompleted,
      isFamilyHistoryFormCompleted: this.isFamilyHistoryFormCompleted,
      isSubstanceUseHistoryFormCompleted: this.isSubstanceUseHistoryFormCompleted,
      isPreviousTestsFormCompleted: this.isPreviousTestsFormCompleted,
      injuryId: this.injuryId,
      adminId: this.adminId,
    };
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt user data");
  }
};

export default mongoose.model<IUser>("User", userSchema);
