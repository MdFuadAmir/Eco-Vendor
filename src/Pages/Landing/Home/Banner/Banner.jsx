import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import BannerSkeleton from "./BannerSkeleton";
import { Link } from "react-router";

const Banner = () => {
  const axiosPublic = useAxios();

  const { data: sliders = [], isLoading } = useQuery({
    queryKey: ["activeSliders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/content/sliders");
      return res.data.filter((item) => item.status === "active");
    },
  });

  if (isLoading) {
    return <BannerSkeleton />;
  }

  return (
    <div className="container pt-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* slider banners */}
        <div className="flex-4">
          <Carousel infiniteLoop autoPlay showThumbs={false}>
            {sliders.map((slider) => (
              <div
                key={slider._id}
                className="w-full h-96 relative rounded-xl overflow-hidden"
              >
                <Link
                  to={slider?.link || "/"}
                  className="absolute inset-0 z-10 w-full h-full"
                />
                <img
                  src={slider.image}
                  alt={slider.title}
                  className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex-1 hidden lg:flex flex-col h-96">
          <div className="h-1/2 pb-2">
            <img
              src="https://i.ibb.co.com/KxX2sNzn/ads1.webp"
              alt=""
              className="w-full h-full rounded-xl"
            />
          </div>
          <div className="h-1/2 pt-2">
            <img
              src="https://i.ibb.co.com/DTW2gtq/ads2.jpg"
              alt=""
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
