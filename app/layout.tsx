import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import Hydrate from "./components/Hydrate";
import { Roboto, Lobster_Two } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-robot",
});
const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
});

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
    <html className={`${roboto.className} ${lobster.variable}`} lang="en">
      <Hydrate>
        <Navbar user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
