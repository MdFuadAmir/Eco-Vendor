import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";

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
    return (
      <div className="container pt-6">
        <div className="w-full h-96 bg-gray-300 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="container pt-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* slider banners */}
        <div className="flex-4">
          <Carousel infiniteLoop autoPlay showThumbs={false}>
            {sliders.map((slider) => (
              <div key={slider._id} className="w-full h-96 relative">
                <img
                  src={slider.image}
                  className="w-full h-full object-cover dark:bg-slate-900 rounded-xl"
                />

                {/* optional text overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 text-white">
                  <h2 className="text-2xl md:text-4xl font-bold">
                    {slider.title}
                  </h2>
                  <p className="mt-2">{slider.subtitle}</p>

                  {slider.buttonText && (
                    <a
                      href={slider.link}
                      className="btn btn-primary w-fit mt-4"
                    >
                      {slider.buttonText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* ads banner (static রাখতে পারো) */}
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
