import mongoose, { Document, ObjectId } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface IDevelopmentalHistory extends Document {
  userId: ObjectId;
  adminId: ObjectId;
  devHistoryID: string;
  patientId: string;
  learningDisabilities: boolean;
  learningDisabilitiesDescription: string;
  motorVehicleAccidentHistory: boolean;
  accidentDates: string;
  headTrauma: boolean;
  brainSurgery: boolean;
  residualImpairments: boolean;
  impairmentDescription: string;
  decryptFieldsSync: () => void;
}

const developmentalHistorySchema = new mongoose.Schema<IDevelopmentalHistory>(
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
    devHistoryID: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
    },
    learningDisabilities: {
      type: Boolean,
    },
    learningDisabilitiesDescription: {
      type: String,
    },
    motorVehicleAccidentHistory: {
      type: Boolean,
    },
    accidentDates: {
      type: String,
    },
    headTrauma: {
      type: Boolean,
    },
    brainSurgery: {
      type: Boolean,
    },
    residualImpairments: {
      type: Boolean,
    },
    impairmentDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

developmentalHistorySchema.plugin(fieldEncryption, {
  fields: [
    "learningDisabilities",
    "learningDisabilitiesDescription",
    "motorVehicleAccidentHistory",
    "headTrauma",
    "brainSurgery",
    "residualImpairments",
    "accidentDates",
    "impairmentDescription",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

developmentalHistorySchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userId: this.userId,
    adminId: this.adminId,
    devHistoryID: this.devHistoryID,
    patientId: this.patientId,
    learningDisabilities: this.learningDisabilities,
    learningDisabilitiesDescription: this.learningDisabilitiesDescription,
    motorVehicleAccidentHistory: this.motorVehicleAccidentHistory,
    accidentDates: this.accidentDates,
    headTrauma: this.headTrauma,
    brainSurgery: this.brainSurgery,
    residualImpairments: this.residualImpairments,
    impairmentDescription: this.impairmentDescription,
  };
};

export default mongoose.model<IDevelopmentalHistory>(
  "developmentalHistory",
  developmentalHistorySchema
);
