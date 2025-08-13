import mongoose, { Document } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import { idGenerator } from "../services/id.generator.js";

export interface ISeizureHistory extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
  seizureHistoryID: string;
  patientId: string;
  hasSeizureHistory: boolean;
  dateOfOnset: string;
  typeOfSeizure: string;
  dateOfLastSeizure: string;
  currentMedications: string;
  decryptFieldsSync: () => void;
}

const seizureHistorySchema = new mongoose.Schema<ISeizureHistory>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminUsers",
    required: true,
  },
  seizureHistoryID: { type: String, required: true, unique: true, default: idGenerator() },
  patientId: { type: String, required: true },
  hasSeizureHistory: { type: Boolean, default: false },
  dateOfOnset: { type: String },
  typeOfSeizure: { type: String },
  dateOfLastSeizure: { type: String },
  currentMedications: { type: String },
}, { timestamps: true });

seizureHistorySchema.plugin(fieldEncryption, {
  fields: ["dateOfOnset", "typeOfSeizure", "dateOfLastSeizure", "currentMedications", "hasSeizureHistory"],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

seizureHistorySchema.methods.getDecryptedData = function () {
    this.decryptFieldsSync();
    return {
        userId: this.userId,
        adminId: this.adminId,
        seizureHistoryID: this.seizureHistoryID,
        patientId: this.patientId,
        hasSeizureHistory: this.hasSeizureHistory,
        dateOfOnset: this.dateOfOnset,
        typeOfSeizure: this.typeOfSeizure,
        dateOfLastSeizure: this.dateOfLastSeizure,
        currentMedications: this.currentMedications,
    }   
}

export default mongoose.model<ISeizureHistory>("seizureHistory", seizureHistorySchema);
