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
      <h1>Categories</h1>
      <hr />
      <Link className="btn my-2 flex bg-green-700 text-white hover:text-black">
        {" "}
        <p> New Category</p>
        <AiOutlineAppstoreAdd />
      </Link>

      <div className="overflow-x-auto">
        <table className="table">
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
              <>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={category.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="w-1/4 text-xl text-center">{category.name}</td>
                  <td>{category.description}</td>
                  <th>
                    <FaEdit />
                  </th>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategory;
