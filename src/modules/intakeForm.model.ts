import mongoose, { Document, Schema, Types } from "mongoose";

export interface IIntakeForm extends Document {
  userId: Types.ObjectId;

  // Patient Information
  patientId: string;
  injuryId: string;
  fullName: string;
  dateOfExamination: Date;
  race: string;
  maritalStatus: string;
  numberOfChildren: number;

  // Medical Information
  hearingImpairment: boolean;
  hearingAids: boolean;
  glassesOrContacts: boolean;

  // Employment/Education
  occupation: string;
  employer: string;
  employerAddress: string;
  enrolledInSchool: boolean;
  school: string;

  // Physical Symptoms
  headache?: number; // 0-6 severity scale
  pressureInHead?: number;
  neckPain?: number;
  troubleFallingAsleep?: number;
  drowsiness?: number;
  nauseaOrVomiting?: number;
  fatigueOrLowEnergy?: number;
  dizziness?: number;
  blurredVision?: number;
  balanceProblems?: number;
  sensitivityToLight?: number;
  sensitivityToNoise?: number;
  feelingSlowedDown?: number;
  feelingInAFog?: number;
  dontFeelRight?: number;
  difficultyConcentrating?: number;
  difficultyRemembering?: number;
  confusion?: number;
  moreEmotional?: number;
  irritability?: number;
  sadnessOrDepression?: number;
  nervousOrAnxious?: number;

  // Activity Impact
  symptomsWorseWithPhysicalActivity?: boolean;
  symptomsWorseWithMentalActivity?: boolean;

  // Calculated Scores
  totalSymptoms?: number;
  symptomSeverityScore?: number;

  // Form Metadata
  status?: "pending" | "completed" | "overdue";
  completedAt?: Date;
}

const intakeFormSchema = new Schema<IIntakeForm>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // Patient Information
    patientId: {
      type: String,
      required: true,
    },
    injuryId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfExamination: {
      type: Date,
      required: true,
    },
    race: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: false,
    },
    numberOfChildren: {
      type: Number,
      required: true,
      default: 0,
    },

    // Medical Information
    hearingImpairment: {
      type: Boolean,
      required: true,
      default: false,
    },
    hearingAids: {
      type: Boolean,
      required: true,
      default: false,
    },
    glassesOrContacts: {
      type: Boolean,
      required: true,
      default: false,
    },

    // Employment/Education
    occupation: {
      type: String,
      required: true,
    },
    employer: {
      type: String,
      required: false,
    },
    employerAddress: {
      type: String,
      required: false,
    },
    enrolledInSchool: {
      type: Boolean,
      required: true,
      default: false,
    },
    school: {
      type: String,
      required: false,
    },

    // Physical Symptoms (0-6 severity scale)
    headache: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    pressureInHead: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    neckPain: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    troubleFallingAsleep: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    drowsiness: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    nauseaOrVomiting: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    fatigueOrLowEnergy: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    dizziness: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    blurredVision: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    balanceProblems: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    sensitivityToLight: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    sensitivityToNoise: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    feelingSlowedDown: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    feelingInAFog: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    dontFeelRight: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    difficultyConcentrating: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    difficultyRemembering: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    confusion: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    moreEmotional: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    irritability: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    sadnessOrDepression: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },
    nervousOrAnxious: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 6,
    },

    // Activity Impact
    symptomsWorseWithPhysicalActivity: {
      type: Boolean,
      required: false,
      default: false,
    },
    symptomsWorseWithMentalActivity: {
      type: Boolean,
      required: false,
      default: false,
    },

    // Calculated Scores
    totalSymptoms: {
      type: Number,
      required: false,
      default: 0,
    },
    symptomSeverityScore: {
      type: Number,
      required: false,
      default: 0,
    },

    // Form Metadata
    status: {
      type: String,
      enum: ["pending", "completed", "overdue"],
      default: "pending",
      required: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IIntakeForm>("IntakeForm", intakeFormSchema);
