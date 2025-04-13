"use server";

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import React from "react";
import { demoFormSchema, DemoFormValues } from "./validation";

export const bookDemo = async (formData: DemoFormValues) => {
    // Validate the form data with Zod
    const validatedFields = demoFormSchema.safeParse(formData);

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
        await sendEmail({
            to: validatedFields.data.email,
            subject: "Demo Booking Confirmation",
            body: React.createElement(
                'div',
                null,
                React.createElement('h1', null, 'Thank you for booking a demo!'),
                React.createElement('p', null, 'We will be in touch soon.')
            ),
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