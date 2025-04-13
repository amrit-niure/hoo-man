import { Resend } from "resend";
import { ReactNode } from "react";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(RESEND_API_KEY);

interface EmailOptions {
    to: string | string[];
    subject: string;
    body: ReactNode;
    from?: string;
    cc?: string | string[];
    bcc?: string | string[];
    replyTo?: string;
}

export async function sendEmail({
    to,
    subject,
    body,
    from = process.env.EMAIL_FROM,
    cc,
    bcc,
    replyTo,
}: EmailOptions) {
    if (!from) {
        throw new Error("Missing EMAIL_FROM environment variable");
    }

    try {
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            react: body,
            cc,
            bcc,
            replyTo,
        });

        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
}