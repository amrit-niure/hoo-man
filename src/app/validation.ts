import { z } from "zod"

export const demoFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  companyName: z.string().optional(),
  phoneNumber: z.string().optional(),
  preferredDate: z.date({
    required_error: "Please select a date and time for your demo.",
  }),
  notes: z.string().optional(),
})

export type DemoFormValues = z.infer<typeof demoFormSchema>