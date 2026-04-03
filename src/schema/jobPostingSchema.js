import { z } from "zod";

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

  salary: z.coerce.number().min(1, "Enter valid salary"),

  location: z.string().trim().min(2, "Location is required"),

  company: z.string().trim().min(2, "Company name is required"),
});
