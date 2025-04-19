// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string;
      apiKey?: string;
      apiUrl?: string;
      creditsLeft?: number;
      creditsUsed?: number;
    };
  }
}
