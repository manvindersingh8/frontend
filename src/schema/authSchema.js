import { z } from "zod";
import { ROLES } from "../constants/constants";

export const registerSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters")
    .max(32, "Username cannot exceed 32 characters"),

  fullname: z
    .string()
    .min(1, "Full name is required")
    .refine((val) => val.trim().length > 0, {
      message: "Full name cannot be empty",
    }),

  email: z.string().email("Please enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  role: z.enum(Object.values(ROLES), {
    errorMap: () => ({ message: "Please select a role" }),
  }),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});
