import { Link } from "react-router";
import StarRating from "../../Components/StarRating/StarRating";
import ShortText from "../../Components/ShortText/ShortText";

const Product = ({ prod }) => {
  const { mainImage, name, rating, price, discprice,_id } = prod;
  return (
    <Link to={`/productDetails/${_id}`} className="cursor-pointer bg-lightnav dark:bg-slate-800  px-3 py-2 rounded-lg hover:shadow-lg dark:shadow-darkcard/20 transition duratio-200">
      <div className="flex justify-center">
        <img src={mainImage} alt="" className="max-h-32 object-contain rounded-md" />
      </div>
      <div className="mt-4 ">
        <ShortText text={name}/>
        <StarRating rating={rating} />
        <p className="text-emerald-600 dark:text-emerald-400 pt-1">
          $ {discprice ? discprice : price}
        </p>
      </div>
    </Link>
  );
};

export default Product;
