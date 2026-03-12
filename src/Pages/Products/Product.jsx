import { Link } from "react-router-dom";
import StarRating from "../../Components/StarRating/StarRating";
import ShortText from "../../Components/ShortText/ShortText";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Tilt from "react-parallax-tilt";
import { FaShoppingCart, FaShareAlt } from "react-icons/fa";
import WishlistButton from "../../Components/WishlistButton/WishlistButton";
import AddToCartButton from "../Cart/AddToCartButton";

const Product = ({ prod, loading, isFlashSale = false }) => {
  if (loading) {
    return (
      <div className="bg-lightnav dark:bg-slate-800 px-3 py-2 rounded-lg">
        <Skeleton height={120} />
        <div className="mt-4 space-y-2">
          <Skeleton height={20} />
          <Skeleton width={80} />
          <Skeleton width={60} />
        </div>
      </div>
    );
  }

  const { mainImage, name, rating, price, discprice, flashSalePrice, _id } =
    prod;

  return (
    <Tilt
      tiltMaxAngleX={16}
      tiltMaxAngleY={16}
      className="group relative cursor-pointer bg-lightnav dark:bg-slate-800 px-3 py-2 rounded-lg overflow-hidden"
    >
      {/* ACTION BUTTONS */}

      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition duration-300">
        {/* Wishlist */}
        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-300 rounded-full shadow hover:bg-red-300 hover:text-white transition">
          <WishlistButton productId={_id} />
        </div>

        {/* Cart */}
        <button className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-300 rounded-full shadow hover:bg-emerald-500 hover:text-white transition">
          <AddToCartButton product={prod} />
        </button>

        {/* Share */}
        <button className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-300 rounded-full shadow hover:bg-blue-500 hover:text-white transition">
          <FaShareAlt size={14} />
        </button>
      </div>

      <Link to={`/productDetails/${_id}`}>
        <div className="flex justify-center relative z-10">
          <img
            src={mainImage}
            alt={name}
            className="max-h-32 w-full object-contain rounded-md transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-4">
          <ShortText text={name} />
          <StarRating rating={rating} />

          <div className="pt-1 flex gap-2 items-center">
            {isFlashSale ? (
              <>
                <span className="text-red-600 font-semibold">
                  ${flashSalePrice}
                </span>

                {price && price !== flashSalePrice && (
                  <span className="line-through text-gray-400 text-sm">
                    ${price}
                  </span>
                )}
              </>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400">
                ${discprice ? discprice : price}
              </span>
            )}
          </div>
        </div>
      </Link>
    </Tilt>
  );
};

export default Product;


