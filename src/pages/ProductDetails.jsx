import React from "react";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const loadedProduct = useLoaderData();

  const { _id, photoUrl, model, brand, price } = loadedProduct;

  console.log(loadedProduct, _id);

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="w-1/3">
          <img src={photoUrl} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{model}</h2>
          <p>{brand}</p>
          <p>{price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
