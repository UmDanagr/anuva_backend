import mongoose, { Document, Schema } from "mongoose";

export interface IAdminUser extends Document {
  userName?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  password?: string;
  profileImageUrl?: string;
  speciality?: string;
  isAdmin?: boolean;
}

const adminUserSchema = new Schema<IAdminUser>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
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
    speciality: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAdminUser>("adminUsers", adminUserSchema);
