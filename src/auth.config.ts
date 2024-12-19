import { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

const publicRoutes = ["/login"];
const authRoutes = ["/login"];

export default {
  providers: [google],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Allow access to public routes for all users
      if (publicRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      // Redirect logged-in users away from auth routes
      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true; // Allow access to auth pages if not logged in
      }

      // Allow access if the user is authenticated
      return isLoggedIn;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as User).userRole;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }: { session: Session, token: JWT }) {
      if (token && session.user) {
        session.user = {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          id: token.id as string,
        };
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
