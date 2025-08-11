import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface ISleepDisturbance extends Document {
  sleepDisturbanceId: string;
  userId: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  patientId: string;
  hasSleepDisturbance: boolean;
  difficultyFallingAsleep: boolean;
  fallingAsleepSeverity: number;
  fallingAsleepProgression: string;
  difficultyStayingAsleep: boolean;
  stayingAsleepSeverity: number;
  stayingAsleepProgression: string;
  nightmares: boolean;
  nightmaresSeverity: number;
  nightmaresProgression: string;
  actsOutDreams: boolean;
  actsOutDreamsSeverity: number;
  actsOutDreamsProgression: string;
  earlyMorningWakening: boolean;
  earlyWakeningSeverity: number;
  earlyWakeningProgression: string;
  daytimeDrowsiness: boolean;
  drowsinessSeverity: number;
  drowsinessProgression: string;
  naps: boolean;
  numberOfNaps: number;
  decryptFieldsSync: () => void;
}

const sleepDisturbanceSchema = new mongoose.Schema<ISleepDisturbance>({
  sleepDisturbanceId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminUsers",
    required: true,
  },
  patientId: { type: String, required: true },
  hasSleepDisturbance: { type: Boolean, default: false },
  difficultyFallingAsleep: { type: Boolean, default: false },
  fallingAsleepSeverity: { type: Number, default: 0 },
  fallingAsleepProgression: { type: String, default: "" },
  difficultyStayingAsleep: { type: Boolean, default: false },
  stayingAsleepSeverity: { type: Number, default: 0 },
  stayingAsleepProgression: { type: String, default: "" },
  nightmares: { type: Boolean, default: false },
  nightmaresSeverity: { type: Number, default: 0 },
  nightmaresProgression: { type: String, default: "" },
  actsOutDreams: { type: Boolean, default: false },
  actsOutDreamsSeverity: { type: Number, default: 0 },
  actsOutDreamsProgression: { type: String, default: "" },
  earlyMorningWakening: { type: Boolean, default: false },
  earlyWakeningSeverity: { type: Number, default: 0 },
  earlyWakeningProgression: { type: String, default: "" },
  daytimeDrowsiness: { type: Boolean, default: false },
  drowsinessSeverity: { type: Number, default: 0 },
  drowsinessProgression: { type: String, default: "" },
  naps: { type: Boolean, default: false },
  numberOfNaps: { type: Number, default: 0 },
});

sleepDisturbanceSchema.plugin(fieldEncryption, {
  fields: [
    "hasSleepDisturbance",
    "difficultyFallingAsleep",
    "fallingAsleepSeverity",
    "fallingAsleepProgression",
    "difficultyStayingAsleep",
    "stayingAsleepSeverity",
    "stayingAsleepProgression",
    "nightmares",
    "nightmaresSeverity",
    "nightmaresProgression",
    "actsOutDreams",
    "actsOutDreamsSeverity",
    "actsOutDreamsProgression",
    "earlyMorningWakening",
    "earlyWakeningSeverity",
    "earlyWakeningProgression",
    "daytimeDrowsiness",
    "drowsinessSeverity",
    "drowsinessProgression",
    "naps",
    "numberOfNaps",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

sleepDisturbanceSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    sleepDisturbanceId: this.sleepDisturbanceId,
    userId: this.userId,
    adminId: this.adminId,
    patientId: this.patientId,
    hasSleepDisturbance: this.hasSleepDisturbance,
    difficultyFallingAsleep: this.difficultyFallingAsleep,
    fallingAsleepSeverity: this.fallingAsleepSeverity,
    fallingAsleepProgression: this.fallingAsleepProgression,
    difficultyStayingAsleep: this.difficultyStayingAsleep,
    stayingAsleepSeverity: this.stayingAsleepSeverity,
    stayingAsleepProgression: this.stayingAsleepProgression,
    nightmares: this.nightmares,
    nightmaresSeverity: this.nightmaresSeverity,
    nightmaresProgression: this.nightmaresProgression,
    actsOutDreams: this.actsOutDreams,
    actsOutDreamsSeverity: this.actsOutDreamsSeverity,
    actsOutDreamsProgression: this.actsOutDreamsProgression,
    earlyMorningWakening: this.earlyMorningWakening,
    earlyWakeningSeverity: this.earlyWakeningSeverity,
    earlyWakeningProgression: this.earlyWakeningProgression,
    daytimeDrowsiness: this.daytimeDrowsiness,
    drowsinessSeverity: this.drowsinessSeverity,
    drowsinessProgression: this.drowsinessProgression,
    naps: this.naps,
    numberOfNaps: this.numberOfNaps,
  };
};

export default mongoose.model<ISleepDisturbance>(
  "sleepDisturbance",
  sleepDisturbanceSchema
);
