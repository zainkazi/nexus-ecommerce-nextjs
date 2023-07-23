"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Navbar({ user }: Session) {
  return (
    <nav className="flex items-center justify-between py-8">
      <h1>Nexus</h1>
      <ul className="flex items-center gap-12">
        {user ? (
          <li>
            <Image
              className="rounded-full"
              src={user.image as string}
              alt="user"
              width={48}
              height={48}
            />
          </li>
        ) : (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
