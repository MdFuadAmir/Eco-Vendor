import { Link } from "react-router";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";

const AdsBannerSkeleton = () => (
  <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-6 animate-pulse">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="h-64 w-64 bg-gray-200 rounded-xl" />
    ))}
  </div>
);

const AdsBanner = () => {
  const sliderRef = useRef(null);
  const axiosPublic = useAxios();

  const { data: adsContent = [], isLoading } = useQuery({
    queryKey: ["activeOfferSliders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/content/offerSliders/active");
      return res.data;
    },
  });

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

  if (isLoading) {
    return <AdsBannerSkeleton />;
  }

  return (
    <div className="relative container mx-auto py-12">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:text-white dark:bg-gray-800 shadow p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:text-white dark:bg-gray-800 shadow p-2 rounded-full"
      >
        <FaChevronRight />
      </button>

      <div
        ref={sliderRef}
        className="grid grid-rows-1 grid-flow-col auto-cols-max gap-6 overflow-x-auto md:overflow-x-hidden"
      >
        {adsContent.map((ads) => (
          <Link key={ads._id} to={ads.link || "/"}>
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