import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface IAdditionalSymptoms extends Document {
  additionalSymptomsId: string;
  userId: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  patientId: string;
  injuryId: string;
  generalSomatic: number;
  painLocation: string;
  painInOtherParts: number;
  problemsWithSleeping: number;
  primaryNeurologicalSymptoms: number;
  gaitOrBalanceProblems: number;
  visionLossOrChange: number;
  hearingLossOrChange: number;
  lossOfSmellOrTaste: number;
  speechChanges: number;
  weakness: number;
  tremors: number;
  bowelOrBladderDisturbances: number;
  sexualDysfunction: number;
  difficultyPlanningAndOrganizing: number;
  difficultyAnticipatingConsequences: number;
  wordFindingDifficulties: number;
  difficultyUnderstandingConversations: number;
  lostInFamiliarEnvironment: number;
  lossOfAppetite: number;
  suicidalOrHomicidalThoughts: number;
  verballyOrPhysicallyAggressive: number;
  personalityChanges: number;
  disInhibition: number;
  avoidanceBehaviors: number;
  intrusiveDistressingThoughts: number;
  repetitiveMotorActivity: number;
  worseWithPhysicalActivity: boolean;
  worseWithMentalActivity: boolean;
  totalSymptoms: number;
  symptomSeverityScore: number;
  decryptFieldsSync: () => void;
  getDecryptedData: () => any;
}

const additionalSymptomsSchema = new mongoose.Schema<IAdditionalSymptoms>(
  {
    additionalSymptomsId: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminUsers",
      required: true,
    },
    patientId: { type: String, required: true },
    injuryId: { type: String, required: true },
    generalSomatic: { type: Number, default: 0 },
    painLocation: { type: String },
    painInOtherParts: { type: Number, default: 0 },
    problemsWithSleeping: { type: Number, default: 0 },
    primaryNeurologicalSymptoms: { type: Number, default: 0 },
    gaitOrBalanceProblems: { type: Number, default: 0 },
    visionLossOrChange: { type: Number, default: 0 },
    hearingLossOrChange: { type: Number, default: 0 },
    lossOfSmellOrTaste: { type: Number, default: 0 },
    speechChanges: { type: Number, default: 0 },
    weakness: { type: Number, default: 0 },
    tremors: { type: Number, default: 0 },
    bowelOrBladderDisturbances: { type: Number, default: 0 },
    sexualDysfunction: { type: Number, default: 0 },
    difficultyPlanningAndOrganizing: { type: Number, default: 0 },
    difficultyAnticipatingConsequences: { type: Number, default: 0 },
    wordFindingDifficulties: { type: Number, default: 0 },
    difficultyUnderstandingConversations: { type: Number, default: 0 },
    lostInFamiliarEnvironment: { type: Number, default: 0 },
    lossOfAppetite: { type: Number, default: 0 },
    suicidalOrHomicidalThoughts: { type: Number, default: 0 },
    verballyOrPhysicallyAggressive: { type: Number, default: 0 },
    personalityChanges: { type: Number, default: 0 },
    disInhibition: { type: Number, default: 0 },
    avoidanceBehaviors: { type: Number, default: 0 },
    intrusiveDistressingThoughts: { type: Number, default: 0 },
    repetitiveMotorActivity: { type: Number, default: 0 },
    worseWithPhysicalActivity: { type: Boolean, default: false },
    worseWithMentalActivity: { type: Boolean, default: false },
    totalSymptoms: { type: Number, default: 0 },
    symptomSeverityScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

additionalSymptomsSchema.plugin(fieldEncryption, {
  fields: [
    "generalSomatic",
    "painInOtherParts",
    "problemsWithSleeping",
    "primaryNeurologicalSymptoms",
    "gaitOrBalanceProblems",
    "visionLossOrChange",
    "hearingLossOrChange",
    "lossOfSmellOrTaste",
    "speechChanges",
    "weakness",
    "tremors",
    "bowelOrBladderDisturbances",
    "sexualDysfunction",
    "difficultyPlanningAndOrganizing",
    "difficultyAnticipatingConsequences",
    "wordFindingDifficulties",
    "difficultyUnderstandingConversations",
    "lostInFamiliarEnvironment",
    "lossOfAppetite",
    "suicidalOrHomicidalThoughts",
    "verballyOrPhysicallyAggressive",
    "personalityChanges",
    "disInhibition",
    "avoidanceBehaviors",
    "intrusiveDistressingThoughts",
    "repetitiveMotorActivity",
    "worseWithPhysicalActivity",
    "worseWithMentalActivity",
    "totalSymptoms",
    "symptomSeverityScore",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

additionalSymptomsSchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    additionalSymptomsId: this.additionalSymptomsId,
    userId: this.userId,
    adminId: this.adminId,
    patientId: this.patientId,
    injuryId: this.injuryId,
    generalSomatic: this.generalSomatic,
    painLocation: this.painLocation,
    painInOtherParts: this.painInOtherParts,
    problemsWithSleeping: this.problemsWithSleeping,
    primaryNeurologicalSymptoms: this.primaryNeurologicalSymptoms,
    gaitOrBalanceProblems: this.gaitOrBalanceProblems,
    visionLossOrChange: this.visionLossOrChange,
    hearingLossOrChange: this.hearingLossOrChange,
    lossOfSmellOrTaste: this.lossOfSmellOrTaste,
    speechChanges: this.speechChanges,
    weakness: this.weakness,
    tremors: this.tremors,
    bowelOrBladderDisturbances: this.bowelOrBladderDisturbances,
    sexualDysfunction: this.sexualDysfunction,
    difficultyPlanningAndOrganizing: this.difficultyPlanningAndOrganizing,
    difficultyAnticipatingConsequences: this.difficultyAnticipatingConsequences,
    wordFindingDifficulties: this.wordFindingDifficulties,
    difficultyUnderstandingConversations:
      this.difficultyUnderstandingConversations,
    lostInFamiliarEnvironment: this.lostInFamiliarEnvironment,
    lossOfAppetite: this.lossOfAppetite,
    suicidalOrHomicidalThoughts: this.suicidalOrHomicidalThoughts,
    verballyOrPhysicallyAggressive: this.verballyOrPhysicallyAggressive,
    personalityChanges: this.personalityChanges,
    disInhibition: this.disInhibition,
    avoidanceBehaviors: this.avoidanceBehaviors,
    intrusiveDistressingThoughts: this.intrusiveDistressingThoughts,
    repetitiveMotorActivity: this.repetitiveMotorActivity,
    worseWithPhysicalActivity: this.worseWithPhysicalActivity,
    worseWithMentalActivity: this.worseWithMentalActivity,
    totalSymptoms: this.totalSymptoms,
    symptomSeverityScore: this.symptomSeverityScore,
  };
};

export default mongoose.model<IAdditionalSymptoms>(
  "additionalsymptoms",
  additionalSymptomsSchema
);
