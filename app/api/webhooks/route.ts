import Stripe from "stripe";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  const buf = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json("Missing the stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json("Webhook error" + err);
  }
  console.log("it works 0");

  switch (event.type) {
    case "payment_intent.created":
      const paymentIntent = event.data.object;
      console.log("Payment intent was created");
      break;
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
      console.log("it works 1");
      if (typeof charge.payment_intent === "string") {
        const order = await prisma.order.update({
          where: { payment_intent_id: charge.payment_intent },
          data: { status: "complete" },
        });
        console.log("it works 2");
      }
      break;
    default:
      console.log("Unhandled event type: " + event.type);
  }
  NextResponse.json({ received: true });
}
