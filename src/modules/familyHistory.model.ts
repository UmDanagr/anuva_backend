import mongoose, { Document } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import { idGenerator } from "../services/id.generator.js";

export interface IFamilyHistory extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
  familyHistoryID: string;
  patientId: string;
  relation: string;
  dementia: boolean;
  stroke: boolean;
  seizure: boolean;
  highBloodPressure: boolean;
  migraine: boolean;
  headTrauma: boolean;
  diabetes: boolean;
  parkinsonDisease: boolean;
  learningDisabilities: boolean;
  substanceAbuse: boolean;
  otherConditions: string;
  decryptFieldsSync: () => void;
}

const familyHistorySchema = new mongoose.Schema<IFamilyHistory>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminUsers",
      required: true,
    },
    familyHistoryID: {
      type: String,
      required: true,
      unique: true,
      default: idGenerator(),
    },
    patientId: { type: String, required: true },
    relation: { type: String },
    dementia: { type: Boolean, default: false },
    stroke: { type: Boolean, default: false },
    seizure: { type: Boolean, default: false },
    highBloodPressure: { type: Boolean, default: false },
    migraine: { type: Boolean, default: false },
    headTrauma: { type: Boolean, default: false },
    diabetes: { type: Boolean, default: false },
    parkinsonDisease: { type: Boolean, default: false },
    learningDisabilities: { type: Boolean, default: false },
    substanceAbuse: { type: Boolean, default: false },
    otherConditions: { type: String },
  },
  { timestamps: true }
);

familyHistorySchema.plugin(fieldEncryption, {
  fields: [
    "relation",
    "otherConditions",
    "dementia",
    "stroke",
    "seizure",
    "highBloodPressure",
    "migraine",
    "headTrauma",
    "diabetes",
    "parkinsonDisease",
    "learningDisabilities",
    "substanceAbuse",
    "otherConditions",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

familyHistorySchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userId: this.userId,
    adminId: this.adminId,
    familyHistoryID: this.familyHistoryID,
    patientId: this.patientId,
    relation: this.relation,
    dementia: this.dementia,
    stroke: this.stroke,
    seizure: this.seizure,
    highBloodPressure: this.highBloodPressure,
    migraine: this.migraine,
    headTrauma: this.headTrauma,
    diabetes: this.diabetes,
    parkinsonDisease: this.parkinsonDisease,
    learningDisabilities: this.learningDisabilities,
    substanceAbuse: this.substanceAbuse,
    otherConditions: this.otherConditions,
  };
};

export default mongoose.model<IFamilyHistory>(
  "familyHistory",
  familyHistorySchema
);
