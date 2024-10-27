import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import ProductRating from "../components/shared/ProductRating";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const loadedProduct = useLoaderData();
  const navigate = useNavigate();
  const {
    _id,
    photoURL,
    name,
    brand,
    price,
    category,
    stock,
    releaseDate,
    description,
    rating,
    reviews,
  } = loadedProduct;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const deliveryAddress = e.target.deliveryAddress.value;

    // console.log(deliveryAddress);

    if (user && user.email) {
      const cartItem = {
        email: user.email,
        productId: _id,
        name,
        category,
        brand,
        price,
        photoURL,
        deliveryAddress,
      };

      fetch("https://a5-tech-tonic-mern-server.vercel.app/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.insertedId) {
            toast.success(`${name} added to cart successfully!`, {
              position: "top-center",
            });
            setIsModalOpen(false);
            navigate(-1);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className="max-w-screen-xl mx-auto p-4 my-8">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
          <figure className="w-full md:w-1/2">
            <img
              src={photoURL}
              alt={name}
              className="object-cover h-full w-full rounded-t-xl md:rounded-tr-none md:rounded-l-xl"
            />
          </figure>

          <div className="flex flex-col justify-between p-6 w-full md:w-1/2">
            <div>
              <h2 className="text-3xl font-bold text-[#0A1F44] mb-2">{name}</h2>
              <p className="text-lg font-semibold text-gray-700 mb-1">
                Brand: {brand}
              </p>
              <p className="text-lg font-medium text-gray-600 mb-1">
                Category: {category}
              </p>
              <p className="text-2xl font-bold text-[#0A1F44] mb-2">${price}</p>
              <p className="text-lg font-semibold text-gray-700 mb-1">
                Stock: {stock > 0 ? `${stock} items available` : "Out of stock"}
              </p>
              <p className="text-gray-600 mb-4">
                Release Date: {new Date(releaseDate).toLocaleDateString()}
              </p>

              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  Rating: <span className="font-semibold">{rating} / 5</span>
                </p>
                <ProductRating rating={rating} />
                <p className="text-gray-700">
                  Reviews: <span className="font-semibold">{reviews}</span>
                </p>
              </div>

              <p className="text-gray-600 mb-4">{description}</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 text-lg font-semibold bg-[#0A1F44] text-white hover:bg-transparent hover:border-2 hover:border-[#0A1F44] hover:text-[#0A1F44] rounded-lg shadow-md transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4">
              <h2 className="text-2xl font-bold mb-4">Added to Cart!</h2>
              <p>
                <strong>Name:</strong> {user?.displayName || "Anonymous"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p className="mt-4">
                <strong>Product:</strong> {name}
              </p>
              <p>
                <strong>Brand:</strong> {brand}
              </p>
              <p>
                <strong>Price:</strong> ${price}
              </p>
              <form onSubmit={handleAddToCart}>
                <label htmlFor="deliveryAddress" className="block mt-4">
                  Enter Your Delivery Address
                </label>
                <input
                  type="text"
                  name="deliveryAddress"
                  id="deliveryAddress"
                  placeholder="Address"
                  className="block w-full p-2 mt-2 rounded-lg bg-gray-100 border-none outline-none"
                  required
                />

                <div className="flex space-x-1 mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#0A1F44] font-semibold text-white hover:bg-transparent hover:border-2 hover:border-[#0A1F44] hover:text-[#0A1F44] rounded-l-xl transition duration-200"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-2 bg-[#0A1F44] font-semibold text-white hover:bg-transparent hover:border-2 hover:border-[#0A1F44] hover:text-[#0A1F44] rounded-r-xl transition duration-200"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
