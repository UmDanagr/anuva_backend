import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  password?: string;
  profileImageUrl?: string;
  insuranceProvider?: string;
  isIntakeFormFilled?: boolean;
}

const userSchema = new Schema<IUser>(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
