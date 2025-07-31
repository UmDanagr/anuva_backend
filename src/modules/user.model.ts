import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  fullName?: string;
  phoneNumber?: string;
  passwordHash?: string;
  profileImageUrl?: string;
  isAdmin: boolean;
  insuranceProvider?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    passwordHash: {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    insuranceProvider: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
