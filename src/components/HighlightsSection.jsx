import { useEffect, useState } from "react";
import ProductRating from "./shared/ProductRating";

const HighlightsSection = () => {
  //   const [loadedProducts, setLoadedProducts] = useState([]);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5100/products")
      .then((res) => res.json())
      .then((data) => {
        // setLoadedProducts(data);
        setHighlights(data.filter((product) => product?.rating > 4.8));
      })
      .catch((error) => console.error("Failed to load products:", error));
  }, []); // Empty dependency array to fetch only once on mount

  console.log(highlights);

  return (
    <section className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Highlights</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover our best sellers, top-rated products, and exclusive offers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={item.photoURL}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div>
                  <ProductRating rating={item.rating} />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
