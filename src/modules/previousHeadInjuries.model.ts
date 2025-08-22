import mongoose, { Document, ObjectId } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface IPreviousHeadInjuries extends Document {
  previousInjuryID: string;
  userId: ObjectId;
  adminId: ObjectId;
  patientId: string;
  hasPreviousInjuries: boolean;
  totalNumberOfInjuries: number;
  decryptFieldsSync: () => void;
  getDecryptedData: () => any;
}

const previousHeadInjuriesSchema = new mongoose.Schema({
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
  previousInjuryID: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  hasPreviousInjuries: {
    type: Boolean,
  },
  totalNumberOfInjuries: {
    type: Number,
  },
});

previousHeadInjuriesSchema.plugin(fieldEncryption, {
  fields: ["hasPreviousInjuries", "totalNumberOfInjuries"],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

previousHeadInjuriesSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userId: this.userId,
    adminId: this.adminId,
    previousInjuryID: this.previousInjuryID,
    patientId: this.patientId,
    hasPreviousInjuries: this.hasPreviousInjuries,
    totalNumberOfInjuries: this.totalNumberOfInjuries,
  };
};

export default mongoose.model<IPreviousHeadInjuries>(
  "previousHeadInjuries",
  previousHeadInjuriesSchema
);
