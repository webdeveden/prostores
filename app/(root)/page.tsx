import ProductList from "@/components/shared/products/product_list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import delay from "delay";

export const metadata = {
  title: "Home",
};

const HomePage = async () => {
  await delay(2000);
  const latestProducts = await getLatestProducts();

  return (
    //@ts-ignore
    <ProductList data={latestProducts as any} title="New Arrivals" />
  );
};

export default HomePage;
