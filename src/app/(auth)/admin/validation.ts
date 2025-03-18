import * as z from "zod";

export const signInFormSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
export type ISignIn = z.infer<typeof signInFormSchema>;


export const signUpFormSchema = z.object({
    orgName: z.string().min(3, "Organization name must be at least 3 characters long"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Amrit Niure"),
    role: z.enum(["ADMIN", "USER"]),
});
export type ISignUp = z.infer<typeof signUpFormSchema>;