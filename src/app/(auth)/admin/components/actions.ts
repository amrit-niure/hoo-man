"use server";

import { sendEmail } from "@/lib/email";

export const sendEmailAction = async (email: string, orgName: string) => {
    await sendEmail({
        to: email,
        subject: "Welcome to our platform",
        body: `Hello ${orgName},\n\nThank you for signing up! Your account has been created successfully.\n\nBest regards,\nThe Hooman Team`,
    })
}