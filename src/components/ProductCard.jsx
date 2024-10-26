import PropTypes from "prop-types";
import ProductRating from "./shared/ProductRating";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    _id,
    // id,
    name,
    // brand,
    // category,
    // stock,
    // releaseDate,
    photoURL,
    price,
    description,
    rating,
    reviews,
  } = product;

  return (
    <div className="w-2/3 md:w-3/4 lg:w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative overflow-hidden h-48">
        <img
          src={photoURL}
          alt={name}
          className="w-full h-full object-cover transition duration-300 ease-in-out hover:opacity-80"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-500 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">${price}</span>
          <span className="flex items-center text-yellow-500">
            <ProductRating rating={rating} reviews={reviews} />
          </span>
        </div>
        <Link to={`/products/${_id}`}>
          <button className="w-full mt-4 bg-[#0A1F44] text-white hover:bg-transparent hover:border-2 hover:border-[#0A1F44] hover:text-[#0A1F44]  text-center py-2 rounded-xl transition duration-200">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object,
};
