import mongoose, { Schema, Document ,Types} from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";

export interface ISurgicalHistory extends Document {
  surgeryID: string;
  patientId: string;
  userId: Types.ObjectId;
  adminId: Types.ObjectId;
  surgeryDate: string;
  bodyPart: string;
  procedurePerformed: string;
  decryptFieldsSync: () => void;
}

const surgicalHistorySchema = new Schema<ISurgicalHistory>(
  {
    surgeryID: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    surgeryDate: {
      type: String,
    },
    bodyPart: {
      type: String,
    },
    procedurePerformed: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

surgicalHistorySchema.plugin(fieldEncryption, {
  fields: ["surgeryDate", "bodyPart", "procedurePerformed"],
  secret: process.env.ENCRYPTION_SECRET,
  saltGenerator: () => process.env.ENCRYPTION_SALT,
});

surgicalHistorySchema.methods.getDecryptedData = function () {
  this.decryptFieldsSync();
  return {
    surgeryID: this.surgeryID,
    patientId: this.patientId,
    userId: this.userId,
    adminId: this.adminId,
    surgeryDate: this.surgeryDate,
    bodyPart: this.bodyPart,
    procedurePerformed: this.procedurePerformed,
  };
};

export default mongoose.model<ISurgicalHistory>(
  "surgicalHistory",
  surgicalHistorySchema
);
