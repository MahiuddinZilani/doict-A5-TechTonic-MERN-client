import { useState, useEffect } from "react";
import uploadImageToImgBB from "../imgBB/imgbb.config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadMethod, setUploadMethod] = useState("file");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://a5-tech-tonic-mern-server.vercel.app/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImageToImgBB(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName || !imageUrl) {
      console.warn("Category name or image URL missing!");
      return;
    }

    const newCategory = {
      id: toString(categories.length + 1),
      name: categoryName,
      description: description,
      photoURL: imageUrl,
    };

    fetch("https://a5-tech-tonic-mern-server.vercel.app/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory), // Use newCategory directly
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add category");
        }
        return response.json();
      })
      .then((data) => {
        setCategories((prevCategories) => [...prevCategories, data]);
        Swal.fire({
          icon: "success",
          title: "Category Added",
          text: "The category has been added successfully!",
        });

        setCategoryName("");
        setDescription("");
        setImageUrl("");
        setUploadMethod("file");

        navigate(-1);
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "An error occurred while adding the category.",
        });
      });
  };

  return (
    <div className="add-category-form">
      <h2 className="text-lg font-semibold">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block">Upload Method</label>
          <select
            value={uploadMethod}
            onChange={(e) => setUploadMethod(e.target.value)}
            className="input input-bordered w-full"
          >
            <option value="file">Upload Image File</option>
            <option value="url">Enter Image URL</option>
          </select>
        </div>

        {uploadMethod === "file" && (
          <div className="mt-4">
            <label className="block">Category Image (Upload)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="input input-bordered w-full"
            />
          </div>
        )}

        {uploadMethod === "url" && (
          <div className="mt-4">
            <label className="block">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
              required
            />
          </div>
        )}

        {imageUrl && (
          <div className="mt-4">
            <img src={imageUrl} alt="Preview" className="h-20 w-20" />
          </div>
        )}

        <div className="mt-4">
          <button
            type="submit"
            className="btn rounded-xl bg-[#0A1F44] text-white hover:bg-transparent hover:border hover:border-[#0A1F44] hover:text-[#0A1F44]"
          >
            Add Category
          </button>
        </div>
      </form>

      {/* Display categories */}
      <div className="mt-8">
        <h3 className="text-lg text-center font-semibold">
          Display All Categories
        </h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="mt-2">
              <img
                src={category.photoURL}
                alt={category.name}
                className="h-10 w-10 inline-block"
              />
              <span className="ml-2 font-bold">{category.name}</span>:{" "}
              {category.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;

// import { useState } from "react";
// import uploadImageToImgBB from "../imgBB/imgbb.config";
// import PropTypes from "prop-types";

// const AddCategory = ({ onAdd, isOpen, setIsOpen }) => {
//   const [categoryName, setCategoryName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     const url = await uploadImageToImgBB(file);
//     setImageUrl(url);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting category:", categoryName, description, imageUrl);

//     if (!categoryName || !imageUrl) {
//       console.warn("Category name or image URL missing!");
//       return;
//     }

//     const newCategory = {
//       name: categoryName,
//       description: description,
//       photoURL: imageUrl,
//     };

//     onAdd(newCategory);
//     setCategoryName("");
//     setDescription("");
//     setImageUrl("");
//     setIsOpen(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal modal-open">
//       <div className="modal-box">
//         <h2 className="text-lg font-semibold">Add Category</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mt-4">
//             <label className="block">Category Name</label>
//             <input
//               type="text"
//               value={categoryName}
//               onChange={(e) => setCategoryName(e.target.value)}
//               className="input input-bordered w-full"
//               required
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="input input-bordered w-full"
//               required
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block">Category Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="input input-bordered w-full"
//               required
//             />
//           </div>

//           <div className="modal-action">
//             <button
//               type="button"
//               className="btn"
//               onClick={() => setIsOpen(false)}
//             >
//               Close
//             </button>
//             <button type="submit" className="btn btn-primary">
//               Add Category
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;

// AddCategory.propTypes = {
//   onAdd: PropTypes.func.isRequired,
//   isOpen: PropTypes.bool.isRequired,
//   setIsOpen: PropTypes.func.isRequired,
// };
