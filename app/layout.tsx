import { Footer, Navbar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "./NextAuthProvider";
import { Providers } from "./Redux/Providers";

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
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
