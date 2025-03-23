// schemas.ts
import { Department, EmployeeStatus } from "@prisma/client";
import { z } from "zod";

// Define the schema for employee registration
export const addEmployeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  dateOfBirth: z.coerce.date({ required_error: "Date of birth is required" }),
  joinDate: z.coerce.date({ required_error: "Join date is required" }),
  department: z.nativeEnum(Department),
  position: z.string().min(2, "Position must be at least 2 characters"),
});

// Infer the TypeScript type from the schema
export type IAddEmployee = z.infer<typeof addEmployeeSchema>;



// components/validation.ts
// Add this alongside your existing schemas

export const updateEmployeeSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  dateOfBirth: z.date(),
  joinDate: z.date(),
  department: z.nativeEnum(Department),
  position: z.string().min(2, "Position must be at least 2 characters"),
  status: z.nativeEnum(EmployeeStatus),
});

export type IUpdateEmployee = z.infer<typeof updateEmployeeSchema>;
