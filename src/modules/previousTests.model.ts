import mongoose, { Document } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import { idGenerator } from "../services/id.generator.js";

export interface IPreviousTests extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
  testID: string;
  patientId: string;
  neurologicalImaging: boolean;
  neurologicalImagingDates: string;
  impactTesting: boolean;
  impactTestingDates: string;
  neuroPsychologicalTesting: boolean;
  neuroPsychologicalTestingDates: string;
  EEG: boolean;
  EEGDates: string;
  bloodWork: boolean;
  bloodWorkDates: string;
  decryptFieldsSync: () => void;
}

const previousTestsSchema = new mongoose.Schema<IPreviousTests>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, required: true },
    testID: {
      type: String,
      required: true,
      unique: true,
      default: idGenerator(),
    },
    patientId: { type: String },
    neurologicalImaging: { type: Boolean, default: false },
    neurologicalImagingDates: { type: String },
    impactTesting: { type: Boolean, default: false },
    impactTestingDates: { type: String },
    neuroPsychologicalTesting: { type: Boolean, default: false },
    neuroPsychologicalTestingDates: { type: String },
    EEG: { type: Boolean, default: false },
    EEGDates: { type: String },
    bloodWork: { type: Boolean, default: false },
    bloodWorkDates: { type: String },
  },
  { timestamps: true }
);

previousTestsSchema.plugin(fieldEncryption, {
  fields: [
    "neurologicalImaging",
    "neurologicalImagingDates",
    "impactTesting",
    "impactTestingDates",
    "neuroPsychologicalTesting",
    "neuroPsychologicalTestingDates",
    "EEG",
    "EEGDates",
    "bloodWork",
    "bloodWorkDates",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

previousTestsSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userId: this.userId,
    adminId: this.adminId,
    testID: this.testID,
    patientId: this.patientId,
    neurologicalImaging: this.neurologicalImaging,
    neurologicalImagingDates: this.neurologicalImagingDates,
    impactTesting: this.impactTesting,
    impactTestingDates: this.impactTestingDates,
    neuroPsychologicalTesting: this.neuroPsychologicalTesting,
    neuroPsychologicalTestingDates: this.neuroPsychologicalTestingDates,
    EEG: this.EEG,
    EEGDates: this.EEGDates,
    bloodWork: this.bloodWork,
    bloodWorkDates: this.bloodWorkDates,
  };
};

export default mongoose.model<IPreviousTests>(
  "previousTests",
  previousTestsSchema
);
