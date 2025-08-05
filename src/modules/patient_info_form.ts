import mongoose from "mongoose";

const patientInfoFormSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

export default mongoose.model("PatientInfoForm", patientInfoFormSchema);
