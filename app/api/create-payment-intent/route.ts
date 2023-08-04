import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]/options";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { AddCartTypes } from "@/types/AddCartTypes";
import { prisma } from "@/prisma/db";
import calculateOrderAmount from "@/util/calculateOrderAmount";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const userSession = await getServerSession(options);
  if (!userSession?.user) {
    return NextResponse.json({ message: "Not logged in" }, { status: 403 });
  }

  const requestBody = await req.json();
  const { items, payment_intent_id } = requestBody;

  const total = calculateOrderAmount(items);

  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    payment_intent_id: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  if (payment_intent_id) {
    // update the order

    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );

      const existingOrder = await prisma.order.findFirst({
        where: { payment_intent_id: updatedIntent.id },
        include: { products: true },
      });
      if (!existingOrder) {
        NextResponse.json({ message: "Invalid Payment Intent" });
      }

      const updatedOrder = await prisma.order.update({
        where: { id: existingOrder?.id },
        data: {
          amount: total,
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description || null,
              unit_amount: parseFloat(item.unit_amount),
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });
      return NextResponse.json({ paymentIntent: updatedIntent });
    }
  } else {
    // create new order
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    orderData.payment_intent_id = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    return NextResponse.json({ paymentIntent }, { status: 200 });
  }
}
