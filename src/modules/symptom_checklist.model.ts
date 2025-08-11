import mongoose, { Document } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface SymptomChecklist extends Document {
  symptomChecklistId: string;
  userId: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  patientId: string;
  injuryId: string;
  headache: number;
  pressureInHead: number;
  neckPain: number;
  troubleFallingAsleep: number;
  drowsiness: number;
  nauseaOrVomiting: number;
  fatigueOrLowEnergy: number;
  dizziness: number;
  blurredVision: number;
  balanceProblems: number;
  sensitivityToLight: number;
  sensitivityToNoise: number;
  feelingSlowedDown: number;
  feelingInAFog: number;
  dontFeelRight: number;
  difficultyConcentrating: number;
  difficultyRemembering: number;
  confusion: number;
  moreEmotional: number;
  irritability: number;
  sadnessOrDepression: number;
  nervousOrAnxious: number;
  worseWithPhysicalActivity: boolean;
  worseWithSocialSituations: boolean;
  totalSymptoms: number;
  symptomSeverityScore: number;
  decryptFieldsSync: () => void;
}

const symptomChecklistSchema = new mongoose.Schema(
  {
    symptomChecklistId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, required: true },
    patientId: { type: String, required: true },
    injuryId: { type: String, required: true },
    headache: { type: Number, default: 0 },
    pressureInHead: { type: Number, default: 0 },
    neckPain: { type: Number, default: 0 },
    troubleFallingAsleep: { type: Number, default: 0 },
    drowsiness: { type: Number, default: 0 },
    nauseaOrVomiting: { type: Number, default: 0 },
    fatigueOrLowEnergy: { type: Number, default: 0 },
    dizziness: { type: Number, default: 0 },
    blurredVision: { type: Number, default: 0 },
    balanceProblems: { type: Number, default: 0 },
    sensitivityToLight: { type: Number, default: 0 },
    sensitivityToNoise: { type: Number, default: 0 },
    feelingSlowedDown: { type: Number, default: 0 },
    feelingInAFog: { type: Number, default: 0 },
    dontFeelRight: { type: Number, default: 0 },
    difficultyConcentrating: { type: Number, default: 0 },
    difficultyRemembering: { type: Number, default: 0 },
    confusion: { type: Number, default: 0 },
    moreEmotional: { type: Number, default: 0 },
    irritability: { type: Number, default: 0 },
    sadnessOrDepression: { type: Number, default: 0 },
    nervousOrAnxious: { type: Number, default: 0 },
    worseWithPhysicalActivity: { type: Boolean, default: false },
    worseWithSocialSituations: { type: Boolean, default: false },
    totalSymptoms: { type: Number, default: 0 },
    symptomSeverityScore: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

symptomChecklistSchema.plugin(fieldEncryption, {
  fields: [
    "headache",
    "pressureInHead",
    "neckPain",
    "troubleFallingAsleep",
    "drowsiness",
    "nauseaOrVomiting",
    "fatigueOrLowEnergy",
    "dizziness",
    "blurredVision",
    "balanceProblems",
    "sensitivityToLight",
    "sensitivityToNoise",
    "feelingSlowedDown",
    "feelingInAFog",
    "dontFeelRight",
    "difficultyConcentrating",
    "difficultyRemembering",
    "confusion",
    "moreEmotional",
    "irritability",
    "sadnessOrDepression",
    "nervousOrAnxious",
    "worseWithPhysicalActivity",
    "worseWithSocialSituations",
    "totalSymptoms",
    "symptomSeverityScore",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

symptomChecklistSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    symptomChecklistId: this.symptomChecklistId,
    userId: this.userId,
    adminId: this.adminId,
    patientId: this.patientId,
    injuryId: this.injuryId,
    headache: this.headache,
    pressureInHead: this.pressureInHead,
    neckPain: this.neckPain,
    troubleFallingAsleep: this.troubleFallingAsleep,
    drowsiness: this.drowsiness,
    nauseaOrVomiting: this.nauseaOrVomiting,
    fatigueOrLowEnergy: this.fatigueOrLowEnergy,
    dizziness: this.dizziness,
    blurredVision: this.blurredVision,
    balanceProblems: this.balanceProblems,
    sensitivityToLight: this.sensitivityToLight,
    sensitivityToNoise: this.sensitivityToNoise,
    feelingSlowedDown: this.feelingSlowedDown,
    feelingInAFog: this.feelingInAFog,
    dontFeelRight: this.dontFeelRight,
    difficultyConcentrating: this.difficultyConcentrating,
    difficultyRemembering: this.difficultyRemembering,
    confusion: this.confusion,
    moreEmotional: this.moreEmotional,
    irritability: this.irritability,
    sadnessOrDepression: this.sadnessOrDepression,
    nervousOrAnxious: this.nervousOrAnxious,
    worseWithPhysicalActivity: this.worseWithPhysicalActivity,
    worseWithSocialSituations: this.worseWithSocialSituations,
    totalSymptoms: this.totalSymptoms,
    symptomSeverityScore: this.symptomSeverityScore,
  };
};

export default mongoose.model<SymptomChecklist>(
  "SymptomChecklist",
  symptomChecklistSchema
);
