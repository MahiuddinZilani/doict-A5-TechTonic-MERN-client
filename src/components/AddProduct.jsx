import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import uploadImageToImgBB from "../imgBB/imgbb.config";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const allProducts = useLoaderData();
  const newId = allProducts.length + 1;

  useEffect(() => {
    fetch("https://a5-tech-tonic-mern-server.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => {
        // const categories = data.filter((datum) => datum?.name);
        setCategories(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [productData, setProductData] = useState({
    id: newId,
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    releaseDate: "",
    specifications: "",
    photoURL: "",
    rating: "",
    reviews: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await uploadImageToImgBB(file); // Wait for image to upload and URL to return

    if (imageUrl) {
      setProductData((prevData) => ({
        ...prevData,
        photoURL: imageUrl, // Set the photoURL once the upload completes
      }));
    } else {
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Please try uploading the image again.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if photoURL exists before submitting
    if (!productData.photoURL) {
      Swal.fire({
        icon: "error",
        title: "Image Required",
        text: "Please upload an image before submitting.",
      });
      return;
    }

    try {
      const res = await fetch(
        "https://a5-tech-tonic-mern-server.vercel.app/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!res.ok) throw new Error("Failed to add product");

      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "The new product has been added successfully!",
      });

      // Clear the form after successful submission
      setProductData({
        id: "",
        name: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        releaseDate: "",
        specifications: "",
        photoURL: "",
        rating: "",
        reviews: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue adding the product.",
      });
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        {/* Product ID */}
        <div>
          <label className="block mb-2 text-gray-700">Product ID</label>
          <input
            type="text"
            name="id"
            value={newId}
            readOnly
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block mb-2 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-2 text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-gray-700">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Release Date */}
        <div>
          <label className="block mb-2 text-gray-700">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={productData.releaseDate}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Specifications */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-gray-700">Specifications</label>
          <textarea
            name="specifications"
            value={productData.specifications}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            rows="3"
            // required
          />
        </div>

        {/* Photo Upload */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-gray-700">
            Upload Product Photo
          </label>
          <input
            type="file"
            name="photoURL"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-2 text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            step="0.1"
            min="0"
            max="5"
            required
          />
        </div>

        {/* Reviews */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-gray-700">Reviews</label>
          <textarea
            name="reviews"
            value={productData.reviews}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            rows="2"
            // required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
