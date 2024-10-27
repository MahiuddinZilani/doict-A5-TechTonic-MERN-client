import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { Link, useLoaderData } from "react-router-dom";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const loadedCategories = useLoaderData();

  useEffect(() => {
    setCategories(loadedCategories);
  }, [loadedCategories]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Categories</h1>
      <hr />
      <Link
        to={"/dashboard/addProduct"}
        className="btn mx-auto my-8 flex bg-green-700 text-white hover:text-black w-2/12 h-fit p-2"
      >
        <p> Add Category</p>
        <AiOutlineAppstoreAdd className="text-3xl" />
      </Link>
      {/* Directly integrate AddCategory */}
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
