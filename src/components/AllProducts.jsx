import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import EditProductModal from "./shared/EditProductModal";
import { MdAddToPhotos } from "react-icons/md";

const AllProducts = () => {
  const loadedProducts = useLoaderData();
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProducts(loadedProducts);
  }, [loadedProducts]);

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod._id === updatedProduct._id ? updatedProduct : prod
      )
    );
  };

  const handleProductDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5100/products/${_id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete the product.");
            }
            return res.json();
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            const remaining = products.filter((product) => product._id !== _id);
            setProducts(remaining);
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the product.",
              icon: "error",
            });
            console.error("Error deleting product:", error);
          });
      }
    });
    console.log(_id);
  };

  const handleEditClick = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  // console.log(products);

  console.log(selectedProduct, isModalOpen);
  return (
    <div>
      <h1>All Products ({products.length})</h1>
      <Link
        to={"/dashboard/addProduct"}
        className="btn mx-auto my-8 flex bg-green-700 text-white hover:text-black w-2/12 h-fit p-2"
      >
        <p> Add Product</p>
        <MdAddToPhotos className="text-3xl" />
      </Link>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Product Id</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-xl">
                      <img src={product?.photoURL} />
                    </div>
                  </div>
                </td>
                <td>{product?.id}</td>
                <td>{product?.name}</td>
                <td>{product?.brand}</td>
                <td>{product?.category}</td>
                <td>{product?.price}</td>
                <td>{product?.stock}</td>
                <td>
                  <div className="flex h-auto justify-around items-center text-xl ">
                    <Link onClick={() => handleEditClick(product)}>
                      <FaEdit className="text-red-600" />
                    </Link>
                    <Link onClick={() => handleProductDelete(product?._id)}>
                      <MdDeleteForever className="text-blue-600 text-2xl" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
