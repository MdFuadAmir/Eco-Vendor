import { FaShop, FaShopSlash } from "react-icons/fa6";
import useAxios from "../../../Hooks/useAxios";
import { useEffect, useState } from "react";

const FollowButton = ({ sellerId, currentUserId, refetch }) => {
  const axiosPublic = useAxios();

  const [isFollowing, setIsFollowing] = useState(false);

  // check follow
  useEffect(() => {
    if (!currentUserId) return;

    axiosPublic
      .get(`/follow-check?sellerId=${sellerId}&userId=${currentUserId}`)
      .then((res) => {
        setIsFollowing(res.data.isFollowing);
      });
  }, [sellerId, currentUserId,axiosPublic]);

  const handleClick = async () => {
    if (!currentUserId) {
      alert("login first");
      return;
    }

    if (!isFollowing) {
      // FOLLOW
      await axiosPublic.post("/follow", {
        sellerId,
        userId: currentUserId,
      });

      setIsFollowing(true);
    } else {
      // UNFOLLOW
      await axiosPublic.delete("/unfollow", {
        data: {
          sellerId,
          userId: currentUserId,
        },
      });

      setIsFollowing(false);
    }
    refetch();
  };

  return (
    <button onClick={handleClick} className="btn btn-sm btn-accent">
      {isFollowing ? <FaShopSlash /> : <FaShop />}
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
