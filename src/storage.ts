import mongoose from "mongoose";
import User from "./modules/user.model.js";
import adminUsers from "./modules/admin.users.js";

// Type definitions for MongoDB models
export interface IUser {
  _id: mongoose.Types.ObjectId;
  patientId: string;
  email: string;
  gender: "male" | "female" | "other";
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  password?: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  isIntakeFormFilled?: boolean;
  insuranceProvider?: string;
  isPatientInfoFormCompleted?: boolean;
  isInjuryFormCompleted?: boolean;
  isSymptomChecklistFormCompleted?: boolean;
  isAdditionalSymptomFormCompleted?: boolean;
  isHeadacheFormCompleted?: boolean;
  isSleepDisturbanceFormCompleted?: boolean;
  isBodyPainFormCompleted?: boolean;
  isPreviousHeadInjuriesFormCompleted?: boolean;
  isConcussionDetailsFormCompleted?: boolean;
  isDevelopmentalHistoryFormCompleted?: boolean;
  isSurgicalHistoryFormCompleted?: boolean;
  isCurrentMedicationsFormCompleted?: boolean;
  isPastMedicationsFormCompleted?: boolean;
  isAllergiesFormCompleted?: boolean;
  isSeizureHistoryFormCompleted?: boolean;
  isFamilyHistoryFormCompleted?: boolean;
  isSubstanceUseHistoryFormCompleted?: boolean;
  isPreviousTestsFormCompleted?: boolean;
  medicationID?: string;
  injuryId?: string;
  pcssScore?: Array<number>;
  getDecryptedData: () => Record<string, any>;
}

export interface IAdminUser {
  _id: mongoose.Types.ObjectId;
  userName?: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  speciality?: string;
  password?: string;
  profileImageUrl?: string;
  isAdmin?: boolean;
}

export interface IStorage {
  // User operations
  getUser(id: string): Promise<IUser | undefined>;
  getUserByPatientId(patientId: string): Promise<IUser | undefined>;
  getUserByEmail(email: string): Promise<IUser | undefined>;
  getAdminUserByEmail(email: string): Promise<IAdminUser | undefined>;
  getAdminUserByUsername(userName: string): Promise<IAdminUser | undefined>;
  createUser(
    user: Omit<IUser, "_id" | "createdAt" | "updatedAt">
  ): Promise<IUser>;
  upsertUser(
    user: Omit<IUser, "_id" | "createdAt" | "updatedAt">
  ): Promise<IUser>;
  updateUser(
    id: mongoose.Types.ObjectId,
    updates: Partial<IUser>
  ): Promise<IUser>;
  getUsers(): Promise<IUser[]>;
}

export class MongoDBStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<IUser | undefined> {
    try {
      const user = await User.findById(id);
      if (user) {
        user.decryptFieldsSync();
      }
      return user?.toObject() as unknown as IUser | undefined;
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByPatientId(patientId: string): Promise<IUser | undefined> {
    try {
      const user = await User.findOne({ patientId });
      if (user) {
        user.decryptFieldsSync();
      }
      return user?.toObject() as unknown as IUser | undefined;
    } catch (error) {
      console.error("Error getting user by patient ID:", error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<IUser | undefined> {
    try {
      const users = await User.find();
      for (const user of users) {
        user.decryptFieldsSync();
        if (user.email === email) {
          return user.toObject() as unknown as IUser;
        }
      }
      return undefined;
    } catch (error) {
      console.error("Error getting user by email:", error);
      return undefined;
    }
  }

  async getAdminUserByEmail(email: string): Promise<IAdminUser | undefined> {
    try {
      const users = await adminUsers.find();
      for (const user of users) {
        user.decryptFieldsSync();
        if (user.email === email) {
          return user.toObject() as unknown as IAdminUser;
        }
      }
      return undefined;
    } catch (error) {
      console.error("Error getting admin user by email:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<IUser | undefined> {
    try {
      const user = await User.findOne({ username });
      return user?.toObject() as unknown as IUser | undefined;
    } catch (error) {
      console.error("Error getting user by email:", error);
      return undefined;
    }
  }
  async getAdminUserByUsername(
    userName: string
  ): Promise<IAdminUser | undefined> {
    try {
      const users = await adminUsers.find();
      for (const user of users) {
        user.decryptFieldsSync();
        if (user.userName === userName) {
          return user.toObject() as unknown as IAdminUser;
        }
      }
      return undefined;
    } catch (error) {
      console.error("Error getting user by email:", error);
      return undefined;
    }
  }

  async createUser(
    userData: Omit<IUser, "_id" | "createdAt" | "updatedAt">
  ): Promise<IUser> {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser.toObject() as unknown as IUser;
  }

  async createAdminUser(
    userData: Omit<IAdminUser, "_id" | "createdAt" | "updatedAt">
  ): Promise<IAdminUser> {
    const user = new adminUsers(userData);
    const savedUser = await user.save();
    return savedUser.toObject() as unknown as IAdminUser;
  }

  async upsertUser(
    userData: Omit<IUser, "_id" | "createdAt" | "updatedAt">
  ): Promise<IUser> {
    const user = await User.findOneAndUpdate(
      { email: userData.email },
      userData,
      { upsert: true, new: true }
    );
    return user.toObject() as unknown as IUser;
  }

  async updateUser(
    id: mongoose.Types.ObjectId,
    updates: Partial<IUser>
  ): Promise<IUser> {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
    return user.toObject() as unknown as IUser;
  }

  async getUsers(): Promise<IUser[]> {
    const users = await User.find();
    users.forEach((user) => {
      user.decryptFieldsSync();
    });
    return users.map((user) => user.toObject() as unknown as IUser);
  }
}

export const storage = new MongoDBStorage();
