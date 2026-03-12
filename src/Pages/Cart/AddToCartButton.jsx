import { FaShoppingCart } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const AddToCartButton = ({ product, variant = "icon", className = "" }) => {
  const axiosPublic = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const cartItem = {
        userEmail: user?.email,
        productId: product._id,
        name: product.name,
        sellerId: product.sellerId,
        image: product.mainImage,
        price: product.price,
      };

      const { data } = await axiosPublic.post("/cart", cartItem);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Added to cart");
    },
  });

  const handleCart = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    mutation.mutate();
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleCart}
        className={`flex items-center justify-center ${className}`}
      >
        <FaShoppingCart />
      </button>
    );
  }
  return (
    <button
      onClick={handleCart}
      className={`flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition ${className}`}
    >
      <FaShoppingCart />
      Add To Cart
    </button>
  );
};

export default AddToCartButton;
