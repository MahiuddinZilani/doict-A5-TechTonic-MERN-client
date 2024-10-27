import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import carousel0 from "../assets/carousel-0.jpg";
import carousel1 from "../assets/carousel-1.jpg";
import carousel2 from "../assets/carousel-2.jpg";
import carousel3 from "../assets/carousel-3.png";
import carousel4 from "../assets/carousel-4.jpg";
import carousel5 from "../assets/carousel-5.jpg";

const Banner = () => {
  const images = [
    carousel3,
    carousel0,
    carousel1,
    carousel2,
    carousel4,
    carousel5,
  ];

  return (
    <div className="h-[38rem] overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={true}
        thumbWidth={80}
        className="h-full"
        renderThumbs={() =>
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover h-16 w-full" // Adjust height and width for visibility
            />
          ))
        }
      >
        {images.map((image, index) => (
          <div key={index} className="h-[38rem]">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
            {/* <p className="legend">Legend {index + 1}</p> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default Banner;
