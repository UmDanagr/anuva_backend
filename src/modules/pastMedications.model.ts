import mongoose, { Document, ObjectId } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface IPastMedications extends Document {
  userId: ObjectId;
  adminId: ObjectId;
  pastMedicationID: string;
  patientId: string;
  medicineName: string;
  reasonForTaking: string;
  dosage: string;
  amount: string;
  decryptFieldsSync: () => void;
}

const pastMedicationsSchema = new mongoose.Schema<IPastMedications>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "adminUser" },
    pastMedicationID: { type: String, required: true },
    patientId: { type: String, required: true },
    medicineName: { type: String },
    reasonForTaking: { type: String },
    dosage: { type: String },
    amount: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  }
);

pastMedicationsSchema.plugin(fieldEncryption, {
  fields: ["medicineName", "reasonForTaking", "dosage", "amount"],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

pastMedicationsSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userId: this.userId,
    adminId: this.adminId,
    pastMedicationID: this.pastMedicationID,
    patientId: this.patientId,
    medicineName: this.medicineName,
    reasonForTaking: this.reasonForTaking,
    dosage: this.dosage,
    amount: this.amount,
  };
};

export default mongoose.model<IPastMedications>(
  "pastMedications",
  pastMedicationsSchema
);
