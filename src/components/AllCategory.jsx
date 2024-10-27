import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import AddCategory from "./AddCategory";
import Swal from "sweetalert2";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false); // State to control modal visibility
  const loadedCategories = useLoaderData();

  useEffect(() => {
    setCategories(loadedCategories);
  }, [loadedCategories, categories]);

  const handleAddCategory = (newCategory) => {
    const categoryToSend = {
      ...newCategory,
      id: toString(categories.length + 1),
    };

    fetch("https://a5-tech-tonic-mern-server.vercel.app/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryToSend),
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
    <div>
      <h1 className="text-2xl font-semibold">Categories</h1>
      <hr />
      <button
        className="btn w-1/2 mx-auto my-2 flex bg-green-700 text-white hover:text-black"
        onClick={() => setIsAddCategoryOpen(true)} // Open the modal
      >
        <AiOutlineAppstoreAdd className="text-3xl" /> <p> Add Category</p>
      </button>

      <AddCategory
        onAdd={handleAddCategory}
        isOpen={isAddCategoryOpen}
        setIsOpen={setIsAddCategoryOpen}
      />

      <div className="overflow-x-auto">
        <table className="table table-md">
          {/* head */}
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Photo</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {categories.map((category, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={category.photoURL} alt="Category" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-bold text-lg">{category.name}</td>
                <td>{category.description}</td>
                <th>
                  <FaEdit />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategory;

// AllCategory.PropType = {

// }
