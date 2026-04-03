import { z } from "zod";
import { ROLES } from "../constants/constants";

export const registerSchema = z.object({
  username: z.string().min(6, "Min 6 chars").max(32, "Max 32 chars"),
  fullname: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
  role: z.enum(Object.values(ROLES)).default(ROLES.JOBSEEKER),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
});
