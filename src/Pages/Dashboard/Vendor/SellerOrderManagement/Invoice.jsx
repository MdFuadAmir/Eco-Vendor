import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import QRCode from "react-qr-code";

const Invoice = () => {
  const { id } = useParams();
  const axios = useAxios();

  const { data: order, isLoading } = useQuery({
    queryKey: ["invoice", id],
    queryFn: async () => {
      const { data } = await axios.get(`/invoice/${id}`);
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Skeleton height={30} width={200} className="mb-4" />
        <Skeleton height={20} width={300} className="mb-2" />
        <Skeleton count={5} height={40} className="mb-2 rounded-lg" />
      </div>
    );

  if (!order)
    return <p className="p-6 text-center text-gray-500">No invoice found</p>;

  const orderDate = new Date(order.createdAt).toLocaleString();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div
        id="invoice-print"
        className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg print:shadow-none print:p-0 print:max-w-full"
        style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-600">Invoice</h1>
            <p className="text-gray-700 mt-1">Order ID: {order.orderId}</p>
            <p className="text-gray-700 mt-1">Date: {orderDate}</p>
          </div>

          <div className="bg-white p-2 border rounded-lg shadow print:bg-white">
            <QRCode
              value={`${window.location.origin}/order/${order._id}`}
              size={100}
            />
            <p className="text-xs text-center text-gray-500 mt-1">
              Scan to view order
            </p>
          </div>
        </div>

        {/* Seller & Customer */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="font-semibold text-gray-700">Seller Info</h2>
            <p>{order.shopName || "Seller Name"}</p>
            <p>{order.sellerEmail || "seller@example.com"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Customer Info</h2>
            <p>{order.userEmail}</p>
            <p>{order.userPhone || "N/A"}</p>
            <p>{order.userAddress || "Address not provided"}</p>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-4 mb-6">
          {order.products?.map((p) => (
            <div
              key={p._id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition print:border print:shadow-none"
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-gray-700 text-sm">
                    ${p.price.toFixed(2)} × {p.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-lg">
                ${(p.price * p.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-end border-t pt-4">
          <div className="text-right">
            <p className="text-gray-700 font-semibold">Total:</p>
            <p className="text-2xl font-bold text-emerald-600">
              ${order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Print button */}
      <div className="flex justify-end mt-6 mb-12 print:hidden max-w-4xl mx-auto">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Print Invoice
        </button>
      </div>

      {/* Global print CSS */}
      <style>
        {`
    @media print {
      body * {
        visibility: hidden;
      }
      #invoice-print, #invoice-print * {
        visibility: visible;
      }
      #invoice-print {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 90%; /* changed from 100% to 90% */
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  `}
      </style>
    </>
  );
};

export default Invoice;
