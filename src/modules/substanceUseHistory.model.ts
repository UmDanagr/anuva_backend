import mongoose, { Document } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import { idGenerator } from "../services/id.generator.js";

export interface ISubstanceUseHistory extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
  SubstanceHistoryID: string;
  patientId: string;
  usesAlcohol: boolean;
  alcoholDaysPerWeek: number;
  alcoholDrinksPerOccasion: number;
  alcoholAgeFirstUse: number;
  alcoholAgeLastUse: number;
  alcoholLongestSobriety: string;
  alcoholCurrentlySober: boolean;
  alcoholLastUse: string;
  alcoholBinges: boolean;
  alcoholBlackouts: boolean;
  alcoholDeliriumTremens: boolean;
  alcoholRelatedSeizures: boolean;
  usesNicotine: boolean;
  nicotineAgeFirstUse: number;
  nicotineType: string;
  nicotineAmountPerDay: string;
  nicotineLastUse: string;
  usesSteroids: boolean;
  steroidsAgeFirstUse: number;
  steroidsFrequency: string;
  steroidsDuration: string;
  steroidsLastUse: string;
  usesOtherSubstances: boolean;
  substancesUsed: string;
  substancesAgeFirstUse: number;
  substancesTypicalAmount: string;
  substancesFrequency: string;
  substancesLongestSobriety: string;
  substancesCurrentlySober: boolean;
  substancesLastUse: string;
  decryptFieldsSync: () => void;
}

const substanceUseHistorySchema = new mongoose.Schema<ISubstanceUseHistory>(
  {
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
    SubstanceHistoryID: {
      type: String,
      required: true,
      unique: true,
      default: idGenerator(),
    },
    patientId: { type: String, required: true },
    usesAlcohol: { type: Boolean, default: false },
    alcoholDaysPerWeek: { type: Number },
    alcoholDrinksPerOccasion: { type: Number },
    alcoholAgeFirstUse: { type: Number },
    alcoholAgeLastUse: { type: Number },
    alcoholLongestSobriety: { type: String },
    alcoholCurrentlySober: { type: Boolean, default: false },
    alcoholLastUse: { type: String },
    alcoholBinges: { type: Boolean, default: false },
    alcoholBlackouts: { type: Boolean, default: false },
    alcoholDeliriumTremens: { type: Boolean, default: false },
    alcoholRelatedSeizures: { type: Boolean, default: false },
    usesNicotine: { type: Boolean, default: false },
    nicotineAgeFirstUse: { type: Number },
    nicotineType: { type: String },
    nicotineAmountPerDay: { type: String },
    nicotineLastUse: { type: String },
    usesSteroids: { type: Boolean, default: false },
    steroidsAgeFirstUse: { type: Number },
    steroidsFrequency: { type: String },
    steroidsDuration: { type: String },
    steroidsLastUse: { type: String },
    usesOtherSubstances: { type: Boolean, default: false },
    substancesUsed: { type: String },
    substancesAgeFirstUse: { type: Number },
    substancesTypicalAmount: { type: String },
    substancesFrequency: { type: String },
    substancesLongestSobriety: { type: String },
    substancesCurrentlySober: { type: Boolean, default: false },
    substancesLastUse: { type: String },
  },
  {
    timestamps: true,
  }
);

substanceUseHistorySchema.plugin(fieldEncryption, {
  fields: [
    "usesAlcohol",
    "alcoholLongestSobriety",
    "alcoholLastUse",
    "substancesLongestSobriety",
    "substancesLastUse",
    "alcoholDaysPerWeek",
    "alcoholDrinksPerOccasion",
    "alcoholAgeFirstUse",
    "alcoholAgeLastUse",
    "alcoholBinges",
    "alcoholBlackouts",
    "alcoholDeliriumTremens",
    "alcoholRelatedSeizures",
    "usesNicotine",
    "nicotineAgeFirstUse",
    "nicotineType",
    "nicotineAmountPerDay",
    "nicotineLastUse",
    "usesSteroids",
    "steroidsAgeFirstUse",
    "steroidsFrequency",
    "steroidsDuration",
    "steroidsLastUse",
    "usesOtherSubstances",
    "substancesUsed",
    "substancesAgeFirstUse",
    "substancesTypicalAmount",
    "substancesFrequency",
    "substancesCurrentlySober",
    "substancesLastUse",
  ],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

substanceUseHistorySchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    userId: this.userId,
    adminId: this.adminId,
    SubstanceHistoryID: this.SubstanceHistoryID,
    patientId: this.patientId,
    usesAlcohol: this.usesAlcohol,
    alcoholDaysPerWeek: this.alcoholDaysPerWeek,
    alcoholDrinksPerOccasion: this.alcoholDrinksPerOccasion,
    alcoholAgeFirstUse: this.alcoholAgeFirstUse,
    alcoholAgeLastUse: this.alcoholAgeLastUse,
    alcoholLongestSobriety: this.alcoholLongestSobriety,
    alcoholCurrentlySober: this.alcoholCurrentlySober,
    alcoholLastUse: this.alcoholLastUse,
    alcoholBinges: this.alcoholBinges,
    alcoholBlackouts: this.alcoholBlackouts,
    alcoholDeliriumTremens: this.alcoholDeliriumTremens,
    alcoholRelatedSeizures: this.alcoholRelatedSeizures,
    usesNicotine: this.usesNicotine,
    nicotineAgeFirstUse: this.nicotineAgeFirstUse,
    nicotineType: this.nicotineType,
    nicotineAmountPerDay: this.nicotineAmountPerDay,
    nicotineLastUse: this.nicotineLastUse,
    usesSteroids: this.usesSteroids,
    steroidsAgeFirstUse: this.steroidsAgeFirstUse,
    steroidsFrequency: this.steroidsFrequency,
    steroidsDuration: this.steroidsDuration,
    steroidsLastUse: this.steroidsLastUse,
    usesOtherSubstances: this.usesOtherSubstances,
    substancesUsed: this.substancesUsed,
    substancesAgeFirstUse: this.substancesAgeFirstUse,
    substancesTypicalAmount: this.substancesTypicalAmount,
    substancesFrequency: this.substancesFrequency,
    substancesLongestSobriety: this.substancesLongestSobriety,
    substancesCurrentlySober: this.substancesCurrentlySober,
    substancesLastUse: this.substancesLastUse,
  };
};

export default mongoose.model<ISubstanceUseHistory>(
  "substanceUseHistory",
  substanceUseHistorySchema
);
