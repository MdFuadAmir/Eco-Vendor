const steps = [
  { key: "pending", label: "Order Placed" },
  { key: "accepted", label: "Accepted" },
  { key: "packed", label: "Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "completed", label: "Delivered" },
];

const OrderTracking = ({ order }) => {
  const currentIndex = steps.findIndex(
    (s) => s.key === order.orderStatus
  );

  return (
    <div className="w-full px-4 py-8">

      <div className="flex items-center justify-between relative">

        {/* 🔥 BACK LINE */}
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-300 rounded"></div>

        {/* 🔥 PROGRESS LINE (ANIMATION) */}
        <div
          className="absolute top-4 left-0 h-1 bg-green-500 rounded transition-all duration-700"
          style={{
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* 🔥 STEPS */}
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center z-10"
            >
              {/* 🔵 CIRCLE */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold
                transition-all duration-500
                ${
                  isCompleted
                    ? "bg-green-500"
                    : isCurrent
                    ? "bg-blue-500 animate-pulse"
                    : "bg-gray-400"
                }
              `}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {/* 🔤 LABEL */}
              <p className="text-xs mt-2 text-center">
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* ❌ CANCEL STATUS */}
      {order.orderStatus === "cancelled" && (
        <p className="text-red-500 mt-4 text-center font-semibold">
          Order Cancelled
        </p>
      )}
    </div>
  );
};

export default OrderTracking;