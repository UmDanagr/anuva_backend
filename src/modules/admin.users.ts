import mongoose, { Document, Schema } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import dotenv from "dotenv";

dotenv.config();

export interface IAdminUser extends Document {
  userName?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  password?: string;
  profileImageUrl?: string;
  speciality?: string;
  isAdmin?: boolean;
  decryptFieldsSync: () => void;
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
    },
  },
  {
    timestamps: true,
  }
);

adminUserSchema.plugin(fieldEncryption, {
  fields: [
    "email",
    "userName",
    "fullName",
    "phoneNumber",
    "profileImageUrl",
    "speciality",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => "1234567890abcdef",
});

adminUserSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userName: this.userName,
    email: this.email,
    fullName: this.fullName,
    phoneNumber: this.phoneNumber,
    profileImageUrl: this.profileImageUrl,
    speciality: this.speciality,
    isAdmin: this.isAdmin,
    password: this.password,
  };
};

export default mongoose.model<IAdminUser>("adminUsers", adminUserSchema);
