import PriceFilter from "../../Components/Filters/PriceFilter";
import RatingFilter from "../../Components/Filters/RatingFilter";
import ProductList from "../Products/ProductList/ProductList";

const TopRatedPage = () => {
  return (
    <div className="container pb-16">
      {/* 🔥 Banner Section */}
      <div className="mb-8 rounded-xl overflow-hidden bg-linear-to-r from-amber-300 via-orange-500 to-red-600">
        <div className="px-6 py-10 md:py-14 text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold">
            ⭐ Top Rated Products
          </h1>
          <p className="mt-2 text-sm md:text-base opacity-90">
            Discover the best products loved by our customers
          </p>
        </div>
      </div>
      <div>
        <PriceFilter />
        <RatingFilter />
        {/* <FilterBar/> */}
      </div>
      <ProductList
        endpoint="/products/top-rated/all"
        queryKey={["topRatedAll"]}
        limit={20}
        paginated={true}
        showSearch={true}
        showPriceFilter={true}
        showRatingFilter={true}
      />
    </div>
  );
};

export default TopRatedPage;
