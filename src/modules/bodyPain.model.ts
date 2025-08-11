import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface IBodyPain extends Document {
  bodyPainId: string;
  userId: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  patientId: string;
  bodyPart: string;
  dateOfOnset: string;
  severity: number;
  frequency: string;
  duration: string;
  triggers: string;
  relievedBy: string;
  progression: string;
  decryptFieldsSync: () => void;
}

const bodyPainSchema = new mongoose.Schema<IBodyPain>({
  bodyPainId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminUsers",
    required: true,
  },
  patientId: { type: String, required: true },
  bodyPart: { type: String },
  dateOfOnset: { type: String },
  severity: { type: Number, default: 0 },
  frequency: { type: String },
  duration: { type: String },
  triggers: { type: String },
  relievedBy: { type: String },
  progression: {
    type: String,
    enum: ["Better", "Same", "Worse"],
  },
});

bodyPainSchema.plugin(fieldEncryption, {
  fields: [
    "bodyPart",
    "dateOfOnset",
    "severity",
    "frequency",
    "duration",
    "triggers",
    "relievedBy",
    "progression",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

bodyPainSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    bodyPainId: this.bodyPainId,
    userId: this.userId,
    adminId: this.adminId,
    patientId: this.patientId,
    bodyPart: this.bodyPart,
    dateOfOnset: this.dateOfOnset,
    severity: this.severity,
    frequency: this.frequency,
    duration: this.duration,
    triggers: this.triggers,
    relievedBy: this.relievedBy,
    progression: this.progression,
  };
};

export default mongoose.model<IBodyPain>("bodyPain", bodyPainSchema);
