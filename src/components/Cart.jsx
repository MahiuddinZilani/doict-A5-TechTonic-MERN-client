import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Cart = () => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5100/carts/${user.email}`, {})
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setTotal(data.reduce((sum, product) => sum + product.price, 0)); // calculate total price
      })
      .catch((error) => console.error(error));
  }, [user?.email]);

  console.log(cart);

  return (
    <>
      <div>My Cart</div>
      <div className="flex justify-between items-center">
        <div>Total Items: {cart.length}</div>
        <div>Total Price: ${total}</div>
        <button className="btn">Proceed to Payment</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table header */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Table rows for each cart item */}
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.photoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>${item.price}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Cart;
