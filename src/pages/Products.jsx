import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const loadedProducts = useLoaderData();

  return (
    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loadedProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
