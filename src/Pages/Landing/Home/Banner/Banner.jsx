import banner1 from "../../../../assets/banners/image1.jpg";
import banner2 from "../../../../assets/banners/image2.jpeg";
import banner4 from "../../../../assets/banners/image4.jpg";
import banner5 from "../../../../assets/banners/image5.jpg";
import banner6 from "../../../../assets/banners/image6.webp";
import banner7 from "../../../../assets/banners/image7.jpg";
import banner8 from "../../../../assets/banners/image8.jpg";
import banner9 from "../../../../assets/banners/image9.jpg";
import ads1 from "../../../../assets/banners/ads1.webp";
import ads2 from "../../../../assets/banners/ads2.jpeg";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const Banner = () => {
  return (
    <div className="container pt-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* slider banners */}
        <div className="flex-4">
          <Carousel infiniteLoop autoPlay showThumbs={false}>
            <div className="w-full h-96">
              <img
                src={banner1}
                className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
              />
            </div>
            <div className="w-full h-96">
              <img
                src={banner2}
                className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
              />
            </div>
            <div className="w-full h-96">
              <img
                src={banner4}
                className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
              />
            </div>
            <div className="w-full h-96">
              <img
                src={banner5}
                className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
              />
            </div>
            <div className="w-full h-96">
              <img
                src={banner6}
                className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
              />
            </div>
            <div className="w-full h-96">
              <img
                src={banner7}
                className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
              />
            </div>
            <div className="w-full h-96">
              <img
                src={banner8}
                className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
              />
            </div>
            <div className="w-full h-96">
              <img
                src={banner9}
                className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
              />
            </div>
          </Carousel>
        </div>
        {/* ads banner */}
        <div className="flex-1 hidden lg:flex flex-col h-96">
          <div className="h-1/2 pb-2">
            <img src={ads1} alt="" className="w-full h-full rounded-xl" />
          </div>
          <div className="h-1/2 pt-2">
            <img src={ads2} alt="" className="w-full h-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
