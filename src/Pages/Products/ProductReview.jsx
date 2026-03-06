import React from "react";
import StarRating from "../../Components/StarRating/StarRating";
import { MdVerifiedUser } from "react-icons/md";
import Pagination from "../../Components/Pagination/Pagination";

const ProductReview = () => {
  return (
    <div>
      <div className="mt-2 bg-slate-100 dark:bg-gray-800 p-4 mb-12">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Customer Reviews
        </h2>
        <div className="">
          {/*  Rating Summary */}
          <div className="bg-white h-fit max-w-md mx-auto dark:text-white mb-6 dark:bg-gray-900 p-6 rounded-xl">
            <h3 className="text-4xl font-bold text-center">4.5</h3>

            <div className="flex justify-center mt-2">
              <StarRating rating={4.5} />
            </div>

            <p className="text-center text-gray-500 mt-1">
              Based on 124 reviews
            </p>

            {/* Rating bars */}

            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm w-6">{star}⭐</span>

                  <div className="flex-1 h-2 bg-gray-300 rounded">
                    <div className="h-2 bg-yellow-400 rounded w-[70%]"></div>
                  </div>

                  <span className="text-xs text-gray-500">70%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div
                key={review}
                className="rounded-xl p-5 bg-white dark:bg-gray-900"
              >
                <div className="flex justify-between items-center">
                  <div className="">
                    <StarRating rating={5} />
                    <div>
                      <h4 className="font-semibold dark:text-white flex items-center gap-3">
                        Mahfuzur Rahman <span className="text-green-500 flex items-center text-xs"><MdVerifiedUser size={15}/> Verified</span>
                      </h4>
                      <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-gray-700 dark:text-gray-200">
                  Very good product. Quality is excellent and delivery was fast.
                  I highly recommend this product to everyone.
                </p>
              </div>
            ))}
            <div>
                <Pagination/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
