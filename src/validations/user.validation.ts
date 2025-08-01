import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).min(2),
  lastName: z.string({ required_error: "Last name is required" }).min(2),
  dateOfBirth: z.string({ required_error: "Date of birth is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  phoneNumber: z.string({ required_error: "Phone number is required" }).min(10),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const loginSchema = z.object({
  patientId: z
    .string({ required_error: "Patient ID is required" })
    .min(8, { message: "Patient ID must be at least 8 characters long" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const admin_signup_schema = z.object({
  fullName: z.string({ required_error: "Full name is required" }).min(2),
  userName: z.string({ required_error: "Username is required" }).min(2),
  email: z.string({ required_error: "Email is required" }).email(),
  phoneNumber: z.string({ required_error: "Phone number is required" }).min(10),
  speciality: z.string().optional(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const admin_login_schema = z.object({
  userName: z.string({ required_error: "Username is required" }).min(2),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});
