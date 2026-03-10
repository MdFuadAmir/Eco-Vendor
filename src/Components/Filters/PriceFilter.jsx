import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const PriceFilter = ({ priceSort, setPriceSort }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-white">Price</span>

      <select
        value={priceSort}
        onChange={(e) => setPriceSort(e.target.value)}
        className="px-3 py-2 rounded bg-gray-200 dark:bg-darkbody text-black dark:text-white"
      >
        <option value="">Default</option>
        <option value="high">Max → Min</option>
        <option value="low">Min → Max</option>
      </select>
    </div>
  );
};

export default PriceFilter;