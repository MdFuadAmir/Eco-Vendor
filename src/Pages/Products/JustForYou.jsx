import { useEffect, useState } from "react";
import Product from "./Product";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const JustForYou = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products/just-for-you")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container">
      <h1 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">
        Just for you
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((prod) => (
          <Product key={prod._id} prod={prod} />
        ))}
      </div>
      <div className="flex justify-center items-center py-12">
        <Link to={'/products'} className="btn btn-accent">
          View more <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default JustForYou;
