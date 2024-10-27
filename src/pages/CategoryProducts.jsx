import { useLoaderData, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet-async";

const CategoryProducts = () => {
  const loadedData = useLoaderData();
  // const loadedCategoryProduct = useLoaderData();
  const params = useParams();
  // console.log(loadedData);

  return (
    <>
      <Helmet>
        <title>TechTo | {params.categoryName}</title>
      </Helmet>
      <div className="bg-neutral-200">
        <div className="text-center text-3xl text-[#0A1F44] font-extrabold p-2 capitalize bg-[#0A1F44] bg-opacity-20 backdrop-blur-sm sticky top-16 z-20 ">
          <h2>{params.categoryName}</h2>
        </div>
        <div className="py-8 max-w-screen-xl mx-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {loadedData.map((product) => (
            <ProductCard key={product?._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
