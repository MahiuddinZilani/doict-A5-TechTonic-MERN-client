import { useEffect, useState } from "react";
import ProductRating from "./shared/ProductRating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import Swiper navigation styles
import { Pagination, Autoplay, Navigation } from "swiper/modules"; // Import Navigation module

const HighlightsSection = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5100/products")
      .then((res) => res.json())
      .then((data) => {
        setHighlights(data.filter((product) => product?.rating > 4.8));
      })
      .catch((error) => console.error("Failed to load products:", error));
  }, []);

  return (
    // <section className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 py-12">
    <section className="bg-[#0A1F44] py-12 text-white">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-amber-500 mb-6">Highlights</h2>
        <p className="text-lg text-gray-300 mb-8">
          Discover our best sellers, top-rated products, and exclusive offers.
        </p>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper  "
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {highlights.map((item, index) => (
            <SwiperSlide
              key={index}
              className="transition-transform transform hover:scale-105 my-8"
            >
              <div className="bg-slate-200 rounded-lg shadow-lg overflow-hidden">
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
                  <button className="bg-[#0A1F44] text-white px-4 py-2 rounded mt-4 hover:bg-blue-500">
                    Learn More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HighlightsSection;
