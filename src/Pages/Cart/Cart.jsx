const Cart = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 My Cart</h2>

      <div className="space-y-4">
        {[1,2].map(i => (
          <div key={i} className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
            <div>
              <h3 className="font-semibold">Product {i}</h3>
              <p className="text-sm text-gray-500">৳ 500</p>
            </div>
            <div className="flex gap-2">
              <input type="number" defaultValue={1} className="input input-bordered w-20" />
              <button className="btn btn-error btn-sm">Remove</button>
            </div>
          </div>
        ))}
        <button className="btn btn-primary w-full">Proceed to Checkout</button>
      </div>
    </div>
  );
};
export default Cart;