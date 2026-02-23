const SellerMessages = () => {
  return (
    <div className="p-6 h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">💬 Messages</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Left: Conversation List */}
        <div className="bg-white shadow rounded-xl overflow-y-auto">
          <div className="p-3 border-b font-semibold">Inbox</div>

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-3 border-b hover:bg-gray-100 cursor-pointer"
            >
              <p className="font-medium">Customer {i}</p>
              <p className="text-sm text-gray-500 truncate">
                Hello, I want to know about product...
              </p>
            </div>
          ))}
        </div>

        {/* Right: Chat Area */}
        <div className="md:col-span-2 bg-white shadow rounded-xl flex flex-col">
          {/* Header */}
          <div className="p-3 border-b font-semibold">
            Chat with Customer 1
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {/* Customer Message */}
            <div className="flex">
              <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
                Hello, is this product available?
              </div>
            </div>

            {/* Seller Message */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                Yes, it is available 😊
              </div>
            </div>

            <div className="flex">
              <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
                Can I get discount?
              </div>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerMessages;