import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5100/carts/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
          setTotal(data.reduce((sum, product) => sum + product.price, 0)); // Calculate total price
        })
        .catch((error) => console.error(error));
    }
  }, [user?.email]);

  const handleDeleteItem = (itemId) => {
    fetch(`http://localhost:5100/cart/${itemId}`, { method: "DELETE" })
      .then(() => {
        const updatedCart = cart.filter((item) => item._id !== itemId);
        setCart(updatedCart);
        setTotal(updatedCart.reduce((sum, product) => sum + product.price, 0));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        My Cart
      </div>

      <div className="flex flex-wrap items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <div className="text-gray-600 dark:text-gray-300">
          Total Items:{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {cart.length}
          </span>
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          Total Price:{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            ${total.toFixed(2)}
          </span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Proceed to Payment
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-sm text-left table-auto border-collapse bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <th className="p-4">No.</th>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4 hidden md:table-cell">Category</th>
              <th className="p-4 hidden md:table-cell">Brand</th>
              <th className="p-4">Price</th>
              <th className="p-4">Delete</th>
              <th className="p-4">Payment</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
              >
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  {index + 1}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  {item.name}
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                  {item.category}
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                  {item.brand}
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  ${item.price.toFixed(2)}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="text-red-500 hover:text-red-600 text-3xl transition duration-150"
                    aria-label="Delete item"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
                <td>
                  <button className="flex justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm transition duration-150">
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
