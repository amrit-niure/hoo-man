// app/api/webhooks/stripe/route.ts
import { prisma as db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = headers();
  const signature = headerList.get("Stripe-Signature") || headerList.get("stripe-signature");

  if (!signature) {
    console.error("⚠️ Missing Stripe signature header");
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`❌ Webhook signature verification failed:`, error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  console.log(`🔔 Received Stripe event: ${event.type}`);

  try {
    switch (event.type) {
      // Handle bank account verification
      case "account.external_account.updated": {
        const account = event.data.object as Stripe.BankAccount;
        if (account.status === "verified") {
          await db.bankDetail.updateMany({
            where: { stripeBankToken: account.id },
            data: { verified: true }
          });
          console.log(`✅ Verified bank account: ${account.id}`);
        }
        break;
      }

      // Handle successful transfers
      case "transfer.updated": {
        const transfer = event.data.object as Stripe.Transfer;
        await handleSuccessfulTransfer(transfer);
        console.log(`✅ Processed transfer: ${transfer.id}`);
        break;
      }

      // Handle failed transfers
      // case "transfer.failed": {
      //   const transfer = event.data.object as Stripe.Transfer;
      //   await handleFailedTransfer(transfer);
      //   console.log(`❌ Failed transfer: ${transfer.id}`);
      //   break;
      // }

      default: {
        console.log(`➖ Unhandled event type: ${event.type}`);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("⚠️ Webhook handler failed:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulTransfer(transfer: Stripe.Transfer) {
  try {
    await db.$transaction([
      db.payslip.updateMany({
        where: { stripePaymentId: transfer.id },
        data: {
          paymentStatus: "PROCESSED",
          paymentDate: new Date(),
          metadata: {
            ...transfer.metadata,
            stripeStatus: transfer.status,
            stripeReceiptUrl: transfer.receipt_url
          }
        }
      }),
      db.payrollRun.updateMany({
        where: { stripeBatchId: transfer.transfer_group },
        data: { status: "COMPLETED" }
      })
    ]);
  } catch (error) {
    console.error("Failed to update successful transfer:", error);
    throw error;
  }
}

async function handleFailedTransfer(transfer: Stripe.Transfer) {
  try {
    await db.$transaction([
      db.payslip.updateMany({
        where: { stripePaymentId: transfer.id },
        data: {
          paymentStatus: "FAILED",
          metadata: {
            ...transfer.metadata,
            stripeStatus: transfer.status,
            failureMessage: transfer.failure_message
          }
        }
      }),
      db.payrollRun.updateMany({
        where: { stripeBatchId: transfer.transfer_group },
        data: { status: "FAILED" }
      })
    ]);
  } catch (error) {
    console.error("Failed to update failed transfer:", error);
    throw error;
  }
}