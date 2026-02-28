import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxios from "../../Hooks/useAxios";


const SeoHelmet = ({ page }) => {
  const axiosPublic = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["seoMeta", page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/content/seo/${page}`);
      return res.data;
    },
  });

  if (isLoading) return <Helmet><title>Loading...</title></Helmet>;

  return (
    <Helmet>
      <title>{data?.title || "Eco-Vendex"}</title>
      <meta name="description" content={data?.description || ""} />
      <meta name="keywords" content={data?.keywords || ""} />
      <meta property="og:title" content={data?.title || ""} />
      <meta property="og:description" content={data?.description || ""} />
      <meta property="og:image" content={data?.image || ""} />
    </Helmet>
  );
};

export default SeoHelmet;