import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend
    fetch("http://localhost:5100/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
      <div className="grid grid-cols-1 w-full mx-auto md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="card bg-gray-100">
              <figure className="flex items-center justify-center h-40">
                <img
                  src={category?.photoURL}
                  alt={category?.name}
                  className="object-cover h-full w-full"
                />
              </figure>
              <div className="card-body p-4 text-center">
                <h2 className="text-2xl font-bold mb-2 text-center text-[#0A1F44]">
                  {category?.name}
                </h2>
                <Link
                  to={`/productsCategory/${category.name}`}
                  className="btn bg-[#0A1F44] text-white btn-sm mt-2"
                >
                  View {category?.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
