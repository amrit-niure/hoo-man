"use server";

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { demoFormSchema, DemoFormValues } from "./validation";
import { getUserConfirmationHtml } from "@/components/email/get-user-confirmation-html";
import { getAdminNotificationHtml } from "@/components/email/get-admin-notification-html";

export const bookDemo = async (formData: DemoFormValues) => {
    // Validate the form data with Zod
    const validatedFields = demoFormSchema.safeParse(formData);
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!ADMIN_EMAIL) {
        throw new Error("Missing ADMIN_EMAIL environment variable");
    }

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing or invalid fields. Failed to book demo.",
        };
    }

    try {
        // Create the demo booking in the database
        const demoBooking = await prisma.demoBooking.create({
            data: {
                firstName: validatedFields.data.firstName,
                lastName: validatedFields.data.lastName,
                email: validatedFields.data.email,
                companyName: validatedFields.data.companyName,
                phoneNumber: validatedFields.data.phoneNumber,
                preferredDate: validatedFields.data.preferredDate,
                notes: validatedFields.data.notes,
            },
        });
        const userHtmlBody = getUserConfirmationHtml(validatedFields.data.firstName, validatedFields.data.preferredDate);
        await sendEmail({
            to: validatedFields.data.email,
            subject: `Your Demo Booking for Hoo-man is Confirmed!`,
            body: userHtmlBody,
        });

        // 2. Send Notification Email to Admin
        const adminHtmlBody = getAdminNotificationHtml(
            validatedFields.data.firstName,
            validatedFields.data.email,
            validatedFields.data.preferredDate,
            validatedFields.data.companyName,
            validatedFields.data.notes,
        );
        await sendEmail({
            to: ADMIN_EMAIL,
            subject: `🚀 New Demo Booking: ${validatedFields.data.firstName} for Hoo-man`,
            body: adminHtmlBody,
        });

        return {
            success: true,
            data: demoBooking,
            message: "Demo booked successfully! We'll be in touch soon.",
        };
    } catch (error) {
        console.error("Database Error:", error);

        // Handle unique constraint violation (duplicate email)
        if (error instanceof Error && error.message.includes("Unique constraint")) {
            return {
                errors: { email: ["This email already has a demo booked."] },
                message: "This email already has a demo booked.",
            };
        }

        return {
            message: "Database Error: Failed to book demo.",
        };
    }
};