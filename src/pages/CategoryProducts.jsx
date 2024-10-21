import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryProducts = () => {
  const loadedData = useLoaderData();
  //    const loadedCategoryProduct = useLoaderData();

  console.log(loadedData);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loadedData.map((product) => (
        <ProductCard key={product?._id} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default CategoryProducts;
