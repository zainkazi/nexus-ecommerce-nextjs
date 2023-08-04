"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/priceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import emptyCart from "@/public/empty-cart.png";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

const Cart = () => {
  const {
    toggleCart,
    cart,
    addProduct,
    removeProduct,
    onCheckout,
    setCheckout,
  } = useCartStore();

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      {/* Cart */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-100 absolute right-0 top-0 w-full md:w-2/5 h-screen py-6 px-4 md:p-12 overflow-y-scroll"
      >
        <div className="flex justify-between items-center mb-6 text-2xl">
          {onCheckout === "cart" && (
            <button onClick={() => toggleCart()}>
              <IoArrowBack />
            </button>
          )}
          {onCheckout === "checkout" && (
            <button onClick={() => setCheckout("cart")}>
              <IoArrowBack />
            </button>
          )}
          <button onClick={() => toggleCart()}>
            <AiOutlineClose />
          </button>
        </div>

        {/* Cart Items */}
        {onCheckout === "cart" && (
          <>
            {cart.length > 0 && <h1>Here's your shopping list 📃</h1>}
            {cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="flex py-4 gap-4 bg-base-300 my-4 rounded-lg"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  quality={20}
                  className="rounded-md h-24 object-cover mx-4 w-auto"
                  priority={true}
                />
                <motion.div layout>
                  <h2>{item.name}</h2>
                  <div className="flex gap-2">
                    <h2 className="text-sm">Quantity: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        removeProduct({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <button
                      onClick={() =>
                        addProduct({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>
                  <p className="text-sm">
                    {item.unit_amount && formatPrice(item.unit_amount)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </>
        )}
        {onCheckout === "checkout" && <Checkout />}
        {onCheckout === "success" && <OrderConfirmed />}
        {cart.length > 0 && onCheckout == "cart" ? (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button
              onClick={() => setCheckout("checkout")}
              className="py-2 mt-8 bg-teal-700 w-full rounded-md text-white"
            >
              Checkout
            </button>
          </motion.div>
        ) : (
          cart.length <= 0 &&
          onCheckout === "cart" && (
            <AnimatePresence>
              <motion.div
                animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
                initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
                className="flex flex-col items-center gap-12 text-2xl font-medium pt-48 opacity-75"
              >
                <h1>Oops! Your cart is empty 😥</h1>
                <Image
                  src={emptyCart}
                  alt="empty cart"
                  width={150}
                  height={150}
                />
              </motion.div>
            </AnimatePresence>
          )
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cart;
