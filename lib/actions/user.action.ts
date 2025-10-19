"use server";

import { signInFormSchema } from "../constants/validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // Validate credentials with Prisma
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      return { success: false, message: "Invalid email or password" };
    }

    const isValidPassword = await bcrypt.compare(
      user.password,
      dbUser.password as string
    );
    if (!isValidPassword) {
      return { success: false, message: "Invalid email or password" };
    }

    // Call signIn with validated credentials
    await signIn("credentials", {
      email: user.email,
      password: user.password,
      //   redirect: false, // Prevent automatic redirect
    });

    return { success: true, message: "Signed In successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  } finally {
    await prisma.$disconnect(); // Clean up Prisma connection
  }
}

export async function signOutUser() {
  await signOut();
}
