import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const ProductCard = ({ product }) => {
  const { _id, photoUrl, model, brand, price } = product;
  const { user } = useContext(AuthContext);

  //   const id = _id.toString();
  //   const url = `/product/${id}`;
  //   console.log(id, url);

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Shoes" width={300} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {model}
          <div className="badge badge-secondary">{brand}</div>
        </h2>
        <p className="text-lg font-semibold text-blue-500 mt-2">
          ${price?.toFixed(2)}
        </p>
        <Link to={`/products/${_id}`}>
          <div className="card-actions justify-center">
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
              View Details
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
