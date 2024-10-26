import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const loadedProducts = useLoaderData();
  return (
    <>
      <Helmet>
        <title>TechTo | Products</title>
      </Helmet>
      <div className="bg-neutral-200">
        <div className="py-8  max-w-screen-xl mx-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loadedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
