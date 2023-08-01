"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = () => {
  const router = useRouter();
  const { cart, paymentIntent, setPaymentIntent } = useCartStore();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create paymentIntent as soon as the component loads up
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: cart, payment_intent_id: paymentIntent }),
    })
      .then((res) => {
        if (res.status === 403) {
          return router.push("/api/auth/signin");
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        setPaymentIntent(data.paymentIntent.id);
      });
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
    </div>
  );
};

export default Checkout;
