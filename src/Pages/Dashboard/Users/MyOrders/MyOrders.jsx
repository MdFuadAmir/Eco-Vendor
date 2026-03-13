import { useState } from "react";
import { FaBox } from "react-icons/fa";
import AllOrders from "./AllOrders";
import ToReview from "./ToReview";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-emerald-500">
        <FaBox /> My Orders
      </h2>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-500 p-2 mt-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 cursor-pointer ${
            activeTab === "all"
              ? "text-emerald-500 border-b-2 border-emerald-500"
              : "dark:text-white hover:text-emerald-500"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setActiveTab("review")}
          className={`px-3 cursor-pointer ${
            activeTab === "review"
              ? "text-emerald-500 border-b-2 border-emerald-500"
              : "dark:text-white hover:text-emerald-500"
          }`}
        >
          To Review
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "all" && <AllOrders />}
        {activeTab === "review" && <ToReview />}
      </div>
    </div>
  );
};

export default MyOrders;