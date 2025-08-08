import { z } from "zod";

export const createPatientInfoFormSchema = z.object({
  fullName: z.string().min(2).optional(),
  dateOfExamination: z.date().optional(),
  race: z.string().optional(),
  maritalStatus: z
    .enum(["single", "married", "divorced", "widowed"])
    .optional(),
  numberOfChildren: z.number().min(0).max(10).optional(),
  hearingImpairment: z.boolean().optional(),
  hearingAids: z.boolean().optional(),
  glassesOrContacts: z.boolean().optional(),
  occupation: z.string().optional(),
  employer: z.string().optional(),
  employerAddress: z.string().optional(),
  enrolledInSchool: z.boolean().optional(),
  school: z.string().optional(),
});
