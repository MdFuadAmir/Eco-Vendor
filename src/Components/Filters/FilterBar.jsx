import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

const FilterBar = ({
  priceSort,
  setPriceSort,
  rating,
  setRating,
  showPrice = true,
  showRating = true,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {showPrice && (
        <PriceFilter priceSort={priceSort} setPriceSort={setPriceSort} />
      )}

      {showRating && (
        <RatingFilter rating={rating} setRating={setRating} />
      )}
    </div>
  );
};

export default FilterBar;