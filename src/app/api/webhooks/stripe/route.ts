/**
 * Stripe Webhook Handler
 * 
 * This file handles incoming webhook events from Stripe for payment processing and subscription management.
 * It processes two main events:
 * 1. checkout.session.completed - When a customer completes payment
 * 2. customer.subscription.deleted - When a subscription is cancelled
 */

import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma";
import Stripe from "stripe";
import { Plan, SubscriptionPeriod } from "@prisma/client";

// Webhook secret from environment variables for verifying Stripe requests
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  // Extract request body and Stripe signature
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  // Verify that the request is actually from Stripe
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    // Handle different types of webhook events
    switch (event.type) {
      // When a checkout is completed successfully
      case "checkout.session.completed": {
        // Get detailed checkout session information
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          { expand: ["line_items"] }
        );
        
        const customerId = session.customer as string;
        const customerEmail = session.customer_details?.email;

        // Process customer information if email exists
        if (customerEmail) {
          // Find user in our database
          const user = await prisma.user.findUnique({ where: { email: customerEmail } });
          if (!user) throw new Error("User not found in database");
          
          // Save Stripe customer ID if not already saved
          if (!user.customerId) {
            await prisma.user.update({
              where: { id: user.id },
              data: { customerId },
            });
          }

          // Process each purchased item
          const lineItems = session.line_items?.data || [];
          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === "recurring";

            // Handle subscription items
            if (isSubscription) {
              let endDate = new Date();
              let period: SubscriptionPeriod;

              // Calculate subscription end date based on plan duration
              switch (priceId) {
                case process.env.STRIPE_YEARLY_PRICE_ID:
                  endDate.setFullYear(endDate.getFullYear() + 1);
                  period = SubscriptionPeriod.YEARLY;
                  break;
                case process.env.STRIPE_MONTHLY_PRICE_ID:
                  endDate.setMonth(endDate.getMonth() + 1);
                  period = SubscriptionPeriod.MONTHLY;
                  break;
                case process.env.STRIPE_THREE_MONTH_PRICE_ID:
                  endDate.setMonth(endDate.getMonth() + 3);
                  period = SubscriptionPeriod.QUARTERLY;
                  break;
                default:
                  throw new Error("Unknown subscription price ID");
              }

              // Create or update subscription record
              await prisma.subscription.upsert({
                where: { userId: user.id },
                create: {
                  userId: user.id,
                  startDate: new Date(),
                  endDate: endDate,
                  plan: Plan.PRO,
                  period: period,
                },
                update: {
                  plan: Plan.PRO,
                  period: period,
                  startDate: new Date(),
                  endDate: endDate,
                },
              });
            }
          }
        }
        break;
      }

      // When a subscription is cancelled
      case "customer.subscription.deleted": {
        // Get cancelled subscription details
        const subscription = await stripe.subscriptions.retrieve(
          (event.data.object as Stripe.Subscription).id
        );

        // Find associated user
        const user = await prisma.user.findUnique({
          where: { customerId: subscription.customer as string },
          include: { subscription: true }
        });
        
        if (!user) {
          throw new Error("User not found for the cancelled subscription");
        }

        // Remove subscription from database
        if (user.subscription) {
          await prisma.subscription.delete({
            where: { userId: user.id }
          });
          console.log(`✅ Successfully removed subscription for user: ${user.id}`);
        }
        break;
      }

      default:
        console.log(`ℹ️ Unhandled webhook event type: ${event.type}`);
        break;
    }
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    return new Response("Webhook processing failed", { status: 400 });
  }

  return new Response("✅ Webhook processed successfully", { status: 200 });
}
