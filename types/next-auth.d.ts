import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      exp: number;
      iat: number;
      id: string;
      jti: string;
      name: string;
      role: string;
      status: string;
      sub: string;
      token: string;
    };
  }
}
