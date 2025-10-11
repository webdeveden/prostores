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
