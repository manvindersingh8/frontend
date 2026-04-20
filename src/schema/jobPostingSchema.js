import { z } from "zod";
import {
  EXPERIENCE_LEVELS,
  JOB_TYPES,
  WORK_MODES,
} from "@/constants/constants";

export const jobPostingSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, "Min 10 characters")
    .max(64, "Title too long"),

  description: z
    .string()
    .trim()
    .min(50, "At least 50 characters")
    .max(500, "Description too long"),

  location: z.string().trim().min(2, "Location is required"),

  company: z.string().trim().min(2, "Company name is required"),

  jobType: z.enum(Object.values(JOB_TYPES)),

  experienceLevel: z.enum(Object.values(EXPERIENCE_LEVELS)),

  salary: z
    .object({
      min: z.coerce.number().min(1, "Min salary required"),
      max: z.coerce.number().min(1, "Max salary required"),
    })
    .refine((data) => data.max >= data.min, {
      message: "Max salary must be greater than min salary",
      path: ["max"],
    }),

  skills: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((s) => s.trim()) : [])),

  workMode: z.enum(Object.values(WORK_MODES)).optional(),
});
