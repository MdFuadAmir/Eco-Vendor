import { Link } from "react-router";
import ProductList from "../Products/ProductList/ProductList"; 

const TopSell = () => {
  return (
    <div className="container py-12">
      <div className="flex justify-between items-center gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">
          Top Rating
        </h1>
        <Link to="/top-rated" className="btn btn-accent">
          View all
        </Link>
      </div>
      <ProductList
        endpoint="/products/top-rated"
        queryKey={["topRatedProducts"]}
        limit={12}     
        paginated={false} 
      />
    </div>
  );
};

export default TopSell;