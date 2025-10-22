"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signInFormSchema, signUpFormSchema } from "../constants/validators";
import { formatError } from "../utils";

// Sign in the user with credentials
// using useAction hook
//

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"), // since we gonna use reack hook form
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    return { success: true, message: "Signed In successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

//2. sign out user

export async function signOutUser() {
  await signOut();
}

//3. sign up users

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // storing a plainpassword before hashing it
    const plainPassword = user.password;
    // hashing our passowrd in data base
    user.password = hashSync(user.password, 10);

    // store the input name, email, password onntghe database
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    // automatically sign in user upon creation using signIn
    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User successfully registered" };
  } catch (error) {
    // the log contain the message,... of the errors
    // console.log(error.name);
    // console.log(error.code);
    // console.log(error.errors);
    // console.log(error.meta?.target);
    if (isRedirectError(error)) {
      throw error;
    }
    // passing the formaterror from util that we defined
    return { success: false, message: formatError(error) };
  }
}
