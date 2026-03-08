import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ShopAds = ({ sellerId }) => {
  const axiosPublic = useAxios();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["shopAds", sellerId],
    enabled: !!sellerId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/shop-ads/${sellerId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>;
  }

  if (!ads.length) return null;

  return (
    <div className="mb-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        loop
        className="rounded-xl"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="w-full h-72 md:h-96 lg:h-125 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-xl overflow-hidden">
              <a href={ad.productLink} className="w-full h-full block">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopAds;
