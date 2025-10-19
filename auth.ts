import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInFormSchema } from "@/lib/constants/validators";

export const authOptions = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          // Validate credentials with Zod; user lookup happens in signInWithCredentials
          const { email, password } = signInFormSchema.parse(credentials);
          return { email, password }; // Pass credentials through
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // set the user ID from the token
      session.user.id = token.sub;

      // if there is an update set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
