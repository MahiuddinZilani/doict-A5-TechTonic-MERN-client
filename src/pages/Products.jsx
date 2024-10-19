import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../providers/AuthProvider";

const Products = () => {
  const loadedProducts = useLoaderData();
  const { user } = useContext(AuthContext);

  return (
    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loadedProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
