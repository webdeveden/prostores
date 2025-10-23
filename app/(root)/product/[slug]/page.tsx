import AddToCart from "@/components/shared/products/AddToCart";
import ProductImages from "@/components/shared/products/ProductImages";
import ProductPrice from "@/components/shared/products/ProductPrice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;

  // Fetch product details using the slug
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* image column */}
        <div className="col-span-2">
          <ProductImages images={product.images} />
        </div>
        {/* Details column */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p>{product.brand}</p>
            <h1 className="h3-bold">{product.name}</h1>
            <p>
              {product.rating} of {product.numReviews}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <ProductPrice
                price={Number(product.price)}
                className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
              />
            </div>
          </div>
          <div className="mt-10">
            <p className="font-semibold">Description</p>
            <p>{product.description}</p>
          </div>
        </div>
        {/* Action column */}
        <div>
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>
                  <ProductPrice price={Number(product.price)} />
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Stock</div>
                <div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">In stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
              </div>
              {product.stock > 0 && (
                <div className="flex-center ">
                  <AddToCart
                    item={{
                      productId: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      qty: 1,
                      image: product.images![0],
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
