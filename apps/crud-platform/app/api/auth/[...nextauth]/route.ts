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
      creditsLimit?: number;
    };
  }
}
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../../../../packages/database/src/client";
import { v4 as uuidv4 } from "uuid";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) {
        throw new Error("Email is required for sign-in.");
      }

      console.log("Sign-in user email:", user.email);

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        const apiKey = uuidv4();
        const apiUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_TODO_URL}/api/${apiKey}`;

        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || "",
            apiKey,
            apiUrl,
            requestCount: 0,
            requestLimit: 4,
            hasRecharged: false,
          },
        });
      } else {
        const existingAccount = await prisma.account.findFirst({
          where: {
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
          },
        });

        if (!existingAccount && account) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: "oauth",
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          });

          console.log(`Linked Google account for ${user.email}`);
        }
      }

      return true;
    },

    async session({ session }) {
      if (!session.user?.email) {
        throw new Error("User email is missing in the session.");
      }

      console.log("Session user email:", session.user.email);

      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (dbUser) {
        session.user.apiKey = dbUser.apiKey;
        session.user.apiUrl = dbUser.apiUrl;
        session.user.creditsLeft = dbUser.requestLimit - dbUser.requestCount;
        session.user.creditsUsed = dbUser.requestCount;
        session.user.creditsLimit = dbUser.requestLimit;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
