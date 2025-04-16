// // app/api/webhooks/stripe/route.ts
// import { prisma as db } from "@/lib/db";
// import { stripe } from "@/lib/stripe";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// export async function POST(req: Request) {
//   const body = await req.text();
//   const headerList = await headers();
//   const signature = headerList.get("Stripe-Signature") || headerList.get("stripe-signature");

//   if (!signature) {
//     console.error("⚠️ Missing Stripe signature header");
//     return NextResponse.json(
//       { error: "Missing Stripe signature" },
//       { status: 400 }
//     );
//   }

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//     //eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     console.error(`❌ Webhook signature verification failed:`, error.message);
//     return NextResponse.json(
//       { error: `Webhook Error: ${error.message}` },
//       { status: 400 }
//     );
//   }

//   console.log(`🔔 Received Stripe event: ${event.type}`);

//   try {
//     switch (event.type) {
//       // Handle bank account verification
//       case "account.external_account.updated": {
//         const account = event.data.object as Stripe.BankAccount;
//         if (account.status === "verified") {
//           await db.bankDetail.updateMany({
//             where: { stripeBankToken: account.id },
//             data: { verified: true }
//           });
//           console.log(`✅ Verified bank account: ${account.id}`);
//         }
//         break;
//       }

//       // Handle successful transfers
//       case "transfer.updated": {
//         const transfer = event.data.object as Stripe.Transfer;
//         await handleSuccessfulTransfer(transfer);
//         console.log(`✅ Processed transfer: ${transfer.id}`);
//         break;
//       }

//       // Handle failed transfers
//       // case "transfer.failed": {
//       //   const transfer = event.data.object as Stripe.Transfer;
//       //   await handleFailedTransfer(transfer);
//       //   console.log(`❌ Failed transfer: ${transfer.id}`);
//       //   break;
//       // }

//       default: {
//         console.log(`➖ Unhandled event type: ${event.type}`);
//       }
//     }

//     return NextResponse.json({ received: true }, { status: 200 });
//   } catch (error) {
//     console.error("⚠️ Webhook handler failed:", error);
//     return NextResponse.json(
//       { error: "Webhook handler failed" },
//       { status: 500 }
//     );
//   }
// }

// async function handleSuccessfulTransfer(transfer: Stripe.Transfer) {
//   try {
//     await db.$transaction([
//       db.payslip.updateMany({
//         where: { stripePaymentId: transfer.id },
//         data: {
//           paymentStatus: "PROCESSED",
//           paymentDate: new Date(),
//           metadata: {
//             ...transfer.metadata,
//             // stripeStatus: transfer.status,
//             // stripeReceiptUrl: transfer.receipt_url
//           }
//         }
//       }),
//       db.payrollRun.updateMany({
//         where: { stripeBatchId: transfer.transfer_group },
//         data: { status: "COMPLETED" }
//       })
//     ]);
//   } catch (error) {
//     console.error("Failed to update successful transfer:", error);
//     throw error;
//   }
// }

// // async function handleFailedTransfer(transfer: Stripe.Transfer) {
// //   try {
// //     await db.$transaction([
// //       db.payslip.updateMany({
// //         where: { stripePaymentId: transfer.id },
// //         data: {
// //           paymentStatus: "FAILED",
// //           metadata: {
// //             ...transfer.metadata,
// //             stripeStatus: transfer.status,
// //             failureMessage: transfer.failure_message
// //           }
// //         }
// //       }),
// //       db.payrollRun.updateMany({
// //         where: { stripeBatchId: transfer.transfer_group },
// //         data: { status: "FAILED" }
// //       })
// //     ]);
// //   } catch (error) {
// //     console.error("Failed to update failed transfer:", error);
// //     throw error;
// //   }
// // }




























// app/api/webhook/route.js
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';


if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Stripe keys are not set in environment variables');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('stripe-signature');
    const body = await req.text();
    
    let event;
    try {
      if (!signature) {
        throw new Error('Stripe signature is missing');
      }
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return NextResponse.json(
        { error: `Webhook Error: ${err}` },
        { status: 400 }
      );
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await handleCheckoutSessionCompleted(session);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    // Retrieve the full session with line items
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'subscription']
    });

    // Get the customer email from the session
    const customerEmail = session.customer_details?.email;
    if (!customerEmail) throw new Error('No customer email found');

    // Determine the plan based on price ID
    const priceId = fullSession.line_items?.data[0]?.price?.id;
    const plan = await determinePlanFromPriceId(priceId || '');

    const user = await prisma.user.findUnique({
      where: { email: customerEmail },
      include: { company: true }
    });

    if (!user) throw new Error(`User with email ${customerEmail} not found`);
    if (!user.company) throw new Error(`User ${customerEmail} has no associated company`);

    // Update the company profile through the user relation
    await prisma.companyProfile.update({
      where: { id: user.company.id },
      data: {
        plan: plan,
        updatedAt: new Date()
      }
    });

    console.log(`Updated company profile for ${customerEmail} with ${plan} plan`);
     return redirect('/dashboard'); // Redirect to the dashboard or any other page
  } catch (error) {
    console.error('Error handling checkout session:', error);
    throw error;
  }
}

async function determinePlanFromPriceId(priceId:string) {
  if (!priceId) return 'BASIC';
  
  // Get your price IDs from Stripe Dashboard
  const priceIds = {
    basic: "price_1REXqGELNuqinxngj1OF0jOh",
    pro: "price_1REXoOELNuqinxng10xrywSL",
    enterprise: "price_1REXrRELNuqinxngHakblJ4l"
  };

  switch (priceId) {
    case priceIds.basic:
      return 'BASIC';
    case priceIds.pro:
      return 'PRO';
    case priceIds.enterprise:
      return 'ENTERPRISE';
    default:
      return 'FREE';
  }
}