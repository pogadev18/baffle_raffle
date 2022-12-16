import NextAuth, { type NextAuthOptions, User } from "next-auth";
import { MoralisNextAuthProvider } from '@moralisweb3/next';
import { prisma } from "@/root/server/db/client";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  providers: [MoralisNextAuthProvider()],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({session, token, user}) {
      if (session.user) {
        (session as { user: unknown }).user = token.user;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma)
};

export default NextAuth(authOptions);
