import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CredentialSignInForm from "./CredentialSignInForm";
import { auth } from "@/auth"; // takes care of session and tells if we are login on not
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
  // getting a session in a server component
  const session = await auth();

  if (session) {
    return redirect("/"); // if session successfull take him to the home page
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority={true}
            />
          </Link>
          <CardTitle className="flex-center">Sign In</CardTitle>
          <CardDescription className="flex-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className=" space-y-4">
          <CredentialSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
