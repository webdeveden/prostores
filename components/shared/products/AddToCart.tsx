"use client";

import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart } from "@/lib/actions/cart.action";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
      return;
    }
    // handle success add to cart
    toast({
      description: `${item.name} added to cart`,
      // customizing our toast
      action: (
        <ToastAction
          className="bg-primary text-white hover:bg-gray-800"
          altText="Go to Cart"
          onClick={() => router.push("/cart")}
        >
          Go To Cart
        </ToastAction>
      ),
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      Í Add To Cart
    </Button>
  );
};

export default AddToCart;
