import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Cart = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/cart?email=${user.email}`);
      return data;
    },
  });

  // shop wise group
  const grouped = cart.reduce((acc, item) => {
    if (!acc[item.sellerId]) {
      acc[item.sellerId] = {
        shopName: item.shopName,
        items: [],
      };
    }

    acc[item.sellerId].items.push(item);

    return acc;
  }, {});

  const handleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleShopSelect = (items) => {
    const ids = items.map((i) => i._id);

    const allSelected = ids.every((id) => selectedItems.includes(id));

    if (allSelected) {
      setSelectedItems(selectedItems.filter((id) => !ids.includes(id)));
    } else {
      setSelectedItems([...new Set([...selectedItems, ...ids])]);
    }
  };

  const updateQty = async (id, quantity) => {
    if (quantity < 1) return;

    // optimistic update
    queryClient.setQueryData(["cart", user?.email], (oldCart) =>
      oldCart.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );

    try {
      await axiosPublic.patch(`/cart/${id}`, { quantity });
    } catch {
      // rollback if error
      queryClient.invalidateQueries(["cart", user?.email]);
    }
  };

  const deleteItem = async (id) => {
    await axiosPublic.delete(`/cart/${id}`);

    refetch();
  };

  // calculate totals
  let productsTotal = 0;
  let shippingTotal = 0;

  Object.values(grouped).forEach((shop) => {
    const selectedShopItems = shop.items.filter((item) =>
      selectedItems.includes(item._id),
    );

    if (selectedShopItems.length > 0) {
      // products price
      selectedShopItems.forEach((item) => {
        productsTotal += item.price * item.quantity;
      });

      // shipping fee only once
      shippingTotal += selectedShopItems[0].shippingFee;
    }
  });

  const grandTotal = productsTotal + shippingTotal;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/* CART LIST */}
      <div className="md:col-span-2 space-y-6">
        {Object.entries(grouped).map(([sellerId, shop]) => (
          <div key={sellerId} className="border p-4 rounded-lg">
            {/* <h2 className="font-bold mb-4">{shop.shopName}</h2> */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={shop.items.every((item) =>
                  selectedItems.includes(item._id),
                )}
                onChange={() => handleShopSelect(shop.items)}
              />

              <h2 className="font-bold">{shop.shopName}</h2>
            </div>

            {shop.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b py-3"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleSelect(item._id)}
                />

                <img src={item.image} className="w-20 h-20 object-cover" />

                <div className="flex-1">
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => updateQty(item._id, item.quantity - 1)}
                    className="px-2 border"
                  >
                    -
                  </button>

                  <span className="px-3 transition-all duration-200">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQty(item._id, item.quantity + 1)}
                    className="px-2 border"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => deleteItem(item._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="border p-6 rounded-lg h-fit">
        <h2 className="font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Products</span>
          <span>${productsTotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>${shippingTotal}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${grandTotal}</span>
        </div>

        <button
          onClick={() => {
            if (selectedItems.length === 0) {
              toast.error("Please select at least one product");
              return;
            }

            const items = cart.filter((item) =>
              selectedItems.includes(item._id),
            );

            navigate("/checkout", {
              state: { items },
            });
          }}
          className="w-full bg-orange-500 text-white py-2 mt-4 rounded"
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
