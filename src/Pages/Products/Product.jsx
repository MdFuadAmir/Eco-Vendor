import ShortText from "../../Components/ShortText/ShortText";
import StarRating from "../../Components/StarRating/StarRating";

const Product = ({ prod }) => {
  const { image, name, disc, rating, price, discprice } = prod;
  return (
    <div className="bg-white dark:bg-neutral-800 px-3 py-2 rounded-lg hover:shadow-lg dark:shadow-gray-800 transition duratio-200">
      <div className="flex justify-center">
        <img src={image} alt="" className="max-h-32 object-contain" />
      </div>
      <div className="mt-2">
        <h1 className="text-md font-bold dark:text-gray-200">{name}</h1>
        <ShortText text={disc}/>
        <StarRating rating={rating} />
        <p className="text-emerald-400 pt-1">$ {discprice ? discprice : price}</p>
      </div>
    </div>
  );
};

export default Product;
