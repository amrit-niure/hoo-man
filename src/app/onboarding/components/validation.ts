// validation.ts
import { z } from "zod";

export const addCompanySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  website: z.string().optional(),
  taxNumber: z.string().optional(),
  registrationNo: z.string().optional(),
  description: z.string().optional(),
  industry: z.string().optional(),
  foundedDate: z.date({ required_error: "Founded date is required" }),
});

export type IAddCompany = z.infer<typeof addCompanySchema>;