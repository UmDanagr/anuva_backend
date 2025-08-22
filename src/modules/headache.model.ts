import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface IHeadache extends Document {
  headacheId: string;
  userId: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  patientId: string;
  ageOrDateOfOnset: string;
  pastHeadacheProblems: boolean;
  pastHeadacheDescription: string;
  locationOfPain: string;
  frequency: string;
  painAtPresent: number;
  painAtWorst: number;
  qualityDescription: string;
  timingDescription: string;
  durationDescription: string;
  triggersDescription: string;
  associatedSymptoms: string;
  reliefFactors: string;
  daysMissingWorkOrSchool: string;
  daysMissingSocialEvents: string;
  decryptFieldsSync: () => void;
  getDecryptedData: () => any;
}

const headacheSchema = new mongoose.Schema<IHeadache>(
  {
    headacheId: { type: String, required: true, unique: true },
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
    patientId: { type: String, required: true },
    ageOrDateOfOnset: { type: String },
    pastHeadacheProblems: { type: Boolean },
    pastHeadacheDescription: { type: String },
    locationOfPain: { type: String },
    frequency: { type: String },
    painAtPresent: { type: Number, default: 0 },
    painAtWorst: { type: Number, default: 0 },
    qualityDescription: { type: String },
    timingDescription: { type: String },
    durationDescription: { type: String },
    triggersDescription: { type: String },
    associatedSymptoms: { type: String },
    reliefFactors: { type: String },
    daysMissingWorkOrSchool: { type: String },
    daysMissingSocialEvents: { type: String },
  },
  { timestamps: true }
);

headacheSchema.plugin(fieldEncryption, {
  fields: [
    "ageOrDateOfOnset",
    "pastHeadacheProblems",
    "pastHeadacheDescription",
    "locationOfPain",
    "frequency",
    "painAtPresent",
    "painAtWorst",
    "qualityDescription",
    "timingDescription",
    "durationDescription",
    "triggersDescription",
    "associatedSymptoms",
    "reliefFactors",
    "daysMissingWorkOrSchool",
    "daysMissingSocialEvents",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

headacheSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    headacheId: this.headacheId,
    userId: this.userId,
    adminId: this.adminId,
    patientId: this.patientId,
    ageOrDateOfOnset: this.ageOrDateOfOnset,
    pastHeadacheProblems: this.pastHeadacheProblems,
    pastHeadacheDescription: this.pastHeadacheDescription,
    locationOfPain: this.locationOfPain,
    frequency: this.frequency,
    painAtPresent: this.painAtPresent,
    painAtWorst: this.painAtWorst,
    qualityDescription: this.qualityDescription,
    timingDescription: this.timingDescription,
    durationDescription: this.durationDescription,
    triggersDescription: this.triggersDescription,
    associatedSymptoms: this.associatedSymptoms,
    reliefFactors: this.reliefFactors,
    daysMissingWorkOrSchool: this.daysMissingWorkOrSchool,
    daysMissingSocialEvents: this.daysMissingSocialEvents,
  };
};

export default mongoose.model<IHeadache>("headache", headacheSchema);
