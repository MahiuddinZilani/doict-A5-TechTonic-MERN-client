import { useState } from "react";
import uploadImageToImgBB from "../imgBB/imgbb.config";
import PropTypes from "prop-types";

const AddCategory = ({ onAdd, isOpen, setIsOpen }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImageToImgBB(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName && imageUrl) {
      const newCategory = {
        name: categoryName,
        description: description,
        photoURL: imageUrl,
      };

      onAdd(newCategory);
      setCategoryName("");
      setDescription("");
      setImageUrl("");
      setIsOpen(false); // Close the modal
    }
  };

  if (!isOpen) return null; // Prevent rendering if the modal is not open

  return (
    <div className="modal modal-open">
      <div className="modal-box">
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
            <label className="block">Category Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="input input-bordered w-full"
              required
            />
          </div>

          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="Preview" className="h-20 w-20" />
            </div>
          )}

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;

AddCategory.propTypes = {
  onAdd: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
