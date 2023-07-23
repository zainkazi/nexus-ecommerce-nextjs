import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Nexus",
  description: "Nexus Ecommerce Store",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //fetch the user data
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className="mx-64">
        <Navbar user={session?.user} expires={session?.expires as string} />
        {children}
      </body>
    </html>
  );
}
