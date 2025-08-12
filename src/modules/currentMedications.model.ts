import mongoose, { Document, ObjectId } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface ICurrentMedications extends Document {
  userId: ObjectId;
  adminId: ObjectId;
  medicationID: string;
  patientId: string;
  medicineName: string;
  reasonForTaking: string;
  dosage: string;
  amount: string;
  decryptFieldsSync: () => void;
}

const currentMedicationsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "adminUser" },
  medicationID: { type: String, required: true },
  patientId: { type: String, required: true },
  medicineName: { type: String },
  reasonForTaking: { type: String },
  dosage: { type: String },
  amount: { type: String },
  },
  {
    timestamps: true,
    strict: false,
});

currentMedicationsSchema.plugin(fieldEncryption, {
  fields: ["medicineName", "reasonForTaking", "dosage", "amount"],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

currentMedicationsSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userId: this.userId,
    adminId: this.adminId,
    medicationID: this.medicationID,
    patientId: this.patientId,
    medicineName: this.medicineName,
    reasonForTaking: this.reasonForTaking,
    dosage: this.dosage,
    amount: this.amount,
  };
};

export default mongoose.model<ICurrentMedications>(
  "currentMedications",
  currentMedicationsSchema
);
