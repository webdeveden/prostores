import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JSON object

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// format number with decimal places

export function formatNumberWithDecimal(num: number): string {
  //getting the dollars and center from a decimal number
  const [dollars, cents] = num.toString().split(".");
  // number should a decimal with 2 value if only 1 on 0, add another 0
  return cents ? `${dollars}.${cents.padEnd(2, "0")}` : `${dollars}.00`;
}

// Format errors, then pass it to our user action
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function formatError(error: any) {
  if (error.name === "ZodError") {
    // Handle Zod error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );
    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma error
  } else {
    // Handle other errors
  }
}
