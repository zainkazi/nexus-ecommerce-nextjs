"use client";

import { useCartStore } from "@/store";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { AiFillShopping } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import DarkLight from "./DarkLight";

export default function Navbar({ user }: Session) {
  const { toggleCart, cart, isOpen } = useCartStore();

  return (
    <nav className="flex items-center justify-between py-4 md:py-12 mb-4 md:mb-0">
      <Link href={"/"}>
        <h1 className="font-lobster text-2xl">Nexus</h1>
      </Link>
      <ul className="flex items-center gap-6 md:gap-10">
        {/* toggle the cart */}
        <li
          onClick={() => toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer"
        >
          <AiFillShopping />
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* Dark mode */}
        <DarkLight />

        {/* User profile */}
        {user ? (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <summary className="avatar">
                <Image
                  className="rounded-full"
                  src={user.image as string}
                  alt="user"
                  width={36}
                  height={36}
                  tabIndex={0}
                  priority={true}
                />
              </summary>
              <ul
                tabIndex={0}
                className="p-2 shadow menu dropdown-content z-[1] bg-base-200 t rounded-box w-52"
              >
                <li>
                  <Link
                    className="hover:bg-base-300 p-4 rounded-md"
                    href="/dashboard"
                    onClick={() => {
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                      }
                    }}
                  >
                    Orders
                  </Link>
                </li>
                <li
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className="hover:bg-base-300 p-4 rounded-md"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li>
            <button
              className="bg-teal-600 text-white py-2 px-4 rounded-md"
              onClick={() => signIn("google")}
            >
              Sign In
            </button>
          </li>
        )}
      </ul>
      <AnimatePresence>{isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
