import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  price: number;
  className?: string;
}

const ProductPrice = ({ price, className }: Props) => {
  // Ensure price is a number and format it to two decimal places
  const priceValue = price.toFixed(2);

  const [dollars, cents] = priceValue.split(".");
  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-sm align-super">$</span>
      {dollars}
      <span className="text-sm align-super">.{cents}</span>
    </p>
  );
};

export default ProductPrice;
