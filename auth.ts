// app/auth.ts
import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { saltAndHashPassword } from "@/utils/hashAndSaltPassword";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }

          const email = credentials.email as string;

          let user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            // Create new user if not found
            const hash = saltAndHashPassword(credentials.password);
            user = await prisma.user.create({
              data: {
                email,
                password: hash, // Make sure this field matches your schema
              },
            });
            return user;
          } else {
            // Verify password for existing user
            const isMatch = bcrypt.compareSync(
              credentials.password as string,
              user.password
            );

            if (!isMatch) {
              console.log("Password mismatch");
              return null; // Return null instead of throwing an error
            }

            return user;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null for any errors
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected =
        nextUrl.pathname.startsWith("/protected") ||
        nextUrl.pathname.startsWith("/admin") ||
        nextUrl.pathname.startsWith("/submit");
      if (isProtected) {
        if (isLoggedIn) return true;
        return false; // redirect to login
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
