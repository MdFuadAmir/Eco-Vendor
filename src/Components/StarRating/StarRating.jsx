import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({rating}) => {
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1 text-yellow-600">
      {[...Array(totalStars)].map((_, index) => {
        if (rating >= index + 1) {
          return <FaStar key={index} />;
        } else if (rating >= index + 0.5) {
          // half star
          return <FaStarHalfAlt key={index} />;
        } else {
          // empty star
          return <FaRegStar key={index} />;
        }
      })}
      <span className="ml-2 text-lightsubtitle dark:text-darksubtitle text-sm">({rating})</span>
    </div>
  );
};

export default StarRating;
