import { z } from "zod";
import { formatNumberWithDecimal } from "../utils";

// schema for inserting product
export const currency = z.string().refine(
  (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
  "Price must have exactly two decimal places" // just a regula express(= 2 more d= digit)
);
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "slug must be at least 3 characters"),
  category: z.string().min(3, "category must be at least 3 characters"),
  brand: z.string().min(3, "brand must be at least 3 characters"),
  description: z.string().min(3, "description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "product must have at least one image"),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for signing users in

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for signing users up
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // set the path of the error to confirmPassword field
  });
