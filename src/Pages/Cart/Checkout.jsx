// import { useLocation, useNavigate } from "react-router";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../Hooks/useAxios";
// import useAuth from "../../Hooks/useAuth";
// import toast from "react-hot-toast";

// const Checkout = () => {
//   const { state } = useLocation();
//   const { items } = state;

//   const axiosPublic = useAxios();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [payment, setPayment] = useState("");
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   // load addresses
//   const { data: addresses = [] } = useQuery({
//     queryKey: ["addresses", user?.email],

//     enabled: !!user,

//     queryFn: async () => {
//       const { data } = await axiosPublic.get(`/addresses?email=${user.email}`);

//       return data;
//     },
//   });

  

//   // totals
//   const productsTotal = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   const shipping = [...new Set(items.map((i) => i.sellerId))].reduce(
//     (total, sellerId) => {
//       const shopItems = items.filter((i) => i.sellerId === sellerId);

//       return total + shopItems[0].shippingFee;
//     },
//     0,
//   );

//   const total = productsTotal + shipping;

//   // place order
//   const placeOrder = async () => {
//     if (!selectedAddress) {
//       toast.error("Please select address");
//       return;
//     }

//     if (!payment) {
//       toast.error("Please select payment method");
//       return;
//     }

//     await axiosPublic.post("/checkout", {
//       userEmail: user.email,

//       items,
//       paymentMethod: payment,
//       address: selectedAddress,
//     });

//     toast.success("Order placed successfully");

//     navigate("/dashboard/my-orders");
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
//       {/* ORDER ITEMS */}

//       <div className="md:col-span-2 border p-6 rounded">
//         <h2 className="font-bold mb-4 text-lg">Order Items</h2>

//         {items.map((item) => (
//           <div key={item._id} className="flex gap-4 border-b py-3">
//             <img src={item.image} className="w-16 h-16 object-cover" />

//             <div className="flex-1">
//               <p>{item.name}</p>
//               <p>${item.price}</p>
//             </div>

//             <p>x{item.quantity}</p>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT PANEL */}

//       <div className="border p-6 rounded h-fit space-y-6">
//         {/* ADDRESS */}

//         {/* <div>
//           <h2 className="font-bold mb-3">Shipping Address</h2>

//           {addresses ? addresses.map((addr) => (
//             <label
//               key={addr._id}
//               className="flex gap-2 border p-3 rounded mb-2"
//             >
//               <input
//                 type="radio"
//                 name="address"
//                 onChange={() => setSelectedAddress(addr)}
//               />

//               <div>
//                 <p className="font-semibold">{addr.fullName}</p>

//                 <p>{addr.phone}</p>

//                 <p className="text-sm text-gray-500">
//                   {addr.addressLine},{addr.area},{addr.district},{addr.division}
//                 </p>
//               </div>
//             </label>
//           ) ): "add"}
//         </div> */}
//         <div>
//           <h2 className="font-bold mb-3">Shipping Address</h2>

//           {addresses.length > 0 ? (
//             addresses.map((addr) => (
//               <label
//                 key={addr._id}
//                 className="flex gap-2 border p-3 rounded mb-2 cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="address"
//                   onChange={() => setSelectedAddress(addr)}
//                 />

//                 <div>
//                   <p className="font-semibold">{addr.fullName}</p>

//                   <p>{addr.phone}</p>

//                   <p className="text-sm text-gray-500">
//                     {addr.addressLine}, {addr.area}, {addr.district},{" "}
//                     {addr.division}
//                   </p>
//                 </div>
//               </label>
//             ))
//           ) : (
//             <div className="border p-4 rounded text-center">
//               <p className="text-gray-500 mb-3">No address found</p>

//               <button
//                 onClick={() => navigate("/dashboard/address-book")}
//                 className="bg-orange-500 text-white px-4 py-2 rounded"
//               >
//                 Add Address
//               </button>
//             </div>
//           )}
//         </div>
//         {/* PAYMENT */}

