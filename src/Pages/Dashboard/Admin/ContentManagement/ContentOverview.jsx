import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import Skeleton from "react-loading-skeleton";
import { AiOutlineDashboard } from "react-icons/ai";
const ContentOverview = () => {
  const axiosPublic = useAxios();

  const { data: slider = [], isLoading: sliderLoading } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const res = await axiosPublic.get("/content/sliders");
      return res.data;
    },
  });
  const { data: offer = [], isLoading: offerLoading } = useQuery({
    queryKey: ["offer"],
    queryFn: async () => {
      const res = await axiosPublic.get("/content/offerSliders");
      return res.data;
    },
  });
  const { data: seo = [], isLoading: seoLoading } = useQuery({
    queryKey: ["seo"],
    queryFn: async () => {
      const res = await axiosPublic.get("/content/seo");
      return res.data;
    },
  });
  return (
    <div className="p-4 bg-base-100 dark:bg-darknav/80 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-2 dark:text-white flex items-center gap-2">
        <AiOutlineDashboard/> Content Overview
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-200">
        Select a content section above to manage homepage sliders, offers, and
        SEO metadata.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {sliderLoading ? (
          <Skeleton count={1} height={60} borderRadius={12} />
        ) : (
          <Cards title={"Homepage Sliders"} number={slider?.length || 0} />
        )}
        {offerLoading ? (
          <Skeleton count={1} height={60} borderRadius={12} />
        ) : (
          <Cards title={"Offer Banners"} number={offer?.length || 0} />
        )}
        {seoLoading ? (
          <Skeleton count={1} height={60} borderRadius={12} />
        ) : (
          <Cards title={"SEO Entries"} number={seo?.length || 0} />
        )}
      </div>
    </div>
  );
};

export default ContentOverview;

const Cards = ({ title, number }) => {
  return (
    <div className=" stat bg-base-200 dark:bg-darkbody rounded">
      <div className="text-xs  dark:text-gray-400">{title}</div>
      <div className="text-2xl font-bold dark:text-gray-200">{number}</div>
    </div>
  );
};
