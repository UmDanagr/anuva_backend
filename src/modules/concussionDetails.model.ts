import mongoose, { ObjectId, Document } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface IConcussionDetails extends Document {
  userId: ObjectId;
  adminId: ObjectId;
  concussionDetailID: string;
  previousInjuryID: string;
  concussionNumber: number;
  injuryDate: string;
  knockedUnconscious: boolean;
  soughtMedicalTreatment: boolean;
  symptomDuration: string;
  decryptFieldsSync: () => void;
}

const concussionDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminUser",
      required: true,
    },
    concussionDetailID: {
      type: String,
      required: true,
    },
    previousInjuryID: {
      type: String,
      required: true,
    },
    concussionNumber: {
      type: Number,
    },
    injuryDate: {
      type: String,
    },
    knockedUnconscious: {
      type: Boolean,
    },
    soughtMedicalTreatment: {
      type: Boolean,
    },
    symptomDuration: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

concussionDetailsSchema.plugin(fieldEncryption, {
  fields: ["concussionNumber", "knockedUnconscious", "soughtMedicalTreatment", "symptomDuration", "injuryDate"],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

concussionDetailsSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userId: this.userId,
    adminId: this.adminId,
    concussionDetailID: this.concussionDetailID,
    previousInjuryID: this.previousInjuryID,
    concussionNumber: this.concussionNumber,
    injuryDate: this.injuryDate,
    knockedUnconscious: this.knockedUnconscious,
    soughtMedicalTreatment: this.soughtMedicalTreatment,
    symptomDuration: this.symptomDuration,
  };
};

export default mongoose.model<IConcussionDetails>(
  "concussionDetails",
  concussionDetailsSchema
);