//         <div>
//           <h2 className="font-bold mb-3">Payment Method</h2>

//           <label className="flex gap-2">
//             <input
//               type="radio"
//               value="cod"
//               onChange={() => setPayment("cod")}
//             />
//             Cash On Delivery
//           </label>

//           <label className="flex gap-2">
//             <input
//               type="radio"
//               value="stripe"
//               onChange={() => setPayment("stripe")}
//             />
//             Stripe Payment
//           </label>
//         </div>

//         {/* SUMMARY */}

//         <div className="border-t pt-4">
//           <p className="flex justify-between">
//             <span>Products</span>
//             <span>${productsTotal}</span>
//           </p>

//           <p className="flex justify-between">
//             <span>Shipping</span>
//             <span>${shipping}</span>
//           </p>

//           <p className="flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>${total}</span>
//           </p>

//           <button
//             onClick={placeOrder}
//             className="w-full bg-green-600 text-white py-2 mt-4 rounded"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Checkout = () => {
  const { state } = useLocation();
  const { items } = state;

  const axiosPublic = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [payment, setPayment] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Load addresses
  const { data: addresses = [] } = useQuery({
    queryKey: ["addresses", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/addresses?email=${user.email}`);
      return data;
    },
  });

  const productsTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = [...new Set(items.map((i) => i.sellerId))].reduce((total, sellerId) => {
    const shopItems = items.filter((i) => i.sellerId === sellerId);
    return total + shopItems[0].shippingFee;
  }, 0);
  const total = productsTotal + shipping;

  const placeOrder = async () => {
    if (!selectedAddress) return toast.error("Please select address");
    if (!payment) return toast.error("Please select payment method");

    await axiosPublic.post("/checkout", {
      userEmail: user.email,
      items,
      paymentMethod: payment,
      address: selectedAddress,
    });

    toast.success("Order placed successfully");
    navigate("/dashboard/my-orders");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/* ORDER ITEMS */}
      <div className="md:col-span-2 border p-6 rounded">
        <h2 className="font-bold mb-4 text-lg">Order Items</h2>
        {items.map((item) => (
          <div key={item._id} className="flex gap-4 border-b py-3">
            <img src={item.image} className="w-16 h-16 object-cover" />
            <div className="flex-1">
              <p>{item.name}</p>
              <p>${item.price}</p>
            </div>
            <p>x{item.quantity}</p>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div className="border p-6 rounded h-fit space-y-6">
        {/* Address */}
        <div>
          <h2 className="font-bold mb-3">Shipping Address</h2>
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <label key={addr._id} className="flex gap-2 border p-3 rounded mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress?._id === addr._id}
                  onChange={() => setSelectedAddress(addr)}
                />
                <div>
                  <p className="font-semibold">{addr.fullName}</p>
                  <p>{addr.phone}</p>
                  <p className="text-sm text-gray-500">
                    {addr.addressLine}, {addr.area}, {addr.district}, {addr.division}
                  </p>
                </div>
              </label>
            ))
          ) : (
            <div className="border p-4 rounded text-center">
              <p className="text-gray-500 mb-3">No address found</p>
              <button
                onClick={() => navigate("/dashboard/address-book")}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Add Address
              </button>
            </div>
          )}
        </div>

        {/* Payment */}
        <div>
          <h2 className="font-bold mb-3">Payment Method</h2>
          <label className="flex gap-2">
            <input type="radio" value="cod" checked={payment === "cod"} onChange={() => setPayment("cod")} />
            Cash On Delivery
          </label>
          <label className="flex gap-2">
            <input type="radio" value="stripe" checked={payment === "stripe"} onChange={() => setPayment("stripe")} />
            Stripe Payment
          </label>
        </div>

        {/* Summary */}
        <div className="border-t pt-4">
          <p className="flex justify-between">
            <span>Products</span>
            <span>${productsTotal}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total}</span>
          </p>
          <button onClick={placeOrder} className="w-full bg-green-600 text-white py-2 mt-4 rounded">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;