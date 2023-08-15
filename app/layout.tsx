"use client";
import { Footer, Navbar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import NextAuthProvider from "./NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logo App",
  description: "Delivering your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Provider store={store}>
            <Navbar />
            {children}
            <Footer />
          </Provider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
