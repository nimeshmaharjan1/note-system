import { verifyPassword } from "@lib/api/verify-password";
import { connectDb } from "@lib/mongo";
import User from "@models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        await connectDb();
        const { username, password } = credentials as { username: string; password: string };
        const foundUser = await User.findOne({ username });
        if (!foundUser) {
          throw new Error("User not found with the provided username.");
        }
        const isValid = await verifyPassword(password, foundUser?.password);
        if (!isValid) {
          throw new Error("Please recheck your password and try again.");
        }
        let role;
        if (foundUser?.roles?.includes("manager")) {
          role = "manager";
        } else {
          role = "employee";
        }
        return { id: foundUser?._id, name: foundUser?.username, role };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt(params: any) {
      if (params.user?.role) {
        params.token.email = params.user.role;
      }
      return params.token;
    },
    async redirect() {
      return "http://localhost:3000";
    },
  },
};
export default NextAuth(authOptions);
