import { FaStar } from "react-icons/fa";

const RatingFilter = ({ rating, setRating }) => {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-white">Rating</span>

      <div className="flex gap-2">
        {ratings.map((r) => (
          <button
            key={r}
            onClick={() => setRating(r)}
            className={`flex items-center gap-1 px-2 py-1 rounded border ${
              rating === r
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-darkbody text-black dark:text-white"
            }`}
          >
            {r} <FaStar className="text-yellow-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;