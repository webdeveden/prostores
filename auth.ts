import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        //Find user in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        // check if user exists and password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          // if password matches return user object
          if (isMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        }
        // return null if user not found or password doesn't match
        return null;
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
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// export const authOptions = {
//   pages: {
//     signIn: "/sign-in",
//     error: "/sign-in",
//   },
//   session: {
//     strategy: "jwt" as const,
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             return null;
//           }
//           // Validate credentials with Zod; user lookup happens in signInWithCredentials
//           const { email, password } = signInFormSchema.parse(credentials);
//           return { email, password }; // Pass credentials through
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, user, trigger, token }: any) {
//       // set the user ID from the token
//       session.user.id = token.sub;

//       // if there is an update set the user name
//       if (trigger === "update") {
//         session.user.name = user.name;
//       }
//       return session;
//     },
//   },
// };

// export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
