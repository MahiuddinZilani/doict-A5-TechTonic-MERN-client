import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const loadedProduct = useLoaderData();
  const { _id, photoUrl, name, brand, price, category } = loadedProduct;

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        email: user.email,
        productId: _id,
        name,
        category,
        brand,
        price,
        photoUrl,
      };
      fetch("http://localhost:5100/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.insertedId) {
            toast.success(`${cartItem.name} is added to cart successfully.!`, {
              position: "top-center",
            });
          }
        })
        .catch((error) => console.error(error));
    }
  };

  console.log(loadedProduct, _id);

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="w-1/3">
          <img src={photoUrl} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{brand}</p>
          <p>{price}</p>
          <div onClick={handleAddToCart} className="card-actions justify-end">
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
