// import { Resend } from "resend";
// import { ReactNode } from "react";

// const RESEND_API_KEY = process.env.RESEND_API_KEY;

// if (!RESEND_API_KEY) {
//     throw new Error("Missing RESEND_API_KEY environment variable");
// }

// const resend = new Resend(RESEND_API_KEY);

// interface EmailOptions {
//     to: string | string[];
//     subject: string;
//     body: ReactNode;
//     from?: string;
//     cc?: string | string[];
//     bcc?: string | string[];
//     replyTo?: string;
// }

// export async function sendEmail({
//     to,
//     subject,
//     body,
//     from = process.env.EMAIL_FROM,
//     cc,
//     bcc,
//     replyTo,
// }: EmailOptions) {
//     if (!from) {
//         throw new Error("Missing EMAIL_FROM environment variable");
//     }

//     try {
//         const { data, error } = await resend.emails.send({
//             from,
//             to,
//             subject,
//             react: body,
//             cc,
//             bcc,
//             replyTo,
//         });

//         if (error) {
//             throw error;
//         }
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }




import nodemailer from "nodemailer";

interface EmailOptions {
  to: string | string[];
  subject: string;
  body: string; // Changed from ReactElement to string
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

// Create transporter (should be cached and reused)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  body, // Now expects an HTML string
  from = process.env.EMAIL_FROM || process.env.GMAIL_USER,
  cc,
  bcc,
  replyTo,
}: EmailOptions) {
  if (!from) {
    throw new Error("Missing EMAIL_FROM environment variable");
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    throw new Error("Missing Gmail credentials in environment variables");
  }

  try {
    // No need to render, 'body' is already HTML
    const mailOptions = {
      from,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html: body, // Use the provided HTML string directly
      cc: cc ? (Array.isArray(cc) ? cc.join(", ") : cc) : undefined,
      bcc: bcc ? (Array.isArray(bcc) ? bcc.join(", ") : bcc) : undefined,
      replyTo: replyTo,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; 
  }
}
