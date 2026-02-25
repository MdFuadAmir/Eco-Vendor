const AllOrders = () => {
  const orders = [
    {
      id: 1,
      shop: "Tech Shop",
      image: "https://i.ibb.co.com/nMRvm5Y3/code5.png",
      name: "Wireless Headphone",
      price: 2500,
      status: "Delivered",
      size: "N/A",
      color: "Black",
    },
    {
      id: 2,
      shop: "Fashion House",
      image: "https://i.ibb.co.com/nMRvm5Y3/code5.png",
      name: "Men T-Shirt",
      price: 900,
      status: "Shipped",
      size: "L",
      color: "Blue",
    },
  ];

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex gap-4 items-center bg-white dark:bg-slate-900 rounded-lg p-4"
        >
          <img
            src={order.image}
            alt={order.name}
            className="w-20 h-20 object-cover rounded"
          />

          <div className="flex-1">
            <p className="text-slate-200 font-semibold">{order.name}</p>
            <p className="text-slate-400 text-sm">Shop: {order.shop}</p>
            <p className="text-slate-400 text-sm">
              Size: {order.size} | Color: {order.color}
            </p>
            <p className="text-slate-300 mt-1">৳ {order.price}</p>
          </div>

          <div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                order.status === "Delivered"
                  ? "bg-green-600/20 text-green-400"
                  : order.status === "Shipped"
                  ? "bg-yellow-600/20 text-yellow-400"
                  : "bg-gray-600/20 text-gray-300"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;