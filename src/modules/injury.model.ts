import mongoose, { Document, Types } from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface IInjury extends Document {
  userId: Types.ObjectId;
  adminId: Types.ObjectId;
  injuryId: string;
  patientId: string;
  dateOfInjury: Date;
  sportOrActivity?: string;
  setting: string;
  settingDetails?: string;
  position?: string;
  injuryDescription?: string;
  impactType?: string;
  impactDetails?: string;
  locationOfContact?: string;
  looseOfConsciousness?: boolean;
  LOCduration?: string;
  troubleRemembering?: boolean;
  memoryTroubleDuration?: string;
  feelFocussed?: boolean;
  confusionDuration?: string;
  stoppedParticipation?: boolean;
  stopDuration?: string;
  returnToParticipation?: boolean;
  returnDuration?: string;
  emergencyRoomVisit?: boolean;
  ERdetails?: string;
  testPerformed?: boolean;
  decryptFieldsSync: () => void;
  getDecryptedData: () => any;
}

const injurySchema = new mongoose.Schema(
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
    injuryId: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
    },
    dateOfInjury: {
      type: Date,
      default: Date.now,
    },
    sportOrActivity: {
      type: String,
    },
    setting: {
      type: String,
      required: true,
      enum: ["game", "practice", "other"],
    },
    settingDetails: {
      type: String,
    },
    position: {
      type: String,
    },
    injuryDescription: {
      type: String,
    },
    impactType: {
      type: String,
    },
    impactDetails: {
      type: String,
    },
    locationOfContact: {
      type: String,
    },
    looseOfConsciousness: {
      type: Boolean,
    },
    LOCduration: {
      type: String,
    },
    troubleRemembering: {
      type: Boolean,
    },
    memoryTroubleDuration: {
      type: String,
    },
    feelFocussed: {
      type: Boolean,
    },
    confusionDuration: {
      type: String,
    },
    stoppedParticipation: {
      type: Boolean,
    },
    stopDuration: {
      type: String,
    },
    returnToParticipation: {
      type: Boolean,
    },
    returnDuration: {
      type: String,
    },
    emergencyRoomVisit: {
      type: Boolean,
    },
    ERdetails: {
      type: String,
    },
    testPerformed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const encryptionKey = process.env.ENCRYPTION_SECRET;

injurySchema.plugin(fieldEncryption, {
  fields: [
    "sportOrActivity",
    "setting",
    "settingDetails",
    "position",
    "injuryDescription",
    "impactType",
    "impactDetails",
    "locationOfContact",
    "LOCduration",
    "memoryTroubleDuration",
    "confusionDuration",
    "stopDuration",
    "returnDuration",
    "ERdetails",
  ],
  secret: encryptionKey,
  saltGenerator: () => "1234567890abcdef",
});

injurySchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    sportOrActivity: this.sportOrActivity,
    setting: this.setting,
    settingDetails: this.settingDetails,
    position: this.position,
    injuryDescription: this.injuryDescription,
    impactType: this.impactType,
    impactDetails: this.impactDetails,
    locationOfContact: this.locationOfContact,
    LOCduration: this.LOCduration,
    memoryTroubleDuration: this.memoryTroubleDuration,
    confusionDuration: this.confusionDuration,
    stopDuration: this.stopDuration,
    returnDuration: this.returnDuration,
    ERdetails: this.ERdetails,
  };
};

export default mongoose.model<IInjury>("injuries", injurySchema);
