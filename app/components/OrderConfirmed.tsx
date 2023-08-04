"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import orderComplete from "@/public/order-completed.png";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const { setCheckout, toggleCart, setPaymentIntent, clearCart } =
    useCartStore();

  useEffect(() => {
    setPaymentIntent("");
    clearCart();
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {" "}
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-xl font-medium">Your order has been placed 🚀</h1>
        <h2 className="text-sm my-4">Check you email for receipt</h2>
        <Image
          src={orderComplete}
          className="my-8"
          width={150}
          height={150}
          alt="order-complete"
        />

        <div className="flex items-center justify-center gap-12">
          <Link href="/dashboard">
            <button
              className="btn bg-teal-700 text-white"
              onClick={() => {
                setTimeout(() => {
                  setCheckout("cart");
                }, 1000);

                toggleCart();
              }}
            >
              Check your order
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
