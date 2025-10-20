"user server";

import { signInFormSchema } from "../constants/validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

// Sign in the user with credentials
// using useAction hook

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

// sign out user

export async function signOutUser() {
  await signOut();
}
