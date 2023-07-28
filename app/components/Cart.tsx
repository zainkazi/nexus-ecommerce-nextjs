"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/priceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import emptyCart from "@/public/empty-cart.png";

const Cart = () => {
  const { toggleCart, cart, addProduct, removeProduct } = useCartStore();

  return (
    <div
      onClick={() => toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        {cart.length > 0 && <h1>Here's your shopping list 📃</h1>}
        {cart.map((item) => (
          <div className="flex py-4 gap-4">
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
              className="rounded-md h-24 object-cover"
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>
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
            </div>
          </div>
        ))}
        {cart.length > 0 ? (
          <button className="py-2 mt-8 bg-teal-700 w-full rounded-md text-white">
            Checkout
          </button>
        ) : (
          <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-48 opacity-75">
            <h1>Oops! Your cart is empty 😥</h1>
            <Image src={emptyCart} alt="empty cart" width={150} height={150} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
