import { useQuery } from "@tanstack/react-query";
import Product from "./Product";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";

const JustForYou = () => {
  const axiosPublic = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["just-for-you-products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/products/just-for-you");
      return data;
    },
  });

  return (
    <div className="container">
      <h1 className="text-xl md:text-2xl font-bold mb-6 dark:text-white">
        Just for you
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <Product key={i} loading={true} />
            ))
          : products.map((prod) => <Product key={prod._id} prod={prod} />)}
      </div>

      <div className="flex justify-center items-center py-12">
        <Link to={"/products"} className="btn btn-accent">
          View more <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default JustForYou;
