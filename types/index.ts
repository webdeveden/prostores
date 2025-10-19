import { z } from "zod";
import { insertProductSchema } from "@/lib/constants/validators";

// bringing our zod schema into our type and add what is missing if needed
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};
