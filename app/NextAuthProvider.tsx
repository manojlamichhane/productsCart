"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

type sessionProviderProps = {
  children: JSX.Element;
};

const NextAuthProvider = ({ children }: sessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
