// app/actions/bank-details.ts
"use server";

import { prisma as db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { BankDetail } from "@prisma/client";
import { getCurrentUser } from "@/lib/current-user";

export async function updateBankDetails(data: Partial<BankDetail>) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Format BSB by removing dashes (store as 6 digits)
  const formattedBSB = (data.bsbNumber ?? "").replace(/-/g, '');

  try {
    // Find the employee record for the current user
    const employee = await db.employee.findUnique({
      where: { userId: user.id },
      select: { id: true }
    });

    if (!employee) {
      throw new Error("Employee record not found");
    }

    // Check if bank details already exist
    const existingBankDetails = await db.bankDetail.findFirst({
      where: { employeeId: employee.id }
    });

    // Create or update bank details
    const result = existingBankDetails
      ? await db.bankDetail.update({
          where: { id: existingBankDetails.id },
          data: {
            accountName: data.accountName ?? "",
            accountNumber: data.accountNumber ?? "",
            bsbNumber: formattedBSB,
            bankName: data.bankName ?? "",
            isPrimary: true
          }
        })
      : await db.bankDetail.create({
          data: {
            employeeId: employee.id,
            accountName: data.accountName ?? "",
            accountNumber: data.accountNumber ?? "",
            bsbNumber: formattedBSB,
            bankName: data.bankName ?? "",
            isPrimary: true
          }
        });

    revalidatePath("/employee/bank-details");
    return result;
  } catch (error) {
    console.error("Failed to update bank details:", error);
    throw new Error("Failed to update bank details");
  }
}


import { stripe } from "@/lib/stripe";


type BankDetailsData = {
  employeeId: string;
  bankName: string;
  accountName: string;
  bsbNumber: string;
  accountNumber: string;
  accountType: string;
};

export async function verifyBankAccount(data: BankDetailsData) {
  try {
    // Create Stripe bank account token
    const token = await stripe.tokens.create({
      bank_account: {
        country: 'AU',
        currency: 'aud',
        account_holder_name: data.accountName,
        account_holder_type: 'individual',
        routing_number: data.bsbNumber,
        account_number: data.accountNumber,
      },
    });

    return { token: token.id, verified: token.bank_account?.status === "verified" || false };
  } catch (error) {
    console.error("Stripe token creation failed:", error);
    throw new Error("Failed to verify bank details with payment processor");
  }
}

export async function createOrUpdateBankDetails(data: BankDetailsData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // First verify with Stripe
  const { token, verified } = await verifyBankAccount(data);

  try {
    // Check if bank details exist
    const existing = await db.bankDetail.findFirst({
      where: { employeeId: data.employeeId, isPrimary: true }
    });

    // Create or update record
    return existing
      ? await db.bankDetail.update({
          where: { id: existing.id },
          data: {
            ...data,
            stripeBankToken: token,
            verified
          }
        })
      : await db.bankDetail.create({
          data: {
            ...data,
            stripeBankToken: token,
            verified,
            isPrimary: true
          }
        });
  } catch (error) {
    console.error("Database operation failed:", error);
    throw new Error("Failed to save bank details");
  }
}