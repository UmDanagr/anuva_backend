import mongoose, { Document, Schema } from "mongoose";
import encrypt from "mongoose-encryption";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export interface IUser extends Document {
  patientId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  password?: string;
  profileImageUrl?: string;
  insuranceProvider?: string;
  isIntakeFormFilled?: boolean;
  isPatientInfoFormCompleted?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
    insuranceProvider: {
      type: String,
    },
    isIntakeFormFilled: {
      type: Boolean,
      default: false,
    },
    isPatientInfoFormCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Use a hardcoded encryption key since environment variables are not working
const encryptionKey = "ThisIsATemporaryEncryptionKeyForDevelopment12345";

userSchema.plugin(encrypt, {
  secret: encryptionKey,
  encryptedFields: ["email", "phoneNumber", "dateOfBirth"],
  requireAuthenticationCode: false,
});

export default mongoose.model<IUser>("User", userSchema);
