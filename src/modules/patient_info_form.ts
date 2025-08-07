import mongoose, { Document, Types } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface IPatientInfoForm extends Document {
  userId: Types.ObjectId;
  adminId: Types.ObjectId;
  patientId: string;
  fullName: string;
  dateOfExamination: Date;
  race: string;
  maritalStatus: "single" | "married" | "divorced" | "widowed";
  numberOfChildren: number;
  hearingImpairment: boolean;
  hearingAids: boolean;
  glassesOrContacts: boolean;
  occupation: string;
  employer: string;
  employerAddress: string;
  enrolledInSchool: boolean;
  school: string;
  decryptFieldsSync: () => void;
}

const patientInfoFormSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "adminUsers" },
    patientId: { type: String, required: true },
    fullName: { type: String, required: true },
    dateOfExamination: { type: Date, required: true },
    race: { type: String, required: true },
    maritalStatus: {
      type: String,
      required: true,
      enum: ["single", "married", "divorced", "widowed"],
    },
    numberOfChildren: { type: Number, required: true },
    hearingImpairment: { type: Boolean, required: true },
    hearingAids: { type: Boolean, required: true },
    glassesOrContacts: { type: Boolean, required: true },
    occupation: { type: String, required: true },
    employer: { type: String, required: true },
    employerAddress: { type: String, required: true },
    enrolledInSchool: { type: Boolean, required: true },
    school: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const encryptionKey = process.env.ENCRYPTION_SECRET;

patientInfoFormSchema.plugin(fieldEncryption, {
  fields: [
    "fullName",
    "race",
    "maritalStatus",
    "occupation",
    "employer",
    "school",
    "employerAddress",
    "dateOfExamination",
    "numberOfChildren",
    "hearingImpairment",
    "hearingAids",
    "glassesOrContacts",
    "enrolledInSchool",
  ],
  secret: encryptionKey,
  saltGenerator: () => "1234567890abcdef",
});

patientInfoFormSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    fullName: this.fullName,
    race: this.race,
    maritalStatus: this.maritalStatus,
    numberOfChildren: this.numberOfChildren,
    hearingImpairment: this.hearingImpairment,
    hearingAids: this.hearingAids,
    glassesOrContacts: this.glassesOrContacts,
    occupation: this.occupation,
    employer: this.employer,
    employerAddress: this.employerAddress,
    enrolledInSchool: this.enrolledInSchool,
    school: this.school,
  };
};
export default mongoose.model<IPatientInfoForm>(
  "PatientInfoForm",
  patientInfoFormSchema
);
