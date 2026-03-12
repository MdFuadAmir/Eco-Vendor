import { useMutation } from "@tanstack/react-query";
import { FaHeartCirclePlus, FaHeartCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import useWishlist from "../../Hooks/useWishlist";

const WishlistButton = ({ productId }) => {
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const { wishlist, refetch } = useWishlist();

  const isWishlisted = wishlist?.some((item) => item._id === productId);

  const addMutation = useMutation({
    mutationFn: async () => {
      return axiosPublic.post("/wishlist", {
        userEmail: user?.email,
        productId,
      });
    },
    onSuccess: () => refetch(),
  });

  const removeMutation = useMutation({
    mutationFn: async () => {
      return axiosPublic.delete(`/wishlist/${productId}?email=${user.email}`);
    },
    onSuccess: () => refetch(),
  });

  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isWishlisted) removeMutation.mutate();
    else addMutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-xl transition hover:scale-110"
    >
      {isWishlisted ? (
        <FaHeartCircleCheck className="text-pink-500" />
      ) : (
        <FaHeartCirclePlus />
      )}
    </button>
  );
};

export default WishlistButton;