/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import styles from "./EditProductModal.module.css";
import uploadImageToImgBB from "../../imgBB/imgbb.config";

Modal.setAppElement("#root");

// eslint-disable-next-line react/prop-types
const EditProductModal = ({ product, isOpen, onRequestClose, onUpdate }) => {
  //   const [updatedProduct, setUpdatedProduct] = useState({
  //     name: product?.name || "",
  //     price: product?.price || "",
  //     description: product?.description || "",
  //     stock: product?.stock || "",
  //     photoURL: product?.photoURL,
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     fetch(`https://a5-tech-tonic-mern-server.vercel.app/products/${product._id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedProduct),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Product Updated",
  //           text: "The product details have been successfully updated!",
  //         });
  //         onUpdate(data); // Call the update handler to refresh the product list
  //         onRequestClose(); // Close the modal
  //       })
  //       .catch((error) => {
  //         console.error("Error updating product:", error);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Update Failed",
  //           text: "There was an issue updating the product.",
  //         });
  //       });
  //   };

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    stock: product?.stock || "",
    photo: product?.photoURL || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setUpdatedProduct((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = updatedProduct.photo;

    // Check if a new image file is provided
    if (updatedProduct.photo && updatedProduct.photo instanceof File) {
      imageUrl = await uploadImageToImgBB(updatedProduct.photo);
      // console.log(imageUrl);
    }

    // If image upload failed, don't proceed with form submission
    if (!imageUrl) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload the image. Please try again.",
      });
      return;
    }

    const updatedProductData = {
      ...updatedProduct,
      photoURL: imageUrl,
    };

    fetch(
      `https://a5-tech-tonic-mern-server.vercel.app/products/${product._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Product Updated",
          text: "The product details have been successfully updated!",
        });
        onUpdate(data); // Call the update handler to refresh the product list
        onRequestClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "There was an issue updating the product.",
        });
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Product Modal"
      overlayClassName={styles.modalOverlay}
      className={styles.modal}
    >
      <h2 className="modal-title">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* <!-- Name Field --> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product name"
          />
        </div>

        {/* <!-- Price Field --> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product price"
          />
        </div>

        {/* <!-- Description Field --> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description:
          </label>
          <textarea
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product description"
            rows="4"
          />
        </div>

        {/* <!-- Stock Field --> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock:
          </label>
          <input
            type="number"
            name="stock"
            value={updatedProduct.stock}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter stock quantity"
          />
        </div>

        {/* <!-- Photo Upload Field --> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Product Photo:
          </label>
          <input
            type="file"
            name="photo"
            onChange={handleImageChange}
            // type="file"
            // name="photo"
            // accept="image/*"
            // onChange={(e) =>
            //   setUpdatedProduct((prev) => ({
            //     ...prev,
            //     photo: e.target.files[0],
            //   }))
            // }
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* <!-- Buttons --> */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
