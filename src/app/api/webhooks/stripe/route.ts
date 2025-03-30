import { prisma as db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const header = await headers()

    const signature = header.get("Stripe-Signature") || header.get("stripe-signature");

  if (!signature) {
    console.error("Missing Stripe signature");
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Handle successful payment
      break;
    case 'transfer.created':
      // Handle transfer creation
      break;
    case 'transfer.updated':
      // Handle successful transfer to employee bank account
      const transfer = event.data.object as Stripe.Transfer;
      await handleSuccessfulTransfer(transfer);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}

async function handleSuccessfulTransfer(transfer: Stripe.Transfer) {
  try {
    // Update payslip status in database
    await db.payslip.updateMany({
      where: {
        stripePaymentId: transfer.id,
      },
      data: {
        paymentStatus: "PROCESSED",
        paymentDate: new Date(),
      },
    });
  } catch (error) {
    console.error('Error updating payslip status:', error);
    throw error;
  }
}