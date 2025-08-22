import mongoose, { Document } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import { idGenerator } from "../services/id.generator.js";

export interface IAllergies extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
  allergyID: string;
  patientId: string;
  allergen: string;
  reaction: string;
  treatment: string;
  decryptFieldsSync: () => void;
  getDecryptedData: () => any;
}

const allergiesSchema = new mongoose.Schema<IAllergies>(
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
    allergyID: { type: String, required: true, unique: true, default: idGenerator() },
    patientId: { type: String, required: true },
    allergen: { type: String },
    reaction: { type: String },
    treatment: { type: String },
  },
  { timestamps: true }
);

allergiesSchema.plugin(fieldEncryption, {
  fields: ["allergen", "reaction", "treatment"],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

allergiesSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userId: this.userId,
    adminId: this.adminId,
    allergyID: this.allergyID,
    patientId: this.patientId,
    allergen: this.allergen,
    reaction: this.reaction,
    treatment: this.treatment,
  };
};

export default mongoose.model<IAllergies>("allergies", allergiesSchema);