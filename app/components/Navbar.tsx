"use client";

import { useCartStore } from "@/store";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { AiFillShopping } from "react-icons/ai";

export default function Navbar({ user }: Session) {
  const { toggleCart, cart, isOpen } = useCartStore();

  return (
    <nav className="flex items-center justify-between py-12">
      <Link href={"/"}>
        <h1>Nexus</h1>
      </Link>
      <ul className="flex items-center gap-12">
        {/* toggle the cart */}
        <li
          onClick={() => toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer"
        >
          <AiFillShopping />
          <span className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
            {cart.length}
          </span>
        </li>
        {user ? (
          <li>
            <Image
              className="rounded-full"
              src={user.image as string}
              alt="user"
              width={36}
              height={36}
            />
          </li>
        ) : (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}
      </ul>
      {isOpen && <Cart />}
    </nav>
  );
}
