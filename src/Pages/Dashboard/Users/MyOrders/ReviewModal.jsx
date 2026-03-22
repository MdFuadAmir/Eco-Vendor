import { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ order, closeModal, submitReview }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    submitReview({
      rating,
      comment,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
        <h2 className="text-lg font-bold mb-4">Review {order.shopName}</h2>

        {/* ⭐ Animated Rating */}
        <div className="flex gap-2 mb-4 text-3xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className={`
                cursor-pointer
                transition-all duration-200
                ${
                  (hover || rating) >= star
                    ? "text-yellow-400 scale-110"
                    : "text-gray-300"
                }
              `}
            />
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-3">
          Your Rating: <span className="font-semibold">{rating} ⭐</span>
        </p>

        {/* comment */}
        <textarea
          className="border w-full p-2 mb-3 rounded"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
