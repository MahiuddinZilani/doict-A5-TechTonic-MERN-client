import { IoStarOutline, IoStar } from "react-icons/io5";
import Rating from "react-rating";

const ProductRating = ({ rating }) => {
  return (
    <Rating
      initialRating={rating} // Use initialRating for dynamic ratings
      emptySymbol={<IoStarOutline className="text-gray-400 icon" />}
      placeholderSymbol={<IoStarOutline className="text-red-400 icon" />}
      fullSymbol={<IoStar className="text-amber-500 icon" />}
      readonly // Make rating readonly to prevent editing by users
    />
  );
};

export default ProductRating;
