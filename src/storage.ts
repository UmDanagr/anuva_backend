import mongoose from "mongoose";
import User from "./modules/user.model.js";
import IntakeForm from "./modules/intakeForm.model.js";
import HealthMetric from "./modules/healthMetric.model.js";
import LabResult from "./modules/labResult.model.js";
import Appointment from "./modules/appointment.model.js";
import EmergencyContact from "./modules/emergencyContact.model.js";
import UserSetting from "./modules/userSetting.model.js";
import Achievement from "./modules/achievement.model.js";
import UserProgress from "./modules/userProgress.model.js";
import adminUsers from "./modules/admin.users.js";

// Type definitions for MongoDB models
export interface IUser {
  _id: mongoose.Types.ObjectId;
  patientId: string;
  email: string;
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
  getDecryptedData: () => Record<string, any>;
}

export interface IIntakeForm {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  formType:
    | "concussion_baseline"
    | "post_injury_assessment"
    | "symptom_tracking"
    | "return_to_play"
    | "cognitive_evaluation";
  status: "pending" | "completed" | "overdue";
  priority: "urgent" | "normal" | "low";
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHealthMetric {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  metricType:
    | "symptom_severity"
    | "cognitive_score"
    | "balance_test"
    | "reaction_time"
    | "headache_frequency"
    | "sleep_quality";
  value: string;
  unit?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILabResult {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  status: string;
  result: string;
  testName: string;
  testDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAppointment {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  providerName: string;
  appointmentType: string;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmergencyContact {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  relationship: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserSettings {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAchievement {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  badgeType: "form_completion" | "streak" | "milestone" | "recovery_progress";
  badgeId: string;
  title: string;
  description?: string;
  iconName: string;
  color: string;
  earnedAt: Date;
  progress: number;
  target: number;
  isUnlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProgress {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  totalFormsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  level: number;
  experiencePoints: number;
  lastActivityDate?: Date;
  createdAt: Date;
  updatedAt: Date;
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

  // Intake forms
  getIntakeForms(userId: string): Promise<IIntakeForm[]>;
  createIntakeForm(
    form: Omit<IIntakeForm, "_id" | "createdAt" | "updatedAt">
  ): Promise<IIntakeForm>;
  updateIntakeForm(
    id: string,
    updates: Partial<IIntakeForm>
  ): Promise<IIntakeForm>;
  completeIntakeForm(id: string): Promise<IIntakeForm>;

  // Health metrics
  getHealthMetrics(userId: string): Promise<IHealthMetric[]>;
  createHealthMetric(
    metric: Omit<IHealthMetric, "_id" | "createdAt" | "updatedAt">
  ): Promise<IHealthMetric>;
  getLatestHealthMetric(
    userId: string,
    metricType: string
  ): Promise<IHealthMetric | undefined>;

  // Lab results
  getLabResults(userId: string): Promise<ILabResult[]>;
  createLabResult(
    result: Omit<ILabResult, "_id" | "createdAt" | "updatedAt">
  ): Promise<ILabResult>;

  // Appointments
  getAppointments(userId: string): Promise<IAppointment[]>;
  getUpcomingAppointments(userId: string): Promise<IAppointment[]>;
  createAppointment(
    appointment: Omit<IAppointment, "_id" | "createdAt" | "updatedAt">
  ): Promise<IAppointment>;

  // Emergency contacts
  getEmergencyContacts(userId: string): Promise<IEmergencyContact[]>;
  createEmergencyContact(
    contact: Omit<IEmergencyContact, "_id" | "createdAt" | "updatedAt">
  ): Promise<IEmergencyContact>;
  updateEmergencyContact(
    id: string,
    updates: Partial<IEmergencyContact>
  ): Promise<IEmergencyContact>;
  deleteEmergencyContact(id: string): Promise<void>;

  // User settings
  getUserSettings(userId: string): Promise<IUserSettings | undefined>;
  upsertUserSettings(
    settings: Omit<IUserSettings, "_id" | "createdAt" | "updatedAt">
  ): Promise<IUserSettings>;

  // Achievements and gamification
  getAchievements(userId: string): Promise<IAchievement[]>;
  createAchievement(
    achievement: Omit<IAchievement, "_id" | "createdAt" | "updatedAt">
  ): Promise<IAchievement>;
  updateAchievementProgress(
    userId: string,
    badgeId: string,
    progress: number
  ): Promise<IAchievement>;
  unlockAchievement(userId: string, badgeId: string): Promise<IAchievement>;

  // User progress
  getUserProgress(userId: string): Promise<IUserProgress | undefined>;
  upsertUserProgress(
    progress: Omit<IUserProgress, "_id" | "createdAt" | "updatedAt">
  ): Promise<IUserProgress>;
  updateUserStats(
    userId: string,
    formsCompleted: number,
    points: number
  ): Promise<IUserProgress>;
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

  // Intake forms
  async getIntakeForms(userId: string): Promise<IIntakeForm[]> {
    const forms = await IntakeForm.find({ userId }).sort({ createdAt: -1 });
    return forms.map((form) => form.toObject() as unknown as IIntakeForm);
  }

  async createIntakeForm(
    formData: Omit<IIntakeForm, "_id" | "createdAt" | "updatedAt">
  ): Promise<IIntakeForm> {
    const form = new IntakeForm(formData);
    const savedForm = await form.save();
    return savedForm.toObject() as unknown as IIntakeForm;
  }

  async updateIntakeForm(
    id: string,
    updates: Partial<IIntakeForm>
  ): Promise<IIntakeForm> {
    const form = await IntakeForm.findByIdAndUpdate(id, updates, { new: true });
    if (!form) {
      throw new Error("Intake form not found");
    }
    return form.toObject() as unknown as IIntakeForm;
  }

  async completeIntakeForm(id: string): Promise<IIntakeForm> {
    const form = await IntakeForm.findByIdAndUpdate(
      id,
      {
        status: "completed",
        completedAt: new Date(),
      },
      { new: true }
    );
    if (!form) {
      throw new Error("Intake form not found");
    }
    return form.toObject() as unknown as IIntakeForm;
  }

  // Health metrics
  async getHealthMetrics(userId: string): Promise<IHealthMetric[]> {
    const metrics = await HealthMetric.find({ userId }).sort({ createdAt: -1 });
    return metrics.map(
      (metric) => metric.toObject() as unknown as IHealthMetric
    );
  }

  async createHealthMetric(
    metricData: Omit<IHealthMetric, "_id" | "createdAt" | "updatedAt">
  ): Promise<IHealthMetric> {
    const metric = new HealthMetric(metricData);
    const savedMetric = await metric.save();
    return savedMetric.toObject() as unknown as IHealthMetric;
  }

  async getLatestHealthMetric(
    userId: string,
    metricType: string
  ): Promise<IHealthMetric | undefined> {
    const metric = await HealthMetric.findOne({ userId, metricType }).sort({
      createdAt: -1,
    });
    return metric?.toObject() as unknown as IHealthMetric | undefined;
  }

  // Lab results
  async getLabResults(userId: string): Promise<ILabResult[]> {
    const results = await LabResult.find({ userId }).sort({ testDate: -1 });
    return results.map((result) => result.toObject() as unknown as ILabResult);
  }

  async createLabResult(
    resultData: Omit<ILabResult, "_id" | "createdAt" | "updatedAt">
  ): Promise<ILabResult> {
    const result = new LabResult(resultData);
    const savedResult = await result.save();
    return savedResult.toObject() as unknown as ILabResult;
  }

  // Appointments
  async getAppointments(userId: string): Promise<IAppointment[]> {
    const appointments = await Appointment.find({ userId }).sort({
      scheduledAt: -1,
    });
    return appointments.map(
      (appointment) => appointment.toObject() as unknown as IAppointment
    );
  }

  async getUpcomingAppointments(userId: string): Promise<IAppointment[]> {
    const appointments = await Appointment.find({
      userId,
      scheduledAt: { $gte: new Date() },
    }).sort({ scheduledAt: 1 });
    return appointments.map(
      (appointment) => appointment.toObject() as unknown as IAppointment
    );
  }

  async createAppointment(
    appointmentData: Omit<IAppointment, "_id" | "createdAt" | "updatedAt">
  ): Promise<IAppointment> {
    const appointment = new Appointment(appointmentData);
    const savedAppointment = await appointment.save();
    return savedAppointment.toObject() as unknown as IAppointment;
  }

  // Emergency contacts
  async getEmergencyContacts(userId: string): Promise<IEmergencyContact[]> {
    const contacts = await EmergencyContact.find({ userId });
    return contacts.map(
      (contact) => contact.toObject() as unknown as IEmergencyContact
    );
  }

  async createEmergencyContact(
    contactData: Omit<IEmergencyContact, "_id" | "createdAt" | "updatedAt">
  ): Promise<IEmergencyContact> {
    const contact = new EmergencyContact(contactData);
    const savedContact = await contact.save();
    return savedContact.toObject() as unknown as IEmergencyContact;
  }

  async updateEmergencyContact(
    id: string,
    updates: Partial<IEmergencyContact>
  ): Promise<IEmergencyContact> {
    const contact = await EmergencyContact.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!contact) {
      throw new Error("Emergency contact not found");
    }
    return contact.toObject() as unknown as IEmergencyContact;
  }

  async deleteEmergencyContact(id: string): Promise<void> {
    const result = await EmergencyContact.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Emergency contact not found");
    }
  }

  // User settings
  async getUserSettings(userId: string): Promise<IUserSettings | undefined> {
    const settings = await UserSetting.findOne({ userId });
    return settings?.toObject() as unknown as IUserSettings | undefined;
  }

  async upsertUserSettings(
    settingsData: Omit<IUserSettings, "_id" | "createdAt" | "updatedAt">
  ): Promise<IUserSettings> {
    const settings = await UserSetting.findOneAndUpdate(
      { userId: settingsData.userId },
      settingsData,
      { upsert: true, new: true }
    );
    return settings.toObject() as unknown as IUserSettings;
  }

  // Achievements and gamification
  async getAchievements(userId: string): Promise<IAchievement[]> {
    const achievements = await Achievement.find({ userId });
    return achievements.map(
      (achievement) => achievement.toObject() as unknown as IAchievement
    );
  }

  async createAchievement(
    achievementData: Omit<IAchievement, "_id" | "createdAt" | "updatedAt">
  ): Promise<IAchievement> {
    const achievement = new Achievement(achievementData);
    const savedAchievement = await achievement.save();
    return savedAchievement.toObject() as unknown as IAchievement;
  }

  async updateAchievementProgress(
    userId: string,
    badgeId: string,
    progress: number
  ): Promise<IAchievement> {
    const achievement = await Achievement.findOneAndUpdate(
      { userId, badgeId },
      { progress },
      { new: true }
    );
    if (!achievement) {
      throw new Error("Achievement not found");
    }
    return achievement.toObject() as unknown as IAchievement;
  }

  async unlockAchievement(
    userId: string,
    badgeId: string
  ): Promise<IAchievement> {
    const achievement = await Achievement.findOneAndUpdate(
      { userId, badgeId },
      {
        isUnlocked: true,
        earnedAt: new Date(),
      },
      { new: true }
    );
    if (!achievement) {
      throw new Error("Achievement not found");
    }
    return achievement.toObject() as unknown as IAchievement;
  }

  // User progress
  async getUserProgress(userId: string): Promise<IUserProgress | undefined> {
    const progress = await UserProgress.findOne({ userId });
    return progress?.toObject() as unknown as IUserProgress | undefined;
  }

  async upsertUserProgress(
    progressData: Omit<IUserProgress, "_id" | "createdAt" | "updatedAt">
  ): Promise<IUserProgress> {
    const progress = await UserProgress.findOneAndUpdate(
      { userId: progressData.userId },
      progressData,
      { upsert: true, new: true }
    );
    return progress.toObject() as unknown as IUserProgress;
  }

  async updateUserStats(
    userId: string,
    formsCompleted: number,
    points: number
  ): Promise<IUserProgress> {
    const existingProgress = await this.getUserProgress(userId);

    const newTotalForms =
      (existingProgress?.totalFormsCompleted || 0) + formsCompleted;
    const newTotalPoints = (existingProgress?.totalPoints || 0) + points;
    const newExperiencePoints =
      (existingProgress?.experiencePoints || 0) + points;

    // Calculate level based on experience points (every 100 XP = 1 level)
    const newLevel = Math.floor(newExperiencePoints / 100) + 1;

    // Update streak logic
    const today = new Date();
    const lastActivity = existingProgress?.lastActivityDate;
    let newCurrentStreak = 1;

    if (lastActivity) {
      const daysDiff = Math.floor(
        (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff === 1) {
        newCurrentStreak = (existingProgress?.currentStreak || 0) + 1;
      } else if (daysDiff > 1) {
        newCurrentStreak = 1;
      } else {
        newCurrentStreak = existingProgress?.currentStreak || 1;
      }
    }

    const newLongestStreak = Math.max(
      newCurrentStreak,
      existingProgress?.longestStreak || 0
    );

    return await this.upsertUserProgress({
      userId: new mongoose.Types.ObjectId(userId),
      totalFormsCompleted: newTotalForms,
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      totalPoints: newTotalPoints,
      level: newLevel,
      experiencePoints: newExperiencePoints,
      lastActivityDate: today,
    });
  }
}

export const storage = new MongoDBStorage();
