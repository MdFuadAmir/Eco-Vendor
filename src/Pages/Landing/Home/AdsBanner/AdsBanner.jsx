import { Link } from "react-router";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ads1 from "../../../../assets/adsbanner/img8.jpg";
import ads2 from "../../../../assets/adsbanner/img2.jpg";
import ads3 from "../../../../assets/adsbanner/img3.jpg";
import ads4 from "../../../../assets/adsbanner/img4.jpg";
import ads5 from "../../../../assets/adsbanner/img5.jpg";
import ads6 from "../../../../assets/adsbanner/img6.jpg";
import ads7 from "../../../../assets/adsbanner/img7.jpg";
import ads8 from "../../../../assets/adsbanner/img1.jpg";

const adsContent = [
  { id: 1, image: ads1, path: "/" },
  { id: 2, image: ads2, path: "/" },
  { id: 3, image: ads3, path: "/" },
  { id: 4, image: ads4, path: "/" },
  { id: 5, image: ads5, path: "/" },
  { id: 6, image: ads6, path: "/" },
  { id: 7, image: ads7, path: "/" },
  { id: 8, image: ads8, path: "/" },
];

const AdsBanner = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative container mx-auto">
      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:text-white dark:bg-gray-800 shadow p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:text-white dark:bg-gray-800 shadow p-2  rounded-full"
      >
        <FaChevronRight />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="grid grid-rows-1 grid-flow-col auto-cols-max gap-6 
        overflow-x-auto md:overflow-x-hidden"
      >
        {adsContent.map((ads) => (
          <Link key={ads.id} to={ads.path}>
            <img
              src={ads.image}
              alt=""
              className="rounded-xl h-64 w-full object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdsBanner;
